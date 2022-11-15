import React, { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'
import { FilterApi } from "../../apis/filter-api/filter-api";
import { CategoryModel } from '../../types/models/category.types'
import { CategoryApi } from '../../apis/category-api/category-api'
import FilterCart from "../../components/filterComponents/filterCart";
import FilterHead from "../../components/filterComponents/filterHead";
import { MetaModel } from "../../types/models/pagining.types";
import { ProductFilterModel } from "../../types/models/productFilter.types";
import SkeltonFilterCart from "../../components/CSkeleton/SkeltonFilterCart";
import Link from "next/link";
import MetaPagination from "../../components/MetaPagination/MetaPagination";
import { toast } from "react-toastify";
import { ContextFailLoad } from "../../components/context/ContextFailLoad";


const Index: NextPage = () => {
    const router = useRouter()
    const CtxFail = useContext(ContextFailLoad);
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [displayEmptyMessage, setDisplayEmptyMessage] = useState<boolean>(false)
    const [listProduct, setListProduct] = useState<ProductFilterModel[]>([])
    const [parmsFilter, setParmsFilter] = useState<any>({})
    const [pageState, setPageState] = useState<number>(1)
    const [sideView, setSideView] = useState<string>('top');
    const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
    const [metaPage, setMetaPage] = useState<MetaModel>();
    const [activeFilter, setActiveFilter] = useState<any>({
        'parent': null,
        'category': null,
        'subCat': null,
    })

    async function getCategoryData() {
        try {
            const res: CategoryModel[] = await CategoryApi()
            setCategoryData(res)
        }
        catch {

        }
    }

    async function getProducyFromFilter(parms: any) {
        setDisplayEmptyMessage(false)
        setDisplaySkelton(true)
        const dataActive: any = { ...activeFilter };
        try {
            const res = await FilterApi(parms)
            setListProduct(res.data)
            setPageState(pageState + 1)
            setListProduct(res.data)
            setMetaPage(res.meta)
            setDisplaySkelton(false)
            dataActive.category = null;
            dataActive.parent = router.query.category ? String(router.query.category).replaceAll('"', '') : null ;            
            setActiveFilter(dataActive);
            if (res.data.length == 0) {
                setDisplayEmptyMessage(true)
            }
        }
        catch {
            setDisplaySkelton(false)
            CtxFail.setFailedLoad(true)
        }
    }

    const startGetData = () => {
        let parms: any = "";
        let parmsFilters: any = { ...parmsFilter }        
        let router_q = router.query ;
        router_q['brand']= `["${router.query.brandname}"]`
        Object.entries(router_q).map((item: any, index) => {
            parmsFilters[item[0]] = item[1].charAt(0) == '[' ? JSON.parse(item[1]) : item[1];
            parms = `${parms}&${item[0]}=${item[1]}`
        })
        setParmsFilter(parmsFilters)
        if (parms != null) {
            getProducyFromFilter(parms)
        }
    }


    useEffect(() => {
        if (!router.isReady) return
        if (router.query.brandname) {                        
            startGetData()
        }
    }, [router.isReady, router.query])


    useEffect(() => {
        getCategoryData()
    }, [])

    return (
        <>
            <div className="w-full flex flex-col ">
                {router.query.brandname && 
                    <FilterHead
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        categoryData={categoryData}
                        parmsFilter={parmsFilter}
                        setParmsFilter={setParmsFilter}
                        sideView={sideView}
                        setSideView={setSideView}
                        filterUrl={`/brand/${router.query.brandname}`}
                        isPrice={false}
                        api_url={'brand'}
                        setIsSkeleton={setDisplaySkelton}
                    />
                }
                {displayEmptyMessage == false ?
                    <div className="  w-[100%] max-w-[1400px] flex items-center flex-wrap m-auto p-[5px] md:p-[20px] sm:p-[10px] ">
                        {displaySkelton == false && listProduct.map((item: any, index: any) =>
                            <FilterCart
                                key={index}
                                uri={item.uri}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                slug={item.slug}
                                image_top={item.top}
                                image_left={item.left}
                                image_right={item.right}
                                sideView={sideView}
                            />
                        )}
                        {displaySkelton == true && [0, 0, 0, 0].map((item: any, index: any) =>
                            <SkeltonFilterCart key={index} />
                        )}
                    </div>
                    :
                    <div className="w-full h-[350px] flex flex-col justify-center items-center">
                        <img src="/assets/logo/search.png" alt="logo" className="" />
                        <span className=" text-lg mt-[35px]">No results</span>
                        <Link href='/'>
                            <span className=" mt-[15px] text-sm text-green-600 cursor-pointer">Back to home</span>
                        </Link>
                    </div>
                }
                <MetaPagination metaPage={metaPage} setMetaPage={setMetaPage} path={`/brand/${router.query.brandname}`} />
            </div>
        </>
    )
}

export default Index;
import React, { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";
import { SingleShopBanner } from "../../components/shopComponents/SingleShopBanner";
import FilterHead from "../../components/filterComponents/filterHead";
import { CategoryModel } from "../../types/models/category.types";
import { CategoryApi } from "../../apis/category-api/category-api";
import { useRouter } from "next/router";
import SingleShopCart from "../../components/shopComponents/SingleShopCart";
import SkeltonFilterCart from "../../components/CSkeleton/SkeltonFilterCart";
import { MetaModel, PaginingModel } from "../../types/models/pagining.types";
import MetaPagination from "../../components/MetaPagination/MetaPagination";
import { SingleShopFooter } from "../../components/shopComponents/SingleShopFooter";
import LiveChatBox from "../../components/chat/liveChatBox";
import { IShopProductsApi, ShopProductsApi, SingleShopApi } from "../../apis/shops-api/shops-api";
import NotFound from "../../components/notFoundComponent/NotFound";
import SingleShopCartAsShop from "../../components/shopComponents/SingleShopCartAsShop";

const Index: NextPage = () => {
    const routing: any = useRouter();
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [isChatVis, setIsChatVis] = useState<boolean>(false)
    const [isNoProduct, setIsNoProduct] = useState<boolean>(false)
    const [notFoundShop, setNotFoundShop] = useState<boolean>(false)
    const [parmsFilter, setParmsFilter] = useState<any>({})
    const [sideView, setSideView] = useState<string>('top');
    const [metaPage, setMetaPage] = useState<MetaModel>();
    const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
    const [shopData, setShopData] = useState<any>(null);
    const [metaPageModel, setMetaPageModel] = useState<MetaModel>();
    const [pageState, setPageState] = useState<number>(1)
    const [productsData, setProductsData] = useState<CategoryModel[]>([]);
    const [roleType, setRoleType] = useState<any>(0)

    const [activeFilter, setActiveFilter] = useState<any>({
        'parent': null,
        'category': null,
        'subCat': null,
    })

    async function getShopData() {
        try {
            const res = await SingleShopApi(routing.query.slug)
            setShopData(res)
        }
        catch (err: any) {
            setNotFoundShop(true)
        }
    }

    async function getCategoryData() {
        try {
            const res: CategoryModel[] = await CategoryApi()
            setCategoryData(res)
            setDisplaySkelton(false)
        }
        catch {

        }
    }

    async function getShopProductsData({ slug, pageState, parms }: IShopProductsApi) {
        setIsNoProduct(false)
        try {
            const res: PaginingModel = await ShopProductsApi({ slug: slug, pageState: pageState, parms: parms })            
            if (Boolean(res.data.length)) {
                setProductsData(res.data)
                setIsNoProduct(false)
            } else {
                setIsNoProduct(true)
                setProductsData([])
            }
            setMetaPageModel(res.meta)
            setMetaPage(res.meta)
            setDisplaySkelton(false)
            const activeData = { ...activeFilter };
            activeData.category = null;
            setActiveFilter(activeData)
        }
        catch {

        }
    }

    const startGetData = () => {
        setIsNoProduct(false)
        let parms: any = "";
        let parmsFilters: any = { ...parmsFilter }
        Object.entries(routing.query).map((item: any, index) => {
            parmsFilters[item[0]] = item[1].charAt(0) == '[' ? JSON.parse(item[1]) : item[1];
            parms = `${parms}&${item[0]}=${item[1]}`
        })
        setParmsFilter(parmsFilters)
        if (parms != null) {
            getShopProductsData({ slug: routing.query.slug, pageState: pageState, parms: parms })
        }
    }

    useEffect(() => {
        routing.query.slug && getCategoryData()
        routing.query.slug && getShopData()
    }, [routing.query.slug])

    useEffect(() => {
        routing.query.slug && startGetData()
    }, [routing.query.slug, routing.query])

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRoleType(localStorage.getItem('role'))
        }
    }, [])

    return (
        <>
            {notFoundShop == false ?
                <div className="w-full flex flex-col items-center ">

                    <SingleShopBanner
                        shopData={shopData}
                    />

                    <div className=" w-full max-w-[1400px]  md:mt-[60px] mt-[10px] sticky top-0 z-10 bg-white">
                        <FilterHead
                            setIsSkeleton={setDisplaySkelton}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            categoryData={categoryData}
                            parmsFilter={parmsFilter}
                            setParmsFilter={setParmsFilter}
                            sideView={sideView}
                            setSideView={setSideView}
                            filterUrl={`/s/${routing.query.slug}`}
                            isPrice={true}
                            isBack={false}
                            api_url={'shop'}
                        />
                    </div>

                    <div id="s-list-pro" className="  w-[100%] max-w-[1400px] flex items-center flex-wrap m-auto p-[5px] md:p-[20px] sm:p-[10px] min-h-[480px]">
                        {!displaySkelton && productsData.map((item: any, index: any) =>
                            <>
                                {roleType != '1' ?
                                    <SingleShopCart
                                        product={item}
                                        key={index}
                                        title={item.name}
                                        slug={item.slug}
                                        sideView={sideView}
                                        rate={item.review}
                                    />
                                    :
                                    <SingleShopCartAsShop
                                        product={item}
                                        key={index}
                                        title={item.name}
                                        slug={item.slug}
                                        sideView={sideView}
                                        rate={item.review}
                                    />
                                }
                            </>
                        )}
                        {isNoProduct ?
                            <>
                                <div className="flex justify-center items-center p-10 w-full flex-col">
                                    <img className="w-full mb-4 max-w-[50px] " src='/assets/no-res.png' alt="no-res" />
                                    <p>No items found</p>
                                </div>
                            </>
                            :
                            <>
                                {displaySkelton == true && [0, 0, 0, 0].map((item: any, index: any) =>
                                    <SkeltonFilterCart key={index} />
                                )}
                            </>
                        }
                    </div>

                    <MetaPagination metaPage={metaPage} setMetaPage={setMetaPage} path={`/s/${routing.query.slug}`} />

                    <SingleShopFooter shopData={shopData} />
                    {shopData &&
                        <LiveChatBox isVis={isChatVis} setIsVis={setIsChatVis} shopData={shopData} />
                    }

                </div>
                :
                <NotFound />
            }
        </>
    )
}

export default Index;

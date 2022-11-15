import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import { MetaModel } from "../../../../types/models/pagining.types";
import { ShopsPaginationApi } from '../../../../apis/shops-api/shops-pagination-api'
import { ShopsListModel } from "../../../../types/models/shopsList.types";
import { ListProductCart } from "../../../../components/listProductComponents/ListProductCart";
import SkeltonShopListCart from "../../../../components/CSkeleton/SkeltonShopListCart";
import ListProductHead from "../../../../components/listProductComponents/ListProductHead";
import { IProductsOfGlasses, ProductsOfGlassesApi } from '../../../../apis/glasses-api/productsOfGlasses';
import { ISingleOfGlasses, SingleOfGlassesApi } from '../../../../apis/glasses-api/singleOfGlasses';
import { useRouter } from "next/router";
import SearchAddressBar from "../../../../components/searchAddressBar/SearchAddressBar";
import { ContextAddress } from "../../../../components/context/ContextAddress";
import { ContextFailLoad } from "../../../../components/context/ContextFailLoad";
import { PriceRangeModel } from "../../../../types/models/filterItems.types";
import Link from "next/link";


const Index: NextPage = () => {
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(true)
    const [sideView, setSideView] = useState<string>('front');
    const [displayEmpty, setDisplayEmpty] = useState<boolean>(false);
    const [listProductsOfGlasses, setListProductsOfGlasses] = useState<any[]>([])
    const [singleOfGlasses, setSingleOfGlasses] = useState<any>(null)
    const [metaPageModel, setMetaPageModel] = useState<MetaModel>();
    const [pageState, setPageState] = useState<number>(1)
    const [priceRange, setPriceRange] = useState<PriceRangeModel>({
        'max': 0,
        'min': 0,
    });
    const CtxAddress = useContext(ContextAddress);
    const CtxFail = useContext(ContextFailLoad);
    const routing: any = useRouter();

    async function getProductsOfGlassesData({ slug, pageState, max, min, brandData }: IProductsOfGlasses) {
        setDisplaySkelton(true)
        setDisplayEmpty(false)
        try {
            const res = await ProductsOfGlassesApi({
                slug: slug, pageState: pageState,
                lat: CtxAddress.selectedAddress.location.lat, lng: CtxAddress.selectedAddress.location.lng, max: max, min: min
            })
            setListProductsOfGlasses(res.data)
            for (let i in res.data) {
                for (let x in res.data[i].children) {
                    res.data[i].children[x] = { ...res.data[i].children[x], top: brandData.children[x].top }
                }
            }
            setMetaPageModel(res.meta)
            setDisplaySkelton(false)
            if (res.data.length == 0) {
                setDisplayEmpty(true)
            }
        }
        catch {
            setDisplaySkelton(false)
            // CtxFail.setFailedLoad(true)
        }
    }

    async function getSingleOfGlassesData({ slug }: ISingleOfGlasses) {
        try {
            const res: any = await SingleOfGlassesApi({ slug: slug })
            setSingleOfGlasses(res)
            await getProductsOfGlassesData({ slug: slug, pageState: pageState, brandData: res })
        }
        catch {
            CtxFail.setFailedLoad(true)
        }
    }

    const getIniData = async (props: { slug: string }) => {
        await getSingleOfGlassesData({ slug: props.slug })
    }


    useEffect(() => {
        if (routing.isReady) {
            const slug = routing.query.id.substr(6)
            if (CtxAddress.selectedAddress != null && slug) {
                if (slug) getIniData({ slug: slug })
            }
        }
    }, [CtxAddress.selectedAddress, routing.query.slug , routing.isReady])


    return (
        <div className="w-full flex flex-col  min-h-[80vh] justify-start items-start">
            <SearchAddressBar />
            <ListProductHead
                brandName={singleOfGlasses && singleOfGlasses}
                sideView={sideView}
                setSideView={setSideView}
                setPriceRange={setPriceRange}
                priceRange={priceRange}
                getProductsOfGlassesData={getProductsOfGlassesData}
                slug={routing.query.id && routing.query.id.substr(6)}
                pageState={pageState}
            />
            <div className=" w-[100%] mt-4 max-w-[1400px] flex items-center flex-wrap mx-auto p-[15px] md:p-[20px] sm:p-[10px] ">
                {displaySkelton == false && listProductsOfGlasses.length !== 0 && listProductsOfGlasses.map((item: any, index: any) =>
                    <ListProductCart
                        glass={singleOfGlasses && singleOfGlasses}
                        key={index}
                        product={item}
                        sideView={sideView}
                    />
                )}

                {displaySkelton == true && [0, 0, 0, 0, 0, 0].map((item: any, index: any) =>
                    <SkeltonShopListCart key={index} />
                )}

            </div>
            {displayEmpty &&
                <div className="w-full h-[350px] flex flex-col justify-center items-center">
                    <img src="/assets/logo/search.png" alt="logo" className="" />
                    <span className=" text-lg mt-[35px]">This item is not available currently in any store</span>
                    <Link href='/'>
                        <span className=" mt-[15px] text-sm text-green-600 cursor-pointer">Back to home</span>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Index;

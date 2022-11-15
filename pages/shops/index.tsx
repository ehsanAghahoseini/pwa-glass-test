import React, {useContext, useEffect, useState} from "react";
import type {NextPage} from "next";
import {MetaModel} from "../../types/models/pagining.types";
import {ShopsPaginationApi} from '../../apis/shops-api/shops-pagination-api'
import {ShopsListModel} from "../../types/models/shopsList.types";
import {ShopsListCart} from "../../components/shopComponents/ShopsListCart";
import SkeltonShopListCart from "../../components/CSkeleton/SkeltonShopListCart";
import {ContextAddress} from "../../components/context/ContextAddress";
import MetaPagination from "../../components/MetaPagination/MetaPagination";
import {useRouter} from "next/router";
import {route} from "next/dist/server/router";
import FilterCart from "../../components/filterComponents/filterCart";
import SkeltonFilterCart from "../../components/CSkeleton/SkeltonFilterCart";
import Link from "next/link";
import SearchAddressBar from "../../components/searchAddressBar/SearchAddressBar";
import { ContextFailLoad } from "../../components/context/ContextFailLoad";


const Index: NextPage = () => {
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [isSearchMode, setIsSearchMode] = useState<boolean>(false)
    const [listShops, setListShops] = useState<ShopsListModel[]>([])
    const [metaPageModel, setMetaPageModel] = useState<MetaModel>();
    const [MoreData, setMoreData] = useState<boolean>(true);
    const [pageState, setPageState] = useState<number>(1)
    const CtxAddress = useContext(ContextAddress);
    const router: any = useRouter()
    const [displayEmptyMessage, setDisplayEmptyMessage] = useState<boolean>(false)
    const CtxFail = useContext(ContextFailLoad);

    const getShopsList = async (page: number) => {
        setDisplaySkelton(true)
        try {
            const res = await ShopsPaginationApi(page, CtxAddress.selectedAddress.location.lat, CtxAddress.selectedAddress.location.lng, router.query.searchKey)
            setListShops(res.data)
            setMetaPageModel(res.meta)
            setDisplaySkelton(false)
            if (res.data.length == 0) {
                setDisplayEmptyMessage(true)
            }
        } catch {
            setDisplaySkelton(false)
            CtxFail.setFailedLoad(true)
        }
    }

    useEffect(() => {
        router.query.searchKey && setIsSearchMode(true)
        if (CtxAddress.selectedAddress != null) {
            if (router.query.page) {
                getShopsList(+router.query.page)
            } else {
                getShopsList(1)
            }
        }
    }, [CtxAddress.selectedAddress, router.query])

    return (
        <div className="w-full flex flex-col ">
            <SearchAddressBar/>
            <h1 className=" w-full max-w-[1400px] mx-auto text-gray-600 text-2xl my-6">Top 10</h1>
            {displayEmptyMessage == false ?
                <div
                    className="  w-[100%] max-w-[1400px] flex items-center flex-wrap m-auto p-[15px] md:p-[20px] sm:p-[10px] ">
                    {displaySkelton == false && listShops.map((item: any, index: any) =>
                        <ShopsListCart
                            isSearchMode={isSearchMode}
                            index={index}
                            key={index}
                            name={item.name}
                            description={item.description}
                            logo={item.logo}
                            cover={item.cover}
                            review={item.review}
                            slug={item.slug}
                            uri={item.uri}
                        />
                    )}

                    {displaySkelton == true && [0, 0, 0, 0, 0, 0].map((item: any, index: any) =>
                        <SkeltonShopListCart key={index}/>
                    )}
                </div>
                :
                <div className="w-full h-[350px] flex flex-col justify-center items-center">
                    <img src="/assets/logo/search.png" alt="logo" className=""/>
                    <span className=" text-lg mt-[35px]">No store found nearby</span>
                    <Link href='/'>
                        <span className=" mt-[15px] text-sm text-green-600 cursor-pointer">Back to home</span>
                    </Link>
                </div>
            }
            <MetaPagination metaPage={metaPageModel} setMetaPage={setMetaPageModel} path={'shops'}/>
        </div>
    )
}

export default Index;
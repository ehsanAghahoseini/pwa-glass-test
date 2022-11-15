import React, { useState, useEffect, useContext } from 'react'
import type { NextPage } from 'next'
import { BannersApi } from '../apis/banner-api/banner-api'
import { ShopsApi } from '../apis/shops-api/shops-api'
import { CategoryApi } from '../apis/category-api/category-api'
import Skeleton from "react-loading-skeleton";
import NewFilter from '../components/home-page/NewFilter'
import ListShops from '../components/home-page/ListShops'
import ListBrands from '../components/home-page/ListBrands'
import Banners from '../components/home-page/Banners'
import { BannerModel, singleBanner } from '../types/models/banner.types'
import { ShopsModel } from '../types/models/shops.types'
import { CategoryModel } from '../types/models/category.types'
import SearchAddressBar from '../components/searchAddressBar/SearchAddressBar'
import { BrandModel } from '../types/models/brand.types'
import { BrandApi } from '../apis/brand-api/brand-api'
import { ShopsPaginationApi } from '../apis/shops-api/shops-pagination-api'
import { PaginingModel } from '../types/models/pagining.types'
import { ContextAddress } from '../components/context/ContextAddress'
import { ContextCategories } from "../components/context/ContextCategoris";

const Index: NextPage = () => {

    const [displayShopsSkelton, setDisplayShopsSkelton] = useState<boolean>(true)
    const [stores, setStores] = useState<ShopsModel[]>([])
    const [slidersOffer, setSlidersOffer] = useState<singleBanner[]>([]);
    const [slidersNew, setSlidersNew] = useState<singleBanner[]>([]);
    const [categoryData, setCategoryData] = useState<CategoryModel[]>([]);
    const [brandData, setBrandData] = useState<BrandModel[]>([]);
    const CtxAddress = useContext(ContextAddress);
    const CtxCategories = useContext(ContextCategories);

    const [bannerFailed , setBannerFailed]=useState(false)
    const [filterFailed , setFilterFailed]=useState(false)
    const [shopFailed , setShopFailed]=useState(false)
    const [brandFailed , setBrandFailed]=useState(false)



    async function getSlidersData() {
        setBannerFailed(false)
        try {
            const res: BannerModel = await BannersApi()
            setSlidersNew(res.new)
            setSlidersOffer(res.offer)
        }
        catch {
            setBannerFailed(true)
        }
    }

    async function getHomeShops() {
        setShopFailed(false)
        setDisplayShopsSkelton(true)
        try {
            const res: PaginingModel = await ShopsPaginationApi(1, CtxAddress.selectedAddress.location.lat, CtxAddress.selectedAddress.location.lng)
            setStores(res.data)
            setDisplayShopsSkelton(false)
        }
        catch {
            setDisplayShopsSkelton(false)
            setShopFailed(true)
        }
    }

    async function getCategoryData() {
        setFilterFailed(false)
        try {
            const res: CategoryModel[] = await CategoryApi()
            setCategoryData(res)
            CtxCategories.setCategoriesList(res)
        }
        catch {
            setFilterFailed(true)
        }
    }

    async function getHomeBrands() {
        setBrandFailed(false)
        try {
            const res: BrandModel[] = await BrandApi()
            setBrandData(res)
        }
        catch {
            setBrandFailed(true)
        }
    }

    const getData = async () => {
        await getSlidersData()
        await getCategoryData()
        await getHomeBrands()
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (CtxAddress.selectedAddress != null && CtxAddress.selectedAddress != '0') {
            getHomeShops()
        }
    }, [CtxAddress.selectedAddress])


    return (
        <div className=" w-full m-auto ">
            <SearchAddressBar />
            <Banners slidersData={slidersOffer} title={'Offers for you'} bannerFailed={bannerFailed} />
            <NewFilter categoryData={categoryData} filterFailed={filterFailed} />
            <Banners slidersData={slidersNew} bannerFailed={bannerFailed}>
                <div className=' w-full lg:w-11/12 h-[50px] flex items-center pl-[20px] '>
                    <img className=' md:w-[20px] w-[15px]' src="/assets/svg/ticket.svg" alt="filter" />
                    <span className='ml-[10px] md:text-base text-xs'>Newly realesed</span>
                </div>
            </Banners>
            <ListShops stores={stores} displayShopsSkelton={displayShopsSkelton} shopFailed={shopFailed} />
            <ListBrands brandData={brandData} categoryData={categoryData} brandFailed={brandFailed} />
        </div>
    )
}

export default Index

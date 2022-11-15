import React, { useEffect, useState, useContext } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { FilterHeadProps } from "../../types/type-props/FilterHeadProps";
import { FilterItemsApi } from "../../apis/filter-items-api/filter-items-api";
import { FilterItemsModel, FilterSingleModel, PriceRangeModel } from "../../types/models/filterItems.types";
import { useRouter } from 'next/router'
import MultiRangeSlider from "../MuliRangeSlider/MuliRangeSlider";
import FilterInputs from './FilterInputs';
import CSkeleton from "../CSkeleton/CSkeleton";
import { toast } from "react-toastify";
import { ContextFilter } from '../../components/context/ContextFilter';



const FilterHead = ({ activeFilter, setActiveFilter, categoryData, parmsFilter, setParmsFilter, sideView, setSideView, filterUrl, isPrice, isBack, setIsSkeleton, api_url }: FilterHeadProps) => {
    const [visibleMoreFilter, setVisibleMoreFilter] = useState(false)
    const [filterData, setFilterData] = useState<FilterSingleModel>({ base: [], advance: [] });
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false);
    const [priceRange, setPriceRange] = useState<PriceRangeModel>({
        'max': 0,
        'min': 0,
    });
    const [brandName, setBrandName] = useState<string>('')
    const router = useRouter()
    const CtxFiler = useContext(ContextFilter);

    const clearFilter = async () => {
        setVisibleMoreFilter(false)
        setIsSkeleton(true)
        try {
            await setParmsFilter({})
            // const res: FilterSingleModel = await FilterItemsApi(-1)
            // await setFilterData(res)
            setDisplaySkelton(false)
            router.push(`${filterUrl}/?page=1`, undefined, { scroll: false })
            setIsSkeleton(false)
        }
        catch {
            setIsSkeleton(false)
        }

    }


    const onFinishFilter = () => {
        setVisibleMoreFilter(false)
        setIsSkeleton(true)
        let parms: any = "";
        for (let i in parmsFilter) {
            if (Array.isArray(parmsFilter[i])) {
                parms = `${parms}&${i}=${JSON.stringify(parmsFilter[i])}`
            }
            else {
                if(i == 'page'){
                    parms = `${parms}&page='1'`
                }
                else {
                    parms = `${parms}&${i}=${parmsFilter[i].replaceAll('"', '')}`
                }
            }  
        }
        if (parms != null) {
            if (!parms.includes('page')) {
                parms = `${parms}&page=1`
            }
            router.push(`${filterUrl}/?${parms}`, undefined, { scroll: false })
        }
        else {
            toast("Please select filter item", { type: "info" })
        }
    }



    async function changeFilterData(category_id: any, isFirst: boolean) {
        setIsSkeleton(true)
        if (displaySkelton) return toast("Please wait while the previous information is loaded", { type: "info" })
        const data: any = { ...activeFilter };
        let dataParms: any = { ...parmsFilter }
        if (category_id != -1 && category_id != null && category_id != 'undefined') {
            isFirst ? dataParms['category'] = category_id : dataParms = { 'category': category_id }
        }
        data['parent'] = category_id;
        data['category'] = null;
        await setActiveFilter(data);
        setDisplaySkelton(true)
        await setParmsFilter(dataParms)
        try {
            const res: FilterSingleModel = await FilterItemsApi(category_id, api_url)
            await setFilterData(res)
            setDisplaySkelton(false)
            let data = CtxFiler.categoryFilter;
            if (category_id != -1) {
                data[category_id] = res;
            }
            setIsSkeleton(false)
            CtxFiler.setCategoryFilter(data)
            // خط پایین برای رکوئست دوباره به محظ عوض کردن دسته بندی میباشد
            if (category_id != -1 && category_id != null && isFirst == false) {
                router.push(`${filterUrl}/?category=${category_id}&page=1`, undefined, { scroll: false })
            }
        }
        catch {
            setIsSkeleton(false)
        }
    }

    useEffect(() => {
        changeFilterData(activeFilter.parent, true)
    }, [])

    useEffect(() => {
        if (!router.isReady) return
        if (router.query.brand) {
            setBrandName(JSON.parse(String(router.query.brand))[0])

        }
        else {
            if (router.pathname != '/brand/[brandname]') {
                setBrandName('')
            }
        }
    }, [router.isReady, router.query])

    return (
        <div className=" w-full border-b border-gray-200 flex flex-col px-[15px] transition-all  sticky top-0 z-10 bg-white">
            <div className=" w-full pt-8 md:h-[100px]  flex flex-wrap justify-between items-center">
                <div className=" w-full md:w-8/12 flex items-center  md:order-1 order-2">
                    {isBack != false &&
                        <div onClick={() => { history.back() }} className=" w-[30px] h-[30px] rounded-full bg-gray-100 mr-4 md:flex hidden justify-center items-center cursor-pointer">
                            <img src='/assets/svg/leftBigArrow.svg' alt="icon" className="w-[15px] mr-[3px]" />
                        </div>
                    }
                    <div className=" md:w-[calc(100%-30px)] w-full flex justify-center items-center">
                        {categoryData.length > 0 && categoryData.map((item: any, index: any) =>
                            <div key={index} onClick={() => changeFilterData(item.id, false)} className={` w-[120px] h-[35px] md:mx-[10px] mx-[5px] border border-gr-100 rounded-[30px] cursor-pointer flex justify-center items-center text-center text-xs md:text-base ${item.id == activeFilter.parent ? 'bg-gr-100' : 'bg-white'}`}>
                                {item.name}
                            </div>
                        )}
                        {categoryData.length == 0 && [0, 0, 0].map((item: any, index: any) =>
                            <div key={index} className={` w-[120px] h-[35px] md:mx-[10px] mx-[5px]  rounded-[30px] overflow-hidden`}>
                                <CSkeleton />
                            </div>
                        )}
                    </div>
                </div>
                <div className=" w-full md:w-4/12 flex justify-center md:order-2 order-1 text-lg text-gr-300">{brandName}</div>
            </div>
            <div className=" w-full mb-[20px] md:mt-[0px] mt-[20px] transition-all flex flex-wrap justify-between items-center  sticky top-4 z-30 bg-white">
                <div className=" w-full md:w-8/12 flex items-center  ">
                    <FilterInputs
                        setIsSkeleton={setDisplaySkelton}
                        title={'Search By :'}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                        filterData={filterData}
                        parmsFilter={parmsFilter}
                        setParmsFilter={setParmsFilter}
                        priceRange={priceRange}
                        displaySkelton={displaySkelton}
                        isPrice={isPrice}
                        onFinishFilter={onFinishFilter}
                        clearFilter={clearFilter}
                        visibleMoreFilter={visibleMoreFilter}
                        setVisibleMoreFilter={setVisibleMoreFilter}
                    />
                </div>
                <div className=" w-full md:w-4/12 flex justify-center md:mt-[0] mt-[15px] ">
                    <div onClick={() => { setSideView('top') }} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'top' && 'border'} `}>
                        <img src="/assets/media/front.png" alt="icon" className='h-[25px]' />
                    </div>
                    <div onClick={() => { setSideView('left') }} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'left' && 'border'} `}>
                        <img src="/assets/media/side.png" alt="icon" className='h-[25px]' />
                    </div>
                    <div onClick={() => { setSideView('right') }} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'right' && 'border'} `}>
                        <img src="/assets/media/side2.png" alt="icon" className='h-[25px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterHead;
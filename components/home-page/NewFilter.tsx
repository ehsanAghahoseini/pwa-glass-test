import React, { useState, useContext, useEffect } from "react";
import { CategoryProps } from "../../types/type-props/CategoryProps";
import { FilterItemsApi } from "../../apis/filter-items-api/filter-items-api";
import { FilterItemsModel, FilterSingleModel, PriceRangeModel } from "../../types/models/filterItems.types";
import Link from "next/link";
import FilterInputs from '../filterComponents/FilterInputs'
import CSkeleton from "../CSkeleton/CSkeleton";
import { useRouter } from "next/router";
import SkeltonCategoryCart from "../CSkeleton/SkeltonCategoryCart";
import { toast } from "react-toastify";
import { ContextFilter } from '../../components/context/ContextFilter';
import { LazyLoadImage } from "react-lazy-load-image-component";



const NewFilter = ({ categoryData, filterFailed }: CategoryProps) => {
    const router = useRouter()
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<FilterSingleModel>({base:[] , advance:[]});
    const [priceRange, setPriceRange] = useState<PriceRangeModel>({
        'max': 0,
        'min': 0,
    });
    const [parmsFilter, setParmsFilter] = useState<any>({})
    const [activeFilter, setActiveFilter] = useState<any>({
        'parent': null,
        'category': null,
        'subCat': null,
    })
    const CtxFiler = useContext(ContextFilter);


    const onFinishFilter = () => {
        let parms: any = "";
        for (let index in parmsFilter) {
            parms = `${parms}&${index}=${JSON.stringify(parmsFilter[index])}`;
        }
        if (parms != null) {
            if (!parms.includes('page')) {
                parms = `${parms}&page=1`
            }
            router.push(`filter/?${parms}`)
        }
        else {
            toast("Please select filter item", { type: "info" })
        }
    }


    async function changeFilterData(category_id: number) {
        const data = { ...activeFilter };
        let dataParms: any = { ...parmsFilter }
        dataParms = { 'category': category_id };
        data['parent'] = category_id;
        setActiveFilter(data);
        setDisplaySkelton(true)
        setParmsFilter(dataParms)
        // فقط برای صفحه اول است و برای این است تا وقتی روی کتگوری کلیک کرد اگر قبلا کلیک کرده بود چک میکنه
        if (CtxFiler.categoryFilter[category_id]) {
            await setFilterData(CtxFiler.categoryFilter[category_id])
            setDisplaySkelton(false)
            return;
        }
        try {
            const res: FilterSingleModel = await FilterItemsApi(category_id , 'filter')
            setFilterData(res)
            setDisplaySkelton(false)
            let data = CtxFiler.categoryFilter;
            data[category_id] = res;
            CtxFiler.setCategoryFilter(data)
        }
        catch {

        }
    }

    useEffect(()=>{
        CtxFiler.setCategoryFilter({})
    },[])

    return (
        <>
            {filterFailed == false &&
                <div className="  w-[100%] max-w-[1400px] m-auto md:my-[40px] my-[20px]  rounded-lg flex justify-center">
                    <div className=' w-full lg:w-11/12   flex justify-center flex-col items-center'>
                        <div className=' w-full  h-[50px] flex items-center pl-[20px] '>
                            <img className=' md:w-[20px] w-[15px]' src="/assets/svg/filter2.svg" alt="filter" />
                            <span className='ml-[10px] md:text-base text-xs'>
                                Filter
                            </span>
                        </div>
                        <div className=" w-full   flex px-[10px] lg:px-[0] mb-[20px] " >
                            {categoryData.length != 0 && categoryData.map((item: any, index: number) =>
                                <div key={index} className=" md:w-[33.33%]">
                                    <div className=" w-full px-1">
                                        <LazyLoadImage
                                            onClick={() => changeFilterData(item.id)}
                                            placeholder={<div className="w-full rounded-[10px] overflow-hidden sm:rounded-[15px] md:rounded-[35px]"><CSkeleton /></div>}
                                            effect={"blur"}
                                            alt="filter"
                                            src={item.image}
                                            width={"100%"}
                                            className={` w-full  mr-[5px] cursor-pointer shadow border-2 rounded-[5px] sm:rounded-[15px] md:rounded-[35px] ${activeFilter.parent == item.id ? 'border-gr-300' : 'border-gray-200'} `}
                                        />
                                    </div>
                                </div>
                            )}
                            {categoryData.length == 0 && [0, 0, 0].map((item: any, index: number) =>
                                <SkeltonCategoryCart key={index} />
                            )}
                        </div>
                        <FilterInputs
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                            filterData={filterData}
                            parmsFilter={parmsFilter}
                            setParmsFilter={setParmsFilter}
                            priceRange={priceRange}
                            displaySkelton={displaySkelton}
                            isPrice={false}
                            onFinishFilter={onFinishFilter}
                            
                        />
                    </div>
                </div>
            }
        </>
    )
}


export default NewFilter;

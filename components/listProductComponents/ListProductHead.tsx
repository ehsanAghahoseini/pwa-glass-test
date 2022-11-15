import React, { useEffect, useState } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { FilterHeadProps } from "../../types/type-props/FilterHeadProps";
import { FilterItemsApi } from "../../apis/filter-items-api/filter-items-api";
import { FilterItemsModel, FilterSingleModel, PriceRangeModel } from "../../types/models/filterItems.types";
import { useRouter } from 'next/router'
import MultiRangeSlider from "../MuliRangeSlider/MuliRangeSlider";
import CSkeleton from "../CSkeleton/CSkeleton";
import { ListProductHeadProps } from "../../types/type-props/ListProductHeadProps";



const ListProductHead = ({ setSideView, sideView, brandName , setPriceRange , getProductsOfGlassesData , pageState , slug , priceRange }: ListProductHeadProps) => {

    const [activePrice, setActivePrice] = useState<boolean>(false);
    

    const changePrices=(max:number , min:number)=>{        
        setPriceRange({
            'max': max,
            'min': min,
        })
    }

    const searchByPrice=()=>{
        if(priceRange.max== 1000 && priceRange.min== 100 ){            
            return
        }
        else {
            getProductsOfGlassesData({ slug: slug , pageState: pageState  , max:priceRange.max , min:priceRange.min})
        }
    }

    const changeDisplayPrice = () => {
        setActivePrice(!activePrice)
    }

    const changeDisplayImage = (view: string) => {
        setSideView(view)
    }

    return (
        <div className=" w-full border-b border-gray-200 flex flex-col px-[15px] transition-all  sticky top-0 z-10 bg-white">
            <div className=" w-full min-h-[100px] py-[10px]  flex flex-wrap justify-between items-center">
                <div className=" w-full md:w-8/12 flex items-center  md:order-1 order-2">
                <div onClick={() => { history.back() }} className=" w-[30px] h-[30px] rounded-full bg-gray-100 mr-4 md:flex hidden justify-center items-center cursor-pointer">
                    <img src='/assets/svg/leftBigArrow.svg' alt="icon" className="w-[15px] mr-[3px]" />
                </div>
                    <div className=" md:w-[calc(100%-30px)] w-full flex justify-center items-center py-4">
                        <div className="w-full md:w-7/12 flex flex-col transition-all">
                            <div className=" w-full flex justify-center md:mt-[0] mt-[15px] relative">
                                <div onClick={() => changeDisplayImage('front')} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'front' && 'border'} `}>
                                    <img src="/assets/media/front.png" alt="icon" className='h-[25px]' />
                                </div>
                                <div onClick={() => changeDisplayImage('right')} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'right' && 'border'} `}>
                                    <img src="/assets/media/side.png" alt="icon" className='h-[25px]' />
                                </div>
                                <div onClick={() => changeDisplayImage('left')} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex flex-col justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300 ${sideView == 'left' && 'border'} `}>
                                    <img src="/assets/media/side2.png" alt="icon" className='h-[25px]' />
                                </div>
                                <div onClick={changeDisplayPrice} className={`  w-[100px] md:h-[40px] h-[30px] mx-[4px] flex justify-center items-center  cursor-pointer relative text-xs bg-gr-100 rounded-[30px] border-gr-300  `}>
                                    <img src='/assets/svg/slider.svg' alt="svg" className=" w-[15px] mr-[7px]" />
                                    <span>Price</span>
                                </div>

                            </div>
                            <div className={` w-full relative max-w-[400px] mx-auto md:h-[40px] h-[35px] bg-gr-100 rounded-[30px] transition-all ${activePrice ? 'opacity-100 mt-[7px] visible' : 'opacity-0 mt-[-40px] invisible'} `}>
                                <MultiRangeSlider
                                    min={100}
                                    max={1000}
                                    onChange={({ min, max }) => changePrices(max,min)}
                                />
                                <span onClick={searchByPrice} className="absolute right-[10px] md:right-[15px] top-[8px] md:top-[12px] flex justify-center items-center cursor-pointer" >
                                    <img src="/assets/svg/search.svg" alt="s" className=" w-4"></img>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {brandName ?
                    <div className=" w-full md:w-4/12 flex justify-center md:order-2 order-1 text-lg text-gr-300">{brandName.brand.name} {brandName.title}</div>
                    :
                    <div className=" h-[40px] md:w-4/12 max-w-[300px] mx-auto md:order-2 rounded-[30px] order-1 overflow-hidden">
                        <CSkeleton />
                    </div>
                }

            </div>
        </div>
    )
}

export default ListProductHead;
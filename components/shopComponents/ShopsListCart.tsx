import React from "react";
import Link from "next/link"
import { ShopListCartProps } from "../../types/type-props/ShopListCartProps";
import RatingComponent from "../widgets/Rating.component";


export const ShopsListCart = ({ name, logo,uri , cover, review, slug, index , description, isSearchMode}: ShopListCartProps) => {

    return (
        <Link href={`${uri}` }>
            <a className="w-full md:w-6/12  p-[5px] mb-[10px] ">
                <div className=" w-full flex sm:flex-row flex-col ">
                    <div className=" w-full sm:w-6/12 relative">
                        {(cover && cover != null) ?
                            <img src={cover} className=" w-full h-full rounded-[10px]  " />
                            :
                            <img src={'/assets/media/shoppl.jpg'} className=" w-full h-full rounded-[10px]  " />
                        }
                        {isSearchMode ? "" :
                        <>
                            {index < 9 &&
                                <div
                                    className="sm:w-[50px] sm:h-[50px] w-[30px] h-[30px] top-[-15px] sm:left-[-15px] right-[-15px] absolute z-30 flex justify-center items-center">
                                    <span
                                        className="text-white absolute z-10 text-2xl font-bold text-xs">{index + 1}</span>
                                    <img src="/assets/svg/top_show.svg" className=" w-full h-full"/>
                                </div>
                            }
                        </>}
                    </div>
                    <div className=" w-full sm:w-6/12  flex flex-row sm:flex-col sm:items-start items-center justify-between sm:justify-between sm:mt-0 mt-[7px] pl-[10px] overflow-hidden ">
                        <div className=" flex sm:flex-col flex-row sm:items-start items-center">
                            {(logo && logo != null) ?
                                <img src={logo} alt="logo" className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-[5px] rounded-full" />
                                :
                                <img src={'/assets/media/shop.jpg'} alt="logo" className=" w-[30px] h-[30px] sm:w-[50px] sm:h-[50px] mr-[5px] rounded-full" />
                            }
                            <h3 className=" font-bold sm:text-base text-xs my-[6px]">{name}</h3>
                            <div className=" text-xs sm:flex hidden">{description} </div>
                        </div>
                        <div className=" flex sm:mt-[10px] mt-0">
                            <RatingComponent rateNumber={review}/>
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    )
}
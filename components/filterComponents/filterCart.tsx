import React, { useState } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { FilterCartProps } from "../../types/type-props/FilterCartProps";
import CSkeleton from "../CSkeleton/CSkeleton";
import AddressLoader from "../layout/AddressLoader";
import CImage from "../CImage";


const FilterCart = ({ name , description, slug, image_top, image_left, image_right, sideView ,uri , id }: FilterCartProps) => {
    return (
        <div className=" w-full md:w-3/12 sm:w-4/12  p-[5px] mb-[10px]">
            <Link href={`${uri}`}>
                <div className=" w-full flex flex-col cursor-pointer">
                    <div className=" w-full  relative">
                        {sideView == 'top' &&
                            <CImage src={image_top} alt="card" placeholder_height="150px" />
                        }
                        {sideView == 'left' &&
                            <CImage src={image_right} alt="card" placeholder_height="150px" />
                        }
                        {sideView == 'right' &&
                            <CImage src={image_left} alt="card" placeholder_height="150px" />
                        }
                    </div>
                    <div className=" w-full  flex flex-col">
                        <div className="w-full min-h-[40px] px-[10px] flex items-center justify-between">
                            <h3 className=" text-lg">{name}</h3>
                        </div>
                        <div className="w-full px-[10px] flex flex-col">
                            <span className=" text-xs">{description}</span>
                        </div>
                       
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default FilterCart;
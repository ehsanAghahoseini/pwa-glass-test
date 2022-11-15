import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShopCardProps } from "../../types/type-props/ShopCardProps";
import RatingComponent from "../widgets/Rating.component";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CSkeleton from "../CSkeleton/CSkeleton";


const ShopCard = ({ name, slug, cover, review,uri, id }: ShopCardProps) => {


    return (

        <Link href={`${uri}`}>
            <a className=" w-full  flex flex-col cursor-pointer">
                {/* <img src={cover} className=" w-full rounded-[10px]" /> */}
                <LazyLoadImage
                    placeholder={<div className="w-full rounded-[10px] overflow-hidden"><CSkeleton /></div>}
                    effect={"blur"}
                    alt={JSON.stringify(cover.length)}
                    src={cover}
                    width={"100%"}
                    className=" w-full rounded-[10px]"
                />
                <div className=" w-full h-[40px] flex justify-around items-center" >
                    <span className=" text-">{name}</span>
                    <div className=" flex">
                        <RatingComponent rateNumber={review}/>
                       
                    </div>
                </div>
            </a>
        </Link>
    )
}


export default ShopCard;

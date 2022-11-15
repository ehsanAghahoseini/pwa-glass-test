import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CSkeleton from "../CSkeleton/CSkeleton";
import SkeltonShopBannser from './../CSkeleton/SkeltonShopBannser';

declare interface SingleShopBannerProps {
    shopData: {
        id: number,
        slug: string,
        name: string,
        logo: string,
        cover: string,
        address: string,
        lat: number,
        lng: number
    }
}

export const SingleShopBanner = ({ shopData }: SingleShopBannerProps) => {
    return (
        <>
            {shopData?.name &&
                <>
                    <div className="w-full justify-center md:justify-between max-w-[1400px]  sm:min-h-[70px] min-h-[40px] flex items-center px-4 text-base md:text-lg text-gr-300">
                        <div onClick={() => { history.back() }} className=" w-[30px] h-[30px] rounded-full bg-gray-100 mr-4 md:flex hidden justify-center items-center cursor-pointer">
                            <img src='/assets/svg/leftBigArrow.svg' alt="icon" className="w-[15px] mr-[3px]" />
                        </div>
                        <span>Welcome to {shopData.name}</span>
                        <span></span>
                    </div>
                    <div className=" w-full max-w-[1400px] relative">
                        <LazyLoadImage
                            placeholder={<div className=" h-[400px]"><CSkeleton /></div>}
                            effect={"blur"}
                            alt='logo'
                            src={shopData.cover}
                            width={"100%"}
                            className=" w-full"
                        />
                        <div className=" w-[50px] md:w-[100px] md:h-[100px] h-[50px] rounded-full border absolute md:left-[100px] left-[25px] md:bottom-[-50px] bottom-[-25px] overflow-hidden">
                            <img src={shopData.logo} alt="logo" className=" w-full h-full" />
                        </div>
                    </div>
                </>
            }
            {!shopData?.name &&
                <SkeltonShopBannser />
            }
        </>
    )
}
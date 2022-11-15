import Link from "next/link";
import React, { useState, useEffect, FC } from "react";
import Skeleton from "react-loading-skeleton";
import { BannerProps } from "../../types/type-props/BannerProps";
import CSkeleton from "../CSkeleton/CSkeleton";
import dynamic from "next/dynamic";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Flickity: any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})


const Banners = ({ slidersData, title, children, bannerFailed }: BannerProps) => {

    const flickityOptionMainSlider = {
        initialIndex: 22,
        pageDots: false,
        accessibility: true,
        contain: true,
        wrapAround: true,
        autoPlay: 5000,
        bgLazyLoad: true,
        prevNextButtons: false,
        adaptiveHeight: true
    }


    return (
        <>
            {bannerFailed == false &&
                <div className=" slider w-[100%] max-w-[1400px] m-auto md:mt-7 mt-0  rounded-lg">
                    <div className=' w-full   flex justify-center'>
                        {title && !children &&
                            <div className=' w-full lg:w-11/12 h-[50px] flex items-center pl-[20px] '>
                                <img src="/assets/svg/discount.svg#discount" className=" w-[15px] md:w-[25px] h-[15px] md:h-[25px]" />
                                <span className='ml-[10px] md:text-base text-xs'>{title}</span>
                            </div>
                        }

                        {!title && children &&
                            children
                        }
                    </div>
                    {slidersData && slidersData.length !== 0 ?
                        <Flickity
                            className={'carousel-main-slider'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptionMainSlider} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate={true} // default false
                            static={true} // default false
                        >
                            {/*<img alt="banner" src="/assets/media/static/banner.jpg" className={" rounded-lg"}/>*/}
                            {slidersData.map((item: any, index: number) =>
                                <>
                                    {(item.url && item.url != null) ?
                                        <a key={index} href={item.url} target={'_blank'} rel="noreferrer" >
                                            <LazyLoadImage
                                                placeholder={<div className="w-full rounded-[10px] overflow-hidden"><CSkeleton /></div>}
                                                effect={"blur"}
                                                alt="banner"
                                                src={`${item.image ? item.image : "/assets/media/s1.png"}`}
                                                width={"100%"}
                                                className=" w-full"
                                            />
                                        </a>
                                        :
                                        <LazyLoadImage
                                            placeholder={<div className="w-full rounded-[10px] overflow-hidden"><CSkeleton /></div>}
                                            effect={"blur"}
                                            alt="banner"
                                            src={`${item.image ? item.image : "/assets/media/s1.png"}`}
                                            width={"100%"}
                                            className=" w-full"
                                        />}
                                </>
                            )}
                        </Flickity>
                        :
                        <>
                            <div className=" w-full xl:h-[350px] lg:h-[350px] md:h-[200px] sm:h-[180px] h-[130px] overflow-hidden">
                                <CSkeleton />
                            </div>
                        </>
                    }

                </div>
            }
        </>
    )
}


export default Banners;

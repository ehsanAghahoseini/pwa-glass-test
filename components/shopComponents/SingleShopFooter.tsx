import React from "react";

declare interface SingleShopFooterProps {
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

export const SingleShopFooter = ({ shopData }: SingleShopFooterProps) => {
    return (
        <div className=" w-full   flex justify-center bg-gr-400">
            {shopData &&
                <div className="w-full max-w-[1200px] min-h-[70px] p-[10px] flex sm:flex-row flex-col justify-between items-center " >
                    <img src={shopData.logo} alt="logo" className=" w-[50px] h-[50px] rounded-full" />
                    <div className=" flex items-center my-[10px] sm:my-0 ">
                        <svg x="0px" y="0px" viewBox="0 0 124 124" className="fill-gray-600 h-5 w-5  " >
                            <use xlinkHref="/assets/svg/location-color.svg#location-color" />
                        </svg>
                        <span className='ml-[10px]  text-sm text-gray-600 cursor-pointer ' >
                            {shopData.address}
                        </span>
                    </div>
                    <div className=" flex items-center ">
                        <span className='ml-[10px]  text-sm text-gray-600 cursor-pointer ' >
                            {/* Contact us */}
                        </span>
                    </div>

                </div>
            }
        </div>
    )
}
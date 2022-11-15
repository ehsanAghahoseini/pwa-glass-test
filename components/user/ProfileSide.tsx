import React from "react";
import Link from "next/link";
import Router from 'next/router'
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { ContextCart } from '../../components/context/ContextCart';

const ProfileSide = (props:any) => {
    const CtCard = React.useContext(ContextCart);
    const CtFav = React.useContext(ContextFavorite);

    const logOut = () => {
        localStorage.clear();
        sessionStorage.clear()
        CtCard.setCardList([]);
        CtCard.setCardLength(0)
        CtFav.setFavorite([]);
        Router.push('/')
    }

    return (
        <div className=" w-full   rounded overflow-auto mb-6 ">
            <div className=" w-full  flex  p-6 overflow-auto">
                <Link href="/user/profile">
                    <div className=" w-full   flex items-center cursor-pointer min-w-[100px] ">
                        <svg x="0px" y="0px" viewBox="0 0 16 16" className="fill-gr-300 h-5 w-5 mr-2 lg:flex hidden " >
                            <use xlinkHref="/assets/svg/person.svg#persong" />
                        </svg>
                        <span className={` text-gray-500 md:text-base text-sm pb-1 ${props.active == 'profile' ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Profile</span>
                    </div>
                </Link>
                <Link href="/user/change-password">
                    <div className=" w-full   flex items-center cursor-pointer min-w-[100px]">
                        <svg x="0px" y="0px" viewBox="0 0 512.011 512.011" className="fill-gr-300 h-5 w-5 mr-2 lg:flex hidden" >
                            <use xlinkHref="/assets/svg/key.svg#key" />
                        </svg>
                        <span className={` text-gray-500 md:text-base text-sm pb-1 ${props.active == 'password' ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Change password</span>
                    </div>
                </Link>
                <Link href="/user/address">
                    <div className=" w-full   flex items-center cursor-pointer min-w-[100px]">
                        <svg x="0px" y="0px" viewBox="0 0 124 124" className="fill-gr-300 h-5 w-5 mr-2 lg:flex hidden" >
                            <use xlinkHref="/assets/svg/location-color.svg#location-color" />
                        </svg>

                        <span className={` text-gray-500 md:text-base text-sm pb-1 ${props.active == 'address' ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Address</span>
                    </div>
                </Link>
                <Link href="/user/order">
                    <div className=" w-full   flex items-center cursor-pointer min-w-[100px]">
                        <svg x="0px" y="0px" viewBox="0 0 57 57" className="fill-gr-300 h-5 w-5 mr-2 lg:flex hidden" >
                            <use xlinkHref="/assets/svg/order.svg#logoutt" />
                        </svg>
                        <span className={` text-gray-500 md:text-base text-sm pb-1 ${props.active == 'orders' ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Orders</span>
                    </div>
                </Link>
                <div onClick={logOut} className=" w-full flex items-center cursor-pointer min-w-[100px]">
                    <svg x="0px" y="0px" viewBox="0 0 489.9 489.9" className="fill-gr-300 h-5 w-5 mr-2 lg:flex hidden" >
                        <use xlinkHref="/assets/svg/logout.svg#logoutg" />
                    </svg>
                    <span className=" text-gray-500 ">Log out</span>
                </div>
            </div>
        </div>
    )
}

export default ProfileSide
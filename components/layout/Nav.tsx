import React, { useState, useEffect, useContext } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import NavBasket from './NavBasket'
import NavFavorite from './NavFavorite';
import NavSearch from "./NavSearch";
import NavSearch2 from "./NavSearch2";
import CheckUserAuth from './../checkUserAuth/CheckUserAuth';
import { ContextAddress } from "../context/ContextAddress";
import Head from "next/head";
import { getRole } from "../Permissions/getRole";


const Nav = () => {
    const router = useRouter();
    const [activeNav, setActiveNav] = useState<Number>(0)
    const [categoriesList, setCategoriesList] = React.useState<[]>([])
    const [roleNumber, setRoleNumber] = useState<any>();

    const goToProfile = () => {
        if (CheckUserAuth()) {
            router.push('/user/profile')
        }
        else {
            router.push('/auth/login')
        }
    }
    const CtxAddress = useContext(ContextAddress);

    useEffect(() => {
        if (localStorage.getItem('selectedAddress')) {
            CtxAddress.setSelectedAddress(JSON.parse(String(localStorage.getItem('selectedAddress'))))
        }
    }, [])

    useEffect(() => {
        if (activeNav == 1) {
            setActiveNav(0)
        }
    }, [router.asPath]);

    useEffect(() => {
        setRoleNumber(localStorage.getItem('role'))
    }, [router])


    return (
        <>
            <nav className=" w-full  bg-gr-200 shadow border-b flex justify-center relative z-50 ">
                <div className=" w-full lg:w-11/12 flex ">
                    <div className=" w-4/12  h-12 flex lg:hidden justify-start items-center pl-3">
                        <div onClick={() => { setActiveNav(1) }} className=" w-6 h-5 flex justify-center items-center cursor-pointer">
                            <img className=" h-4 w-4 cursor-pointer " src='/assets/svg/menu.svg' alt="search" />
                        </div>
                    </div>
                    <div className=" w-4/12 min-w-[120px] lg:w-2/12 h-12 lg:h-16  flex justify-center items-center">
                        <Link href="/">
                            <a>
                                <img src='/assets/media/static/logo.png' alt="logo"
                                    className="w-full max-w-[100px] cursor-pointer" />
                            </a>
                        </Link>
                    </div>

                    <div className="  lg:w-6/12 h-16  lg:flex hidden items-center text-sm over">
                        <NavSearch2 />
                    </div>
                    <div className=" w-max pl-16 justify-center items-center cursor-pointer group hidden md:flex">
                        {roleNumber == '1' ?
                            <a href='https://my.optics4less.com/' target='_blank' rel="noreferrer"  className=" ring-offset-gray-900 w-max text-sm p-2 rounded-[30px] text-white bg-gr-300">Login to dashboard</a>
                            :
                            <Link href="/seller/register">
                                <a className=" ring-offset-gray-900 w-max text-sm p-2 rounded-[30px] text-white bg-gr-300">Open your
                                    business
                                </a>
                            </Link>
                        }
                    </div>
                    <div className=" w-4/12 flex justify-end items-center ">
                        <NavBasket />
                        <NavFavorite />
                        <NavSearch />
                        <div onClick={goToProfile} className=" h-8 w-8  m-2 flex justify-center items-center cursor-pointer hidden md:flex">
                            <img className=" h-4 lg:h-6 w-4 lg:w-6  " src='/assets/svg/Profile.png' alt="search" />
                        </div>
                        <Link href='/'>
                            <div className=" h-8 w-8  m-2 flex justify-center items-center cursor-pointer md:flex">
                                <img className=" h-4 lg:h-6 w-4 lg:w-6  " src='/assets/svg/home.svg' alt="home" />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            <div
                className={` w-full h-screen bg-gr-200 top-0 bottom-0 flex flex-col px-[20px] fixed z-50 transition-all ${activeNav == 1 ? ' right-0' : 'right-full'}`}>

                <div className=" w-full  my-3 flex justify-between items-center mb-[40px]">
                    <Link href="/"><img className=" h-[40px]  cursor-pointer rounded"
                        src='/assets/media/static/logo.png' alt="logo" />
                    </Link>
                    <div onClick={() => { setActiveNav(0) }} className=" w-10 h-10  rounded flex justify-center items-center text-[#000] text-xl cursor-pointer ">x</div>
                </div>


                <Link href="/">
                    <div className=" w-full flex items-center mb-6  cursor-pointer">
                        <img src="/assets/svg/home.svg" alt="svg" className=" w-6 mr-3" />
                        <span>HOME</span>
                    </div>
                </Link>
                <div onClick={goToProfile} className=" w-full flex items-center mb-6  cursor-pointer">
                    <img src="/assets/svg/Profile.png" alt="svg" className=" w-6 mr-3" />
                    <span>MY Profile</span>
                </div>
                <Link href="/user/order/">
                    <div className=" w-full flex items-center mb-6  cursor-pointer">
                        <img src="/assets/svg/shopping-cart.svg" alt="svg" className=" w-6 mr-3" />
                        <span>MY Orders</span>
                    </div>
                </Link>
                <Link href="/user/address/">
                    <div className=" w-full flex items-center mb-6  cursor-pointer">
                        <svg x="0px" y="0px" viewBox="0 0 124 124" className="fill-black w-6 mr-3  " >
                            <use xlinkHref="/assets/svg/location-color.svg#location-color" />
                        </svg>
                        <span>MY Addresses</span>
                    </div>
                </Link>

                {categoriesList.length !== 0 ? categoriesList.map((cat: any, index: number) =>
                    <Link key={index} href={`/categories/${cat.slug}`}>
                        <a key={index}
                            className=" w-full h-12 flex items-center pl-3 cursor-pointer border-b border-white text-white text-sm">
                            {cat.name}
                        </a>
                    </Link>
                ) :
                    <></>
                }
                <Link href="/"><a className=" w-full h-12 flex items-center pl-3 cursor-pointer border-b border-white text-white text-sm">About</a></Link>
                <Link href="/"><a className=" w-full h-12 flex items-center pl-3 cursor-pointer border-b border-white text-white text-sm">Contactus</a></Link>
            </div>
        </>
    )
}


export default Nav;

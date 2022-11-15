import React, { useState, useEffect } from "react";
import CSkeleton from "../CSkeleton/CSkeleton";
import Link from "next/link";
import { ShopProps } from "../../types/type-props/ShopProps";
import ShopCard from "./ShopCard";
import SkeltonShopCart from '../CSkeleton/SkeltonShopCart'
import ModalAddAddress from "../addressComponent/ModalAddAddress";
import { AddressListApi } from "../../apis/address-api/address-api";
import { AddressModel } from "../../types/models/address.types";
import { useContext } from "react";
import { ContextAddress } from "../context/ContextAddress";
import dynamic from "next/dynamic";

const Flickity: any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})

const ModalListAddress: any = dynamic(() => import('../searchAddressBar/ModalListAddress'), {
    ssr: false
})

const ListShops = ({ stores, displayShopsSkelton, shopFailed }: ShopProps) => {
    const [listData, setListData] = useState<any>([])
    const [display, setDisplay] = useState<boolean>(false)
    const [visibleAddAddress, setVisibleAddAddress] = useState<boolean>(false)
    const [visibleSelectAddress, setVisibleSelectAddress] = useState<boolean>(false)
    const [roleType, setRoleType] = useState<any>(0)
    const CtxAddress = useContext(ContextAddress)


    const flickityOptionMainSlider = {
        initialIndex: 3,
        pageDots: false,
        accessibility: true,
        contain: true,
        wrapAround: true,
        autoPlay: 5000,
        bgLazyLoad: true,
        prevNextButtons: true,
        adaptiveHeight: false
    }

    const getListAddress = async () => {
        setDisplay(true)
        try {
            const res: AddressModel[] = await AddressListApi()
            setDisplay(false)
            CtxAddress.setListAddress(res)
        }
        catch {
            setDisplay(false)
        }
    }

    const sortData = async () => {
        let newList = [];
        let newObject: any = {};
        for (let i in stores) {
            if (newObject['one'] == undefined) {
                newObject = {}
                newObject['one'] = stores[i];
                if (stores[+i + 1] == undefined) {
                    newList.push(newObject);
                }
            }

            else {
                newObject['two'] = stores[i];
                newList.push(newObject);
                newObject = {}
            }
        }
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);        
        setListData(newList)
    }

    useEffect(() => {
        if (stores) {
            sortData()
        }
    }, [stores])

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRoleType(localStorage.getItem('role'))
        }
    }, [])


    return (
        <>
            {shopFailed == false &&
                <div className=" w-[100%] max-w-[1400px] m-auto md:mt-7 mt-0  rounded-lg flex flex-col items-center justify-center">
                    <div className=' w-full   flex justify-center items-center'>
                        <div className=' w-full lg:w-11/12 h-[50px] flex items-center justify-between px-[20px] md:mb-[20px] mb-[10px] md:mt-[20px] mt-[10px] '>
                            <div className=" flex items-center">
                                <img className=' md:w-[20px] w-[15px]' src="/assets/svg/bag.svg" alt="filter" />
                                {roleType && roleType == '1' ?
                                    <span className='ml-[10px] md:text-base text-xs'>Optical Suppliers Near You</span>
                                    :
                                    <span className='ml-[10px] md:text-base text-xs'>Optical Stores Near You</span>
                                }
                            </div>
                            {displayShopsSkelton == false && listData.length != 0 &&
                                <Link href="/shops">
                                    <button className="md:px-[20px] px-[5px] md:py-[10px] py-[5px] md:rounded-[30px] rounded-[15px] bg-[#E7F5ED] md:text-base text-xs">Show All</button>
                                </Link>
                            }
                        </div>
                    </div>
                    <div className=" w-full lg:w-11/12">
                        {displayShopsSkelton == false && listData.length != 0 &&
                            <Flickity
                                className={'carousel-main-slider flectyshowshop'} // default ''
                                elementType={'div'} // default 'div'
                                options={{...flickityOptionMainSlider, }} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate={true} // default false
                                static={true} // default false
                            >
                                {listData.map((item: any, index: number) =>
                                    <div key={index} className=" md:w-[400px] w-[300px] flex flex-col  mx-[6px] min-h-[540px]">
                                        <ShopCard name={item.one.name} uri={item.one.uri} cover={item.one.cover} slug={item.one.slug} review={item.one.review} />
                                        {item.two &&
                                            <ShopCard name={item.two.name} uri={item.two.uri} cover={item.two.cover} slug={item.two.slug} review={item.two.review} />
                                        }
                                    </div>
                                )}
                            </Flickity>
                        }
                        {displayShopsSkelton == false && listData.length == 0 &&
                            <div className=" w-full py-[40px] flex flex-col justify-center items-center">
                                <img src="/assets/svg/gps-slash.svg" alt="search" className=" w-[130px]" />
                                <span className=" text-2xl mt-[35px]">No store found nearby</span>
                                <span onClick={() => { setVisibleSelectAddress(true) }} className=" mt-[15px] text-gr-300 cursor-pointer">Change Address</span>
                            </div>
                        }
                        {displayShopsSkelton == true &&
                            <SkeltonShopCart />
                        }
                    </div>

                    <ModalListAddress
                        visible={visibleSelectAddress}
                        setVisible={setVisibleSelectAddress}
                        listAddress={CtxAddress.listAddress}
                        setVisibleAddAddress={setVisibleAddAddress}
                        display={display}
                        setDisplay={setDisplay}
                    />

                    <ModalAddAddress
                        visible={visibleAddAddress}
                        setVisible={setVisibleAddAddress}
                        reload={getListAddress}
                    />

                </div>
            }
        </>
    )
}


export default ListShops;

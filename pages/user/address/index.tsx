import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl } from "../../../apis";
import Link from "next/link";
import { customApi } from "../../../apis";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import Router from 'next/router'
import { toast } from "react-toastify";
import { ProfileTypesInput } from '../../../types/profile.types';
import ProfileSide from '../../../components/user/ProfileSide';
import dynamic from 'next/dynamic'
import CModal from "../../../components/CModal/CModal";
import BtnLoader from "../../../components/layout/BtnLoader";
import LoadingPage from "../../../components/layout/LoadingPage";
import { AddressModel } from "../../../types/models/address.types";
import { AddressListApi } from "../../../apis/address-api/address-api";
import SkeltonAddressList from "../../../components/CSkeleton/SkeltonAddressList";
import ModalAddAddress from "../../../components/addressComponent/ModalAddAddress";
import ModalDetailAddress from "../../../components/addressComponent/ModalDetailAddress";
import ModalEditAddress from "../../../components/addressComponent/ModalEditAddress";
import ModalDeleteAddress from "../../../components/addressComponent/ModalDeleteAddress";
import { ContextAddress } from "../../../components/context/ContextAddress";
import { ContextFailLoad } from "../../../components/context/ContextFailLoad";



const MapCont: any = dynamic(() => import('../../../components/map/MapCont'), {
    ssr: false
})

const Index: NextPage = () => {
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [listAddress, setListAddress] = useState<any>([])
    const [activeAddress, setActiveAddress] = useState<number>(-1)
    const [visibleDelete, setVisibleDelete] = useState<boolean>(false)
    const [visibleEdit, setVisibleEdit] = useState<boolean>(false)
    const [visibleAdd, setVisibleAdd] = useState<boolean>(false)
    const [visibleDetial, setVisibleDetail] = useState<boolean>(false)
    const [addressSelect, setAddressSelect] = useState<any>(null)
    const [position, setPosition] = useState<any>([24.0937676, 53.4281644]);
    const CtxAddress = useContext(ContextAddress);
    const CtxFail = useContext(ContextFailLoad);



    const getListAddress = async () => {
        setDisplaySkelton(true)
        try {
            const res: AddressModel[] = await AddressListApi()
            setListAddress(res)
            setDisplaySkelton(false)
        }
        catch (err: any) {
            CtxFail.setFailedLoad(true)
            setDisplaySkelton(false)
            toast(err?.message, { type: "error" })
        }
    }

    const changeActiveAddress = (address: any) => {
        localStorage.setItem('selectedAddress', JSON.stringify(address));
        CtxAddress.setSelectedAddress(address)
        setActiveAddress(address.id)
    }


    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
            getListAddress()
        }
        else {
            Router.push('/auth/login')
        }
    }, [])


    useEffect(() => {
        if (localStorage.getItem('selectedAddress')) {
            let selectLocalAddress = JSON.parse(String(localStorage.getItem('selectedAddress')))
            if (selectLocalAddress.id) {
                setActiveAddress(selectLocalAddress.id)
            }
        }
    }, [])


    if (!isLogin) {
        return (<></>)
    }

    return (
        <>
            <div className=" w-full lg:w-10/12  m-auto mt-8 p-2 lg:p-0 flex flex-col relative">
                <ProfileSide active='address' />

                <div className=" w-full h-fit mb-2 p-4 flex flex-col overflow-hidden max-w-screen-lg mx-auto">
                    <div className=" w-full h-12 flex items-center mt-3">
                        <button onClick={() => { setVisibleAdd(true) }} className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none ">+ New Address</button>
                    </div>
                    <div className=" w-full flex flex-wrap mt-4">
                        {displaySkelton == false && listAddress.map((item: any, index: any) =>
                            <div key={index} className=" w-full py-[15px] items-center mb-6  border-b flex md:flex-row flex-col ">
                                <div onClick={() => changeActiveAddress(item)} className=" md:w-[85%] w-full  flex items-center px-4 cursor-pointer ">
                                    <div className=" w-[20px] h-[20px] rounded-full border border-gr-300 flex justify-center items-center">
                                        {activeAddress == item.id &&
                                            <div className=" w-[10px] h-[10px] rounded-full bg-gr-300" />
                                        }
                                    </div>
                                    <div className=" w-[20px] mx-3">
                                        <img src="/assets/svg/location.svg" alt="logo" className="w-[25px] " />
                                    </div>
                                    <span className=" w-[calc(100%-60px)] text-gray-500  ">{item.address}</span>
                                </div>
                                <div className=" md:w-[15%] w-full  md:mt-[0] mt-[10px]  px-4  flex items-center justify-end">
                                    <div onClick={() => { setVisibleDetail(true), setAddressSelect(item), setPosition([item.location.lat, item.location.lng]) }} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                        <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">View</div>
                                        <img src="/assets/svg/eye.png" className="w-4 h-4" />
                                    </div>
                                    <div onClick={() => { setVisibleEdit(true), setAddressSelect(item), setPosition([item.location.lat, item.location.lng]) }} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                        <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Edit</div>
                                        <img src="/assets/svg/edit.png" className="w-4 h-4" />
                                    </div>
                                    {listAddress.length > 1 &&
                                        <div onClick={() => { setVisibleDelete(true), setAddressSelect(item) }} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                            <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Delete</div>
                                            <img src="/assets/svg/trash.png" className="w-4 h-4" />
                                        </div>
                                    }

                                </div>
                            </div>
                        )}
                        {displaySkelton == true && new Array(5).fill(1).map((item: any, index: number) =>
                            <SkeltonAddressList key={index} />
                        )}
                    </div>
                </div>

                <ModalAddAddress
                    visible={visibleAdd}
                    setVisible={setVisibleAdd}
                    reload={getListAddress}
                />

                <ModalDetailAddress
                    visible={visibleDetial}
                    setVisible={setVisibleDetail}
                    addressSelect={addressSelect}
                />

                <ModalEditAddress
                    visible={visibleEdit}
                    setVisible={setVisibleEdit}
                    addressSelect={addressSelect}
                    setAddressSelect={setAddressSelect}
                    reload={getListAddress}
                />

                <ModalDeleteAddress
                    visible={visibleDelete}
                    setVisible={setVisibleDelete}
                    addressSelect={addressSelect}
                    reload={getListAddress}
                    setAddressSelect={setAddressSelect}
                    listAddress={listAddress}
                    setActiveAddress={setActiveAddress}
                    activeAddress={activeAddress}
                />

            </div>
        </>
    )
}

export default Index;
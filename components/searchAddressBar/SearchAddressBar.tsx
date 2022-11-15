import { useContext, useEffect, useState } from "react";
import CheckUserAuth from "../checkUserAuth/CheckUserAuth";
import CModal from "../CModal/CModal";
import { AddressListApi } from "../../apis/address-api/address-api";
import { AddressModel } from "../../types/models/address.types";
import { toast } from "react-toastify";
import ModalAddAddress from "../addressComponent/ModalAddAddress";
// import ModalListAddress from "./ModalListAddress";
import { ContextAddress } from "../context/ContextAddress";
import dynamic from "next/dynamic";

const ModalListAddress:any = dynamic(() => import('./ModalListAddress'), {
    ssr: false
})

const SearchAddressBar = () => {
    const [display, setDisplay] = useState<boolean>(false)
    const [visibleAddAddress, setVisibleAddAddress] = useState<boolean>(false)
    const [visibleSelectAddress, setVisibleSelectAddress] = useState<boolean>(false)
    const [listAddress, setListAddress] = useState<AddressModel[]>([])
    const CtxAddress = useContext(ContextAddress)

    const getListAddress = async () => {
        setDisplay(true)
        try {
            const res: AddressModel[] = await AddressListApi()
            setListAddress(res)
            setDisplay(false)
            CtxAddress.setListAddress(res)
        }
        catch {
            setDisplay(false)
        }
    }

    const handelOpenModal = () => {
        setVisibleSelectAddress(true)
    }

    const checkAddressSelcted = () => {
        if (localStorage.getItem('selectedAddress')) {
            let local = localStorage.getItem('selectedAddress')
            if (local != "0" && typeof local == 'string') {
                CtxAddress.setSelectedAddress(JSON.parse(local))
            }
            else {
                CtxAddress.setSelectedAddress(null)
                setTimeout(() => {
                    setVisibleSelectAddress(true)
                }, 5000)
            }
        }
        else {
            localStorage.setItem('selectedAddress', "0");
            CtxAddress.setSelectedAddress(null)
            setTimeout(() => {
                setVisibleSelectAddress(true)
            }, 3000)
        }
    }


    useEffect(() => {
        checkAddressSelcted()
        if (CheckUserAuth()) {
            getListAddress()
        }
    }, [])

    return (
        <>
            <div className=" w-full  bg-gr-400 flex justify-center">
                <div className=" w-[100%] max-w-[1400px] h-[40px] md:h-[50px]  flex justify-center">
                    <div className=" w-full lg:w-11/12 h-[40px] md:h-[50px] flex items-center pl-[20px] overflow-hidden ">
                        <svg x="0px" y="0px" viewBox="0 0 124 124" className="fill-gray-600 h-5 w-5  " >
                            <use xlinkHref="/assets/svg/location-color.svg#location-color" />
                        </svg>
                        <span onClick={handelOpenModal} className='ml-[10px]  text-sm text-gray-600 cursor-pointer ' >
                            {CtxAddress.selectedAddress == null ? 'Select Location' : CtxAddress.selectedAddress.address}
                        </span>
                    </div>
                </div>
            </div>

            <ModalListAddress
                visible={visibleSelectAddress}
                setVisible={setVisibleSelectAddress}
                listAddress={listAddress}
                setVisibleAddAddress={setVisibleAddAddress}
                display = {display}
                setDisplay={setDisplay}
            />

            <ModalAddAddress
                visible={visibleAddAddress}
                setVisible={setVisibleAddAddress}
                reload={getListAddress}
            />

        </>
    )
}

export default SearchAddressBar;
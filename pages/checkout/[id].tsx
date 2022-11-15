import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl } from "../../apis";
import { ContextCart } from '../../components/context/ContextCart';
import BasketComponentItem from "../../components/basketComponents/BasketComponentItem";
import SkeltonBasket from "../../components/CSkeleton/SkeltonBasket";
import { ProductsDetailsApi } from './../../apis/products-api/products-api';
import CheckoutComponentItem from "../../components/basketComponents/CheckoutComponentItem";
import { useRouter } from "next/router";
import CheckUserAuth from "../../components/checkUserAuth/CheckUserAuth";
import { AddressListOrderApi } from "../../apis/address-api/address-api";
import { AddressModel } from "../../types/models/address.types";
import { PayMethodApi, PayCreditsApi } from "../../apis/payment-api/payment-api";
import ModalAddAddress from "../../components/addressComponent/ModalAddAddress";
import { ContextFailLoad } from "../../components/context/ContextFailLoad";


const Index: NextPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [visibleAdd, setVisibleAdd] = useState<boolean>(false)
    const [listMethodPay, setListMethodPay] = useState<any>([])
    const [listAddress, setListAddress] = useState<any>([])
    const [cart, setCart] = useState<any>([]);
    const [cardSelected, setCardSelected] = useState<any>(null)
    const [creditDay, setCreditDay] = useState<number>(0)
    const CtxCard = useContext(ContextCart);
    const CtxFail = useContext(ContextFailLoad);
    const router = useRouter()

    const getCreated = async () => {
        try {
            const res = await PayCreditsApi(router.query.id)
            setCreditDay(res)
        }
        catch {
            CtxFail.setFailedLoad(true)
        }
    }

    const getPaymentMethod = async () => {
        try {
            const res = await PayMethodApi()
            setListMethodPay(res)
        }
        catch {
            CtxFail.setFailedLoad(true)
        }
    }

    const getListAddress = async () => {
        let shopId = router.query.id
        try {
            const res: any = await AddressListOrderApi(shopId)            
            setListAddress(res)
        }
        catch (err: any) {
            CtxFail.setFailedLoad(true)
        }
    }

    const getData = async () => {
        await setDisplaySkelton(true)
        await setDisplaySkelton(false)
    }

    useEffect(() => {
        if (localStorage.getItem('cart') && router.query.id) {
            let card = JSON.parse(String(localStorage.getItem('cart')))
            setCart(card)
            for (let i of card) {
                if (i.shop.id == router.query.id) {
                    setCardSelected(i)
                    getListAddress()
                }
            }
        }
    }, [router.query.id])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
        }
        else {
            router.push('/auth/login')
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role') && router.isReady) {
            if (localStorage.getItem('role') == '1') {
                getCreated()
            }
            else {
                getPaymentMethod()
            }
        }
    }, [router])


    if (!isLogin) {
        return (<></>)
    }

    return (
        <div className="w-full flex flex-col items-center ">
            {displaySkelton == false && CtxCard.cardLength != 0 &&
                <>
                    <div className=" w-full max-w-[1000px] flex flex-col  p-[10px] md:p-[20px] sm:p-[10px]">
                        {cardSelected != null &&
                            <CheckoutComponentItem
                                value={cardSelected}
                                listAddress={listAddress}
                                listMethodPay={listMethodPay}
                                setVisibleAdd={setVisibleAdd}
                                creditDay={creditDay}
                            />
                        }
                    </div>
                </>
            }
            {displaySkelton == false && CtxCard.cardLength == 0 &&
                <div className=" w-full max-w-[1000px] min-h-screen flex flex-col justify-center items-center  p-[10px] md:p-[20px] sm:p-[10px]">
                    <img src="/assets/svg/empty-cart.svg" className=" w-[200px]" />
                    <span className=" text-2xl mt-[20px]">Empty cart</span>
                </div>
            }
            {displaySkelton == true &&
                <SkeltonBasket />
            }

            <ModalAddAddress
                visible={visibleAdd}
                setVisible={setVisibleAdd}
                reload={getListAddress}
            />

        </div>
    )
}

export default Index;
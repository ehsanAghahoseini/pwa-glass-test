import React, { useEffect, useState, useContext, useRef } from "react";
import { ContextCart } from '../context/ContextCart';
import { ContextAddress } from "../context/ContextAddress";
import Link from "next/link";
import { PayMethodApi, StartPay, CheckCoupon } from "../../apis/payment-api/payment-api";
import { toast } from "react-toastify";
import BtnLoader from "../layout/BtnLoader";
import { useRouter } from "next/router";
import CModal from "../CModal/CModal";
import { shippingType } from "../../types/models/shipping.types";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";

const CheckoutComponentItem = ({ value, listAddress, listMethodPay, setVisibleAdd, creditDay }: any) => {
    const CtxCard = useContext(ContextCart);
    const CtxAddress = useContext(ContextAddress);
    const couponRef: any = useRef()
    const router = useRouter()
    const [visibleCashResualt, setVisibleCashResualt] = useState<boolean>(false)
    const [cashPaymentStatus, setCashPaymentStatus] = useState<number>(0)
    const [cashPaymentData, setCashPaymentData] = useState<any>(null)
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [displayCouponBtn, setDisplayCouponBtn] = useState<boolean>(false)
    const [activeAddress, setActiveAddress] = useState<any>(null)
    const [selectPatMethod, setSelectPayMethod] = useState<any>(null)
    const [vat, setVat] = useState<number>(0)
    const [roleType, setRoleType] = useState<any>(0)
    const [shippingDay, setShippingDay] = useState<number>(0)
    const [subtotal, setSubtotal] = useState<any>({
        'withoutShipping': 0,
        'withoutShippingWithoutTax': 0,
        'withShipping': 0,
        'withCouponWithOutShiping': 0,
        'withCouponWithShiping': 0,
    })
    const [coupon, setCoupon] = useState<any>({
        'status': 0,
        'discount': 0,
        'code': null,
    })

    const onOkModal = (path: string) => {
        localStorage.removeItem('cart')
        CtxCard.setCardList([])
        CtxCard.setCardLength(0)
        setCashPaymentData(null)
        setCashPaymentStatus(0)
        router.push(path)
    }

    const calucate = async (payMethod: any) => {
        await setSelectPayMethod(payMethod)
        let priceWithoutShipping = 0;
        let afterCouponafterShiping = 0;
        let afterCouponbeforeShiping = 0;
        if (value.shopCart.length > 1) {
            priceWithoutShipping = value.shopCart.map((items: any) => (items.price * items.count)).reduce((prev: any, curr: any) => prev + curr, 0)
        }
        else {
            priceWithoutShipping = value.shopCart[0].price * value.shopCart[0].count
        }
        let priceWithoutShipping_tax: any = (priceWithoutShipping + (priceWithoutShipping * 0.05));
        let priceWithShipping_tax: any = priceWithoutShipping_tax + +activeAddress?.shipping?.price;
        setVat(priceWithoutShipping * 0.05)
        if (coupon.status == 1) {
            afterCouponafterShiping = priceWithShipping_tax - (priceWithShipping_tax * coupon.discount);
            afterCouponbeforeShiping = priceWithoutShipping_tax - (priceWithoutShipping_tax * coupon.discount);
        }
        setSubtotal({
            'withoutShipping': priceWithoutShipping_tax,
            'withoutShippingWithoutTax': priceWithoutShipping,
            'withShipping': priceWithShipping_tax,
            'withCouponWithShiping': afterCouponafterShiping,
            'withCouponWithOutShiping': afterCouponbeforeShiping,
        })
    }


    const startPayment = async () => {
        if (activeAddress == null) {
            return toast('Chosse an address or add new one', { type: "info" })
        }
        if (!localStorage.getItem('selectedAddress')) {
            return toast('address null', { type: "error" })
        }
        if (selectPatMethod == null) {
            return toast('please select pay method', { type: "error" })
        }
        setDisplayBtn(true)
        setCashPaymentStatus(0)
        try {
            const res = await StartPay(value, selectPatMethod, subtotal, coupon, creditDay, roleType)
            if (selectPatMethod.id == 3 || selectPatMethod.id == 4) {
                toast('Payment was successful', { type: "success" })
                setCashPaymentData(res)
                setCashPaymentStatus(1)
                setVisibleCashResualt(true)

            }
            else {
                location.href = `${res}`
                setDisplayBtn(false)
            }
        } catch (err: any) {
            if (selectPatMethod.id == 3) {
                setCashPaymentStatus(2)
                setVisibleCashResualt(true)
            }
            toast(err, { type: "error" })
            setDisplayBtn(false)
        }
    }

    const checkCoupon = async () => {
        if (activeAddress == null) {
            return toast('Chosse an address or add new one', { type: "info" })
        }
        if (selectPatMethod == null) {
            return toast('First select pay method', { type: "info" })
        }
        setDisplayCouponBtn(true);
        setCoupon({ 'status': 0, 'discount': 0, 'code': null })
        try {
            const res = await CheckCoupon(couponRef, value.shop.id)
            setDisplayCouponBtn(false)
            const discount = res.discount * 0.01
            let price = { ...subtotal }
            price['withCouponWithShiping'] = (price['withShipping'] - (price['withShipping'] * discount))
            price['withCouponWithOutShiping'] = (price['withoutShipping'] - (price['withoutShipping'] * discount))
            setSubtotal(price)
            setCoupon({ 'status': 1, 'discount': discount, 'code': res.code })
        } catch (err: any) {
            toast(err.message, { type: "error" })
            setCoupon({ 'status': -1, 'discount': 0, 'code': null })
            setDisplayCouponBtn(false)
        }
    }

    const changeActiveAddress = (address: any) => {
        if (address.is_support == true) {
            localStorage.setItem('selectedAddress', JSON.stringify(address));
            setActiveAddress(address)
            CtxAddress.setSelectedAddress(address)
        } else {
            return toast('Address not supported', { type: "error" })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('selectedAddress') && listAddress) {
            let selectLocalAddress = JSON.parse(String(localStorage.getItem('selectedAddress')))
            if (selectLocalAddress.id) {
                for (let i of listAddress) {
                    if (i.id == selectLocalAddress.id && i.is_support == true) {
                        setActiveAddress(i)
                    }
                }
            }
        }
    }, [listAddress])

    useEffect(() => {
        if (value) {
            let days = 0;
            for (let i of value.shopCart) {
                if (i.delivery_day > days) {
                    days = i.delivery_day;
                }
            }
            setShippingDay(days)
        }
    }, [value])

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRoleType(localStorage.getItem('role'))
            if (localStorage.getItem('role') == '1') {
                calucate({ 'name': 'created', 'id': 4 })
            }
        }
    }, [router, activeAddress])

    return (
        <>
            {value &&
                <div className=" w-full flex flex-col border-2 border-gr-100 rounded mb-6">

                    <div className="   p-3 flex flex-col ">
                        <Link href={`/s/${value.shop.slug}`}>
                            <img src={value.shop.logo} className=" w-[60px] h-[60px] shadow rounded-full cursor-pointer"
                                alt="logo" />
                        </Link>
                        <Link href={`/s/${value.shop.slug}`}>
                            <span className="text-sm mt-2 cursor-pointer">{value.shop.name}</span>
                        </Link>
                    </div>

                    <div className=" w-full flex flex-col p-3 ">
                        {value.shopCart.length > 0 && value.shopCart.map((item: any, index: number) =>
                            <div key={index} className=" flex items-center justify-between mb-6 md:mb-3">
                                <span>{index + 1}</span>
                                <Link href={`${item.uri}`}>
                                    <img className=" w-6/12 md:w-5/12 rounded-[10px] cursor-pointer" src={item.image} />
                                </Link>
                                <div className=" w-6/12 md:w-7/12 flex md:flex-row flex-col items-center">
                                    <div className=" w-full md:w-6/12  flex items-center justify-around  md:mt-0 mt-3">
                                        <img src={item.color} alt="color"
                                            className=" w-[20px] h-[20px] rounded-full  my-2" />
                                        <img className=" w-4" src='/assets/svg/exit.svg' />
                                        <span className="font-bold md:text-2xl text-base">{item.count}</span>
                                    </div>
                                    <div className=" w-full md:w-6/12 flex justify-center">
                                        {checkPermission(PricePermissions.view) &&
                                            <span className=" font-semibold ">AED {(item.price * item.count).toFixed(2)}</span>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="w-full p-3 flex flex-wrap">
                        <div className="w-full  md:w-8/12  order-2 md:order-1">
                            <div
                                className="w-[180px] h-[35px]  mb-3 bg-gr-100 rounded-[30px] border border-gr-300 flex items-center justify-center">
                                <img src="/assets/svg/car.png" className=" w-5 mr-2" />
                                <span>{shippingDay} Day Shipping</span>
                            </div>
                            {listAddress.length > 0 && listAddress.map((item: any, index: any) =>
                                <div key={index}
                                    className=" w-full py-[5px] items-center mb-2   flex md:flex-row flex-col ">
                                    <div onClick={() => changeActiveAddress(item)}
                                        className="  w-full  flex items-center px-4 cursor-pointer ">
                                        <div
                                            className=" w-[20px] h-[20px] rounded-full border border-gr-300 flex justify-center items-center">
                                            {activeAddress?.id == item.id &&
                                                <div className=" w-[10px] h-[10px] rounded-full bg-gr-300" />
                                            }
                                        </div>
                                        <div className=" w-[20px] mx-3">
                                            {item.is_support ?
                                                <img src="/assets/svg/location.svg" alt="logo" className="w-[25px] " />
                                                :
                                                <img src="/assets/svg/location-slash.svg" alt="logo"
                                                    className="w-[25px] " />
                                            }
                                        </div>
                                        <span
                                            className={` w-[calc(100%-60px)] ${item.is_support ? 'text-gray-500' : 'text-[#ED0006]'} `}>
                                            <span>{item.address}</span>
                                            {item.is_support == false && <span className="text-xs text-gray-500 ml-1">( Address not supported )</span>}
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className=" w-full h-7 px-4 flex items-center text-gr-300 mt-4 text-sm ">
                                <span onClick={() => {
                                    setVisibleAdd(true)
                                }} className="cursor-pointer">+ Add new address</span>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 flex flex-col  order-1 md:order-2 p-2">
                            {selectPatMethod != null && roleType != 1 &&
                                <div className=" flex items-center text-xs">
                                    <span>+ Shipping</span>
                                    <span className=" ml-[20px]">
                                        AED {activeAddress?.shipping?.price}
                                        <span className="ml-1">
                                            (
                                            {shippingType.city == activeAddress?.shipping?.type && "support city shipping"}
                                            {shippingType.country == activeAddress?.shipping?.type && "support country shipping"}
                                            {shippingType.gulf == activeAddress?.shipping?.type && "support gulf shipping"}
                                            {shippingType.internationl == activeAddress?.shipping?.type && "support internationl shipping"}
                                            )
                                        </span>
                                    </span>
                                </div>
                            }
                            {selectPatMethod != null && checkPermission(PricePermissions.view) &&
                                <div className=" flex items-center text-xs mt-1">
                                    <span>total</span>
                                    <span className=" ml-[20px]">AED {subtotal?.withoutShippingWithoutTax.toFixed(2)}</span>
                                </div>
                            }
                            {selectPatMethod != null && checkPermission(PricePermissions.view) &&
                                <div className=" flex items-center text-xs mt-1">
                                    <span>+ Vat</span>
                                    <span className=" ml-[20px]">AED {vat.toFixed(2)}</span>
                                </div>
                            }
                            {selectPatMethod != null && coupon.status == 1 && checkPermission(PricePermissions.view) &&
                                <div className=" flex items-center text-xs mt-1">
                                    <span>- discount</span>
                                    <span className=" ml-[20px]">AED {(subtotal?.withoutShipping * coupon.discount).toFixed(2)}</span>
                                </div>
                            }
                            {checkPermission(PricePermissions.view) &&
                                <>
                                    <span className=" my-2">SubTotal :</span>
                                    {selectPatMethod != null && coupon.status == 1 &&
                                        <span className=" font-bold">{selectPatMethod.name === "paypal" ? "$" : "AED"} {(+subtotal.withCouponWithOutShiping).toFixed(2)} </span>
                                    }
                                    {selectPatMethod != null && coupon.status != 1 && selectPatMethod?.name == 'created' &&
                                        <span className=" font-bold">{selectPatMethod?.name === "paypal" ? "$" : "AED"} {subtotal?.withoutShipping}</span>
                                    }
                                </>
                            }
                        </div>
                    </div>

                    <div className=" w-full flex flex-wrap mb-3">
                        <div className="w-full flex flex-col md:w-4/12 md:pl-0 pl-2 pr-2 order-1 md:order-2">
                            <div className=" w-full flex md:flex-col flex-row">
                                <div className=" w-full   mb-[10px] md:pr-0 pr-3 flex flex-col">
                                    {coupon.status == 1 && <span className=" text-gr-300 text-sm mb-1 ml-2">process successfully done</span>}
                                    {coupon.status == -1 && <span className="text-red-600 text-sm mb-1 ml-2">coupon not found</span>}
                                    <input type="text"
                                        ref={couponRef}
                                        className=" w-full  focus:outline-none h-[40px] rounded-[30px] px-[10px] border border-black"
                                        placeholder="Coupon Code " />
                                </div>
                            </div>
                            {!displayCouponBtn ?
                                <div onClick={checkCoupon}
                                    className=" w-[120px] h-[40px] rounded-[30px] bg-gr-300 text-white flex justify-center items-center cursor-pointer">Check
                                </div>
                                :
                                <div
                                    className=" w-[120px] h-[40px] rounded-[30px] bg-gr-300 text-white flex justify-center items-center cursor-pointer relative">
                                    <BtnLoader /></div>

                            }
                            {displayBtn == false ?
                                <div onClick={startPayment} className=" w-full h-[50px] mt-4 bg-gr-300 text-white rounded-[30px] hidden md:flex justify-center items-center cursor-pointer">{roleType != 1 ? 'Payment' : 'Checkout'}</div>
                                :
                                <div
                                    className=" w-full h-[50px] mt-4 bg-gr-300 text-white rounded-[30px] hidden md:flex justify-center items-center cursor-pointer relative">
                                    <BtnLoader /></div>

                            }
                        </div>
                        <div className="w-full  md:w-8/12  flex flex-col justify-center order-2 md:order-1">
                            {roleType != 1 ?
                                <>
                                    <span className="md:ml-6 ml-3 text-sm text-gr-300 md:mt-0 mt-5">Select payment method</span>
                                    <div className=" w-full flex items-center py-2 overflow-hidden md:pl-4">
                                        {listMethodPay.map((val: any, index: number) =>
                                            <div onClick={() => calucate(val)} key={index}
                                                className={` relative rounded  mx-[10px] flex flex-col justify-center items-center cursor-pointer ${selectPatMethod != null && selectPatMethod.id == val.id ? ' border-gr-300' : 'border-gray-300'}`}>
                                                <img src={val.icon} alt="icon" className=" w-[100px]" />
                                                {selectPatMethod != null && selectPatMethod.id == val.id &&
                                                    <img src="/assets/svg/fullcheck.svg"
                                                        className={` absolute w-5 h-5 top-[-7px] right-[-7px] `} />

                                                }
                                            </div>
                                        )}
                                    </div>
                                </>
                                :
                                <div className="md:ml-6 ml-3 md:mt-0 mt-5 flex flex-col">
                                    <span className=" text-sm text-gr-300 ">Payment Term :</span>
                                    <span className=" text-sm  mt-4">{creditDay} days</span>
                                </div>
                            }
                            {displayBtn == false ?
                                <div onClick={startPayment} className=" w-full h-[50px] mt-4 bg-gr-300 text-white rounded-[30px] md:hidden flex justify-center items-center cursor-pointer">{roleType != 1 ? 'Payment' : 'Checkout'}</div>
                                :
                                <div
                                    className=" w-full h-[50px] mt-4 bg-gr-300 text-white rounded-[30px] md:hidden flex justify-center items-center cursor-pointer relative">
                                    <BtnLoader /></div>
                            }
                        </div>
                    </div>
                </div>
            }

            <CModal visible={visibleCashResualt} accessClose={true} setVisible={setVisibleCashResualt} radius={'30px'} uId={'message-register-seller'} >
                <>
                    {cashPaymentStatus == 1 &&
                        <div className=' w-[90%] rounded  m-auto py-[20px] flex flex-col justify-center items-center'>
                            <img src={'/assets/media/success.png'} alt=" success" className=' w-[60px]' />
                            <span className='mt-[15px]'>{selectPatMethod.id == 4 ? 'Successful' : 'Successful payment'}</span>
                            <span className='mt-[15px] text-gray-500 text-xl'>Refrence code :  {cashPaymentData}</span>
                            <div className=' w-full flex justify-center mt-[40px]'>
                                <button onClick={() => onOkModal('/user/order')} className=' px-[10px] h-[40px] mx-2 text-white rounded bg-[#0aa06e]'>Orders</button>
                                <button onClick={() => onOkModal('/')} className=' px-[10px] h-[40px] mx-2 text-white rounded bg-[#0aa06e]'>Main page</button>
                            </div>
                        </div>
                    }

                    {cashPaymentStatus == 2 &&
                        <div className=' w-[90%] rounded  m-auto py-[20px] flex flex-col justify-center items-center'>
                            <img src={'/assets/media/fail.png'} alt=" success" className=' w-[60px]' />
                            <span className='mt-[15px]'>Unsuccessful payment</span>
                            <div className=' w-full flex justify-center mt-[40px]'>
                                <button onClick={() => { setVisibleCashResualt(false) }} className=' px-[10px] h-[40px] mx-2 text-white rounded bg-[#f74663]'>Pay again</button>
                                <Link href={'/'}>
                                    <button className=' px-[10px] h-[40px] mx-2 text-white rounded bg-[#f74663]'>Main page</button>
                                </Link>
                            </div>
                        </div>
                    }
                </>
            </CModal>
        </>
    )
}

export default CheckoutComponentItem;
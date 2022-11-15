import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ContextCart } from '../../../components/context/ContextCart';
import Link from "next/link";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import { customApi, baseUrl, hyperPayUrl } from "../../../apis";
import Router, { useRouter } from 'next/router'
import { toast } from "react-toastify";
import CModal from "../../../components/CModal/CModal";
import BtnLoader from "../../../components/layout/BtnLoader";
import Script from 'next/script'

const Index: NextPage = () => {
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const routing = useRouter();


 

    useEffect(() => {
        if (routing.query.client) {
         setIsPageLoading(true)
        }
        else {
            setIsPageLoading(false)
        }
    }, [routing.query.client])


    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
        }
        else {
            Router.push('/auth/login')
        }
    }, [routing.query.client])


    if (!isLogin) {
        return (<></>)
    }


    return (
        // <div className=" w-full lg:w-6/12   m-auto mt-8 mb-20 p-2 flex flex-col items-center justify-center relative">
        //     <form id="submitHyperPayForm" onSubmit={(e) => submitHyperPay(e)} className={` transition-all duration-700  w-full flex flex-col items-center  shadow sm:w-8/12 mt-6 rounded p-4 opacity-100"`}>
        //         <img src='/assets/logo/hyper.png' alt=" logo" className=" w-[100px]" />
        //         <div className=" w-full flex items-center mt-[30px]" >
        //             <div className=" flex flex-col w-6/12 px-[5px] ">
        //                 <span className=" text-sm text-gray-500 mb-1  ">Brand </span>
        //                 <select className="  w-full  h-[40px] bg-white border">
        //                     <option value="VISA" >Visa</option>
        //                 </select>
        //             </div>
        //             <div className=" flex items-center w-6/12 pl-[20px] mt-[20px]">
        //                 <img src='/assets/logo/visa.png' alt="icon" className=" w-[30px]" />
        //             </div>
        //         </div>

        //         <div className=" w-full flex items-center mt-[30px] " >
        //             <div className=" w-[65%] px-[5px] flex flex-col justify-center ">
        //                 <span className=" text-sm text-gray-500 mb-1  ">Card Number </span>
        //                 <input type="number" placeholder="Card Number" className=" border w-full h-[40px] focus:outline-none px-1"></input>
        //             </div>
        //             <div className=" w-[35%]  px-[5px] flex flex-col justify-center">
        //                 <span className=" text-sm text-gray-500 mb-1">Expiry Date</span>
        //                 <div className=" w-full flex items-center">
        //                     <input maxLength={4} minLength={4} type="text" placeholder="year" className=" border w-5/12 h-[40px] focus:outline-none px-1" />
        //                     <span className=" text-gray-400 mx-2">/</span>
        //                     <input maxLength={2} type="text" placeholder="month" className=" border w-5/12 h-[40px] focus:outline-none px-1" />
        //                 </div>

        //             </div>
        //         </div>

        //         <div className=" w-full flex items-center mt-[30px] " >
        //             <div className=" w-[65%] px-[5px] flex flex-col justify-center ">
        //                 <span className=" text-sm text-gray-500 mb-1  ">Card holder </span>
        //                 <input type="text" placeholder="Card holder" className=" border w-full h-[40px] focus:outline-none px-1"></input>
        //             </div>
        //             <div className=" w-[35%]  px-[5px] flex flex-col justify-center">
        //                 <span className=" text-sm text-gray-500 mb-1  ">CVV</span>
        //                 <input type="number" placeholder="CVV" className=" border w-full h-[40px] focus:outline-none px-1"></input>
        //             </div>
        //         </div>

        //         <div className=" w-full mt-[30px]">
        //             <button className=" w-full h-[40px] bg-ehbi-300 text-white">
        //                 {buttonLoading ?
        //                     <div> Waiting<span className="alarm_fade_in_out"> ...</span></div> : "Pay Now"}</button>
        //         </div>

        //     </form>
        // </div>
        <>
            {isPageLoading == true &&
                <>
                    <Script src={`https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${routing.query.client}`} />
                    <div className=" w-full lg:w-6/12   m-auto mt-8 mb-20 p-2 flex flex-col items-center justify-center relative">
                        <form action={`https://api.optics4less.com/api/hyper_callback`} className="paymentWidgets" data-brands="VISA MASTER AMEX"></form>
                    </div>
                </>
            }
        </>

    )
}

export default Index;
import React, { FormEventHandler, useContext, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { LoginAPi } from "../../../apis/auth-api/auth-api";
import { toast } from "react-toastify";
import { AddressListApi } from "../../../apis/address-api/address-api";
import { AddressModel } from "../../../types/models/address.types";
import BtnLoader from "../../../components/layout/BtnLoader";
import { ContextAddress } from "../../../components/context/ContextAddress";

const Index: NextPage = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const [textError, setTextError] = useState('');
    const [displayFormError, setDisplayFormError] = useState(false);
    const [isReq, setIsReq] = useState<Boolean>(false)
    const router = useRouter()
    const CtxAddress = useContext(ContextAddress);


    const handelFormError = (textError: string) => {
        setDisplayFormError(true)
        setTextError(textError)
        toast(textError, { type: "error" })
        return
    }

    const setAddressFromServer = async () => {
        try {
            const res: AddressModel[] = await AddressListApi()
            if (res.length > 0) {
                localStorage.setItem('selectedAddress', JSON.stringify(res[0]));
                CtxAddress.setSelectedAddress(res[0])
            }
        }
        catch (err: any) {
        }
    }


    const Login = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (isReq) return
        setIsReq(true);
        try {
            const res = await LoginAPi(e)
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.user.id);
            localStorage.setItem('email', res.user.email);
            toast("success", { type: "success" })
            await setAddressFromServer()
            router.push("/seller/register")
            setIsReq(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)
        }
    }

    return (
        <div className="flex flex-col bg-seller bg-no-repeat bg-cover bg-fixed">

            <div className=" w-full min-h-screen  flex justify-center items-center ">
                <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center pl-[20px] md:pl-[40px] md:pr-0 pr-[20px]">
                    <div className=" w-full md:w-6/12  h-fit flex flex-col order-2 md:order-1 ">
                        <form onSubmit={Login} className="w-full flex flex-col mt-[20px]">
                            <div className="w-full flex flex-col mt-1">
                                <span className="  text-gray-700">Email</span>
                                <input type="email" placeholder="Enter a valid email address" name='name' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                            </div>

                            <div className="w-full flex flex-col mt-1">
                                <span className="  text-gray-700">Password</span>
                                <div className=" flex items-center relative mb-5">
                                    <input type={showPassword ? 'text' : 'password'} placeholder="Password" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none " required />
                                    <div onClick={() => { setShowPassword(!showPassword) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                        <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                    </div>
                                </div>
                            </div>
                            {isReq ?
                                <button className=" w-[130px] h-[45px] bg-gr-300 my-6 rounded-[30px] flex justify-center items-center text-white"><BtnLoader /></button>
                                :
                                <button className=" w-[130px] h-[45px] bg-gr-300 my-6 rounded-[30px] flex justify-center items-center text-white">Login</button>
                            }
                            <div className="flex flex-col md:mb-[100px] mb-[110px]">
                                <Link href={'/auth/login?forget=true'}>
                                    <span className="text-sm ml-[6px] mb-[9px] text-gr-300 cursor-pointer"> forgot password</span>
                                </Link>
                                <Link href="/auth/register"><span className="text-sm ml-[6px] text-gr-300  cursor-pointer">Create my account</span></Link>
                            </div>
                        </form>
                    </div>

                    <div className=" w-full md:w-6/12 flex flex-col justify-center items-center  order-1 md:order-2 md:my-0 my-[40px]">
                        <img src="/assets/media/reopen.png" alt="Reopen your business with Optics4less" className="max-w-[300px] w-full" />
                    </div>
                </div>
            </div >

            <div className=" w-full h-fit pb-[100px]  flex justify-center ">
                <div className="w-11/12 max-w-[1400px] flex flex-col">
                    <div className=" w-full flex-wrap h-[300px] bg-shadow bg-no-repeat  mt-[-90px] pt-[40px] md:pt-0 flex items-center" style={{ 'backgroundSize': "100% 100%" }}>
                        <div className=" md:w-[25%] w-[50%] h-[50%]  flex flex-col justify-center items-center">
                            <img src="/assets/svg/bag2.svg" className=" md:h-[70%] h-[60px]" />
                            <span className="text-gr-300 mt-2">Retail shops</span>
                        </div>
                        <div className=" md:w-[25%] w-[50%] h-[50%]  flex flex-col justify-center items-center">
                            <img src="/assets/svg/suppliers.svg" className=" md:h-[70%] h-[60px]" />
                            <span className="text-gr-300 mt-2">Suppliers </span>
                        </div>
                        <div className=" md:w-[25%] w-[50%] h-[50%]  flex flex-col justify-center md:items-center items-center">
                            <img src="/assets/svg/accounts.svg" className=" md:h-[70%] h-[60px]" />
                            <span className="text-gr-300 mt-2">Accounts </span>
                        </div>
                        <div className=" md:w-[25%] w-[50%] h-[50%]  flex flex-col justify-center md:items-center items-center">
                            <img src="/assets/svg/chat.svg" className=" md:h-[70%] h-[60px]" />
                            <span className="text-gr-300 mt-2">Chat</span>
                        </div>
                    </div>
                    <div className=" flex flex-col leading-6 md:leading-9 text-base md:text-2xl mt-[10px] md:mt-[40px] text-justify">
                        <span>
                            Both suppliers and retail shops can access their panel to view all the transactions history and the flow chart of the sales revenue during a day or a month or a year. Also, it is easier for them to compare sales. Every day that technology advances, online businesses advance as well. Optics4less has created a business that suppliers and retail shops do business with each other in their own panel without travelling distances.
                        </span>
                        <span className="mt-[10px]">
                            Optic4Less is an online platform that facilitates the sale of optical wear between the buyer and consumer. It is a user friendly platform which allows for seamless browsing, selection, purchase and delivery of various optical wear. Open your seller account and enjoy the benefits of online visibility which allows you to tap into a new consumer pool. It is a quick and simple process.
                        </span>
                        <span className="mt-[10px]">
                            Optics4Less allows the manufacturer to sell their collection of eyewear online to optical retailers. They can showcase their collections online and the retailers can seamlessly select and purchase these online hassle free. Open your manufacturer account the reap the rewards of your online seller account.
                        </span>
                        <span className="mt-[10px]">
                            The chat menu option will be available for customers to interact with the retail shops if they have any inquires about a specific model or delivery time or any other details they want to know about the shop or an eyewear in general
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Index;
import React, { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl, customApi } from "../../../apis";
import { toast } from "react-toastify";
import CheckUserAuth from '../../../components/checkUserAuth/CheckUserAuth'
import Link from "next/link";
import BtnLoader from "../../../components/layout/BtnLoader";
import { LoginAPi, ConfirmAPi, ForgetPasswordAPi , UpdatePassword } from "../../../apis/auth-api/auth-api";
import { AddressListApi } from "../../../apis/address-api/address-api";
import { useRouter } from 'next/router'
import { AddressModel } from "../../../types/models/address.types";
import { ContextAddress } from "../../../components/context/ContextAddress";

const Index: NextPage = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<Boolean>(false)
    const [isReq, setIsReq] = useState<Boolean>(false)
    const [showPassword, setShowPassword] = useState<Boolean>(false)
    const [isForgotPassStatus, setIsForgotPassStatus] = useState<number>(1)
    const [confirmEmail, setConfirmEmail] = useState<string>("")
    const [textError, setTextError] = useState('');
    const [displayFormError, setDisplayFormError] = useState(false);
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

    const changePassword=async(e:any)=>{
        e.preventDefault();
        if (isReq) return
        setIsReq(true);
        if(e.target[0].value != e.target[1].value){
            return toast(" password not match", { type: "error" })
        }
        try {
            const res = await UpdatePassword(e.target[0].value)
            toast("progress successfully done", { type: "success" })
            router.push('/')
            setIsReq(false)
        }
        catch (err: any) {
            setIsReq(false)
            handelFormError(err?.message)
        }
    }

    async function confirmCode(e: any) {
        e.preventDefault();
        if (isReq) return
        setIsReq(true);
        try {
            const res = await ConfirmAPi(confirmEmail, e.target[0].value)
            toast("successfully confirming Account, set a new password", { type: "success" })
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.user.id);
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('role', res.user.role);
            await setAddressFromServer()
            setIsForgotPassStatus(4)
            setIsReq(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)
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
            localStorage.setItem('role', res.user.role);
            if(res.user?.roles && res.user.roles.length > 0) {
                if(res.user.roles[0].permissions){
                    localStorage.setItem('roles', JSON.stringify(res.user.roles[0].permissions));
                }
            }
            toast("Logged in successfully", { type: "success" })
            await setAddressFromServer()
            if (router.query.fromCheckOut) router.push(`/checkout/${router.query.shopId}`)
            else router.push("/")
            setIsReq(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)
        }
    }

    const forgetPassword = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (isReq) return
        setIsReq(true);
        try {
            const res = await ForgetPasswordAPi(e.target[0].value)
            toast("Code sent tot your email, Check it and insert to confirm", { type: "success" })
            setConfirmEmail(e.target[0].value)
            setIsForgotPassStatus(3)
            setIsReq(false);
        }
        catch {
            setIsReq(false)
        }
    }

    useEffect(() => {
        if (router.query) {
            if (router.query.forget == 'true') {
                setIsForgotPassStatus(2)
            }
        }
    }, [router.query])

    useEffect(() => {
        CheckUserAuth() ? router.push('/user/profile') : setIsLogin(true)
    }, [])


    if (!isLogin) return <></>

    return (
        <div className=" w-full min-h-screen bg-bg-auth bg-no-repeat bg-cover flex justify-center ">
            <div className=" w-full lg:w-6/12 p-2 flex flex-col items-center justify-center relative">

                {isForgotPassStatus == 1 &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center mt-6 rounded-lg p-4  `}>
                        <span className=" text-xl">Login</span>
                        <form name="login" key={"login"} onSubmit={Login} className=" flex flex-col w-full sm:w-8/12 mt-6">
                            <input type="email" placeholder="Email" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none" required />
                            <div className=" flex items-center relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                                <div onClick={() => { setShowPassword(!showPassword) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                            <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                                <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                            </div>
                            {!isReq ?
                                <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9">Login</button>
                                :
                                <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9 flex justify-center items-center relative" disabled>
                                    <BtnLoader />
                                </button>
                            }
                        </form>
                        <a onClick={() => { setIsForgotPassStatus(2) }} className=" text-gr-300 pointer my-4 text-sm cursor-pointer">forget password</a>
                        <div className="flex items-center mt-2">
                            <Link href='/auth/register'>
                                <span className="cursor-pointer text-gr-300">Create new account</span>
                            </Link>
                        </div>
                    </div>
                }

                {isForgotPassStatus == 2 &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center mt-6 rounded-lg p-4  `}>
                        <span className=" text-xl">Recovery Password</span>
                        <span className=" mt-2 text-xs font-normal">Please insert your email to recive new password</span>
                        <form name="forget" key={"forget"} onSubmit={forgetPassword} className=" flex flex-col w-full sm:w-8/12 mt-6 items-center">
                            <input type="email" placeholder="Email" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none" required />
                            <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                                <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                            </div>
                            {!isReq ?
                                <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9">Send Request</button>
                                :
                                <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9 flex justify-center items-center relative" disabled>
                                    <BtnLoader />
                                </button>
                            }
                        </form>
                        <span onClick={() => { setIsForgotPassStatus(1) }} className=" mt-5 cursor-pointer text-gr-300 text-sm">Log in here</span>
                    </div>
                }

                {isForgotPassStatus == 3 &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center  rounded-lg p-4  `}>
                        <span className=" text-xl">{"Confirm account"}</span>
                        <span className=" mt-2 text-xs font-normal">Please insert the validate code we sent tou your email
                            <span className=" ml- bg-slate-100 py-1 px-2 text-xs rounded-lg">{confirmEmail}</span></span>
                        <form name="confirm" key={"confirm"} onSubmit={confirmCode} className=" flex flex-col w-full sm:w-8/12 mt-6 items-center">
                            <input type="text" placeholder="insert valid code" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                            {!isReq ?
                                <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9">Confirm</button>
                                :
                                <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9 flex justify-center items-center relative" disabled>
                                    <BtnLoader />
                                </button>
                            }
                        </form>
                    </div>
                }

                {isForgotPassStatus == 4 &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center mt-6 rounded-lg p-4  `}>
                        <span className=" text-xl">Change paaword</span>
                        <form name="login" key={"changepassword"} onSubmit={changePassword} className=" flex flex-col w-full sm:w-8/12 mt-6">
                            <div className=" flex items-center relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                                <div onClick={() => { setShowPassword(!showPassword) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                            <div className=" flex items-center relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                                <div onClick={() => { setShowPassword(!showPassword) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                            <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                                <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                            </div>
                            {!isReq ?
                                <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9">Update</button>
                                :
                                <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9 flex justify-center items-center relative" disabled>
                                    <BtnLoader />
                                </button>
                            }
                        </form>
                        <a onClick={() => { setIsForgotPassStatus(2) }} className=" text-gr-300 pointer my-4 text-sm cursor-pointer">forget password</a>
                    </div>
                }

            </div>
        </div>
    )
}

export default Index;
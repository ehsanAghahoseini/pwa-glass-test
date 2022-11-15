import React, { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl, customApi } from "../../../apis";
import { toast } from "react-toastify";
import CheckUserAuth from '../../../components/checkUserAuth/CheckUserAuth'
import Link from "next/link";
import BtnLoader from "../../../components/layout/BtnLoader";
import { ConfirmAPi, RegisterAPi, ResendCodeAPi } from "../../../apis/auth-api/auth-api";
import ModalAuthAddAddress from "../../../components/authComponent/ModalAuthAddAddress";
import { useRouter } from 'next/router'
import { AddressModel } from "../../../types/models/address.types";
import { AddressListApi } from "../../../apis/address-api/address-api";
import { ContextAddress } from "../../../components/context/ContextAddress";

const Index: NextPage = () => {
    const router = useRouter();
    const CtxAddress = useContext(ContextAddress);
    const [changeAuth, setChangeAuth] = useState<Number>(0)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [isReq, setIsReq] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [isConfirmStatus, setIsConfirmStatus] = useState<boolean>(false)
    const [isConfirmStatusForgetPass, setIsConfirmStatusForgetPass] = useState<boolean>(false)
    const [isForgotPassStatus, setIsForgotPassStatus] = useState<boolean>(false)
    const [confirmEmail, setConfirmEmail] = useState<string>("")
    const [selectLocation, setSelectLocation] = useState<any>({
        'state': null,
        'city': null,
        'postcodez': null,
        'address': null,
        'lat': null,
        'lng': null
    })
    const [visibleAddAddress, setVisibleAddAddress] = useState<boolean>(false)
    const [textError, setTextError] = useState('');
    const [displayFormError, setDisplayFormError] = useState(false);
    const [resendCode, setResendCode] = useState<number>(120)

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

    const handelFormError = (textError: string) => {
        setDisplayFormError(true)
        setTextError(textError)
        toast(textError, { type: "error" })
        return
    }

    const Register = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (isReq) return
        if (e.target[3].value.length < 8) { return handelFormError("The password must be at least 8 characters.") }
        if (e.target[2].value.length < 10) { return handelFormError("The phone must be at least 10 characters.") }
        if (selectLocation.address == null || selectLocation.lat == null) { return handelFormError("please add address") }
        setIsReq(true);
        try {
            const res = await RegisterAPi(e, selectLocation)
            setIsConfirmStatus(true)
            setIsReq(false);
            toast("the confirm code sent to your email successfully", { type: "success" })
            setConfirmEmail(e.target[0].value)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)

        }
    }

    const resendCodeFunc = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (isReq) return
        setIsReq(true);
        try {
            const res = await ResendCodeAPi(confirmEmail)
            setResendCode(120)
            toast("Code Resent", { type: "success" })
            setIsReq(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)
        }
    }

    const confirmCode = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (isReq) return
        setIsReq(true);
        try {
            const res = await ConfirmAPi(confirmEmail, e.target[0].value)
            toast("successfully confirming Account, you are Loged in", { type: "success" })
            localStorage.setItem('token', res.token);
            localStorage.setItem('id', res.user.id);
            localStorage.setItem('email', res.user.email);
            localStorage.setItem('role', res.user.role);
            await setAddressFromServer()
            router.push("/")
            setIsReq(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setIsReq(false)
        }
    }

    useEffect(() => {
        if (isConfirmStatus) {
            const CounterDown: any = resendCode > 0 && setInterval(() => {
                setResendCode(resendCode - 1);
            }, 1000);
            return () => clearInterval(CounterDown);
        }
    }, [resendCode, isConfirmStatus])

    useEffect(() => {
        CheckUserAuth() ? router.push('/user/profile') : setIsLogin(true)
    }, [])

    if (!isLogin) return <></>

    return (
        <div className=" w-full min-h-screen bg-bg-auth bg-no-repeat bg-cover flex justify-center items-center">
            <div className=" w-full lg:w-6/12   p-2 flex flex-col items-center justify-center relative">

                {isConfirmStatus == false &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center mt-6 rounded-lg p-4 ${isConfirmStatus ? " h-0 opacity-0 invisible " : " opacity-100"} `}>
                        <span className=" text-xl">Register</span>
                        <form name="Register" key={"Register"} onSubmit={Register} className=" flex flex-col w-full sm:w-8/12 mt-6">
                            <input type="email" placeholder="Email" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none" required />
                            <input type="text" placeholder="Name" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                            <input type="text" placeholder="Phone" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                            <div className=" flex items-center relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                                <div onClick={() => { setShowPassword(!showPassword) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                            {selectLocation.address != null &&
                                <div className=" flex items-center relative">
                                    <div className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6 flex items-center" >{selectLocation.address}</div>
                                    <div onClick={() => { setVisibleAddAddress(true) }} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                        <img src="/assets/svg/edit.png" alt="eye" className=" w-[15px]" />
                                    </div>
                                </div>
                            }
                            {selectLocation.address == null &&
                                <div onClick={() => { setVisibleAddAddress(true) }} className=" flex items-center text-gr-300  mt-[40px] cursor-pointer">
                                    <span className=" text-xl mr-[10px]">+</span>
                                    <span className=" text-sm">Add Address</span>
                                </div>
                            }
                            <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                                <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                            </div>
                            {!isReq ?
                                <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9">Register</button>
                                :
                                <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none m-auto mt-9 flex justify-center items-center relative" disabled>
                                    <BtnLoader />
                                </button>
                            }
                        </form>
                    </div>
                }

                {isConfirmStatus &&
                    <div className={` transition-all duration-700  w-full flex flex-col items-center  rounded-lg p-4  `}>
                        <span className=" text-xl">{"Confirm account"}</span>
                        <span className=" mt-2 text-xs font-normal">Please insert the validate code we sent tou your email
                            <span className=" ml- bg-slate-100 py-1 px-2 text-xs rounded-lg">{confirmEmail}</span></span>
                        <form name="confirm" key={"confirm"} onSubmit={confirmCode} className=" flex flex-col w-full sm:w-8/12 mt-6 items-center">
                            <input type="text" placeholder="insert valid code" className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none mt-6" required />
                            <div className=" w-full flex p-3">
                                <small className=""> {resendCode == 0 ?
                                    <div onClick={resendCodeFunc} className=" text-sky-700 text-sm cursor-pointer">Resend Code</div>
                                    :
                                    <span className=" text-gray-500 text-sm">{resendCode}s to new Code Request</span>
                                }</small>
                            </div>
                            <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                                <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                            </div>
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

                <Link href='/auth/login'>
                    <div className=" flex items-center mt-4">
                        <span className=" text-sm">Already have an account?</span>
                        <span className=" ml-[10px] cursor-pointer text-gr-300 text-sm">Log in here</span>
                    </div>
                </Link>
            </div>
            <ModalAuthAddAddress
                visible={visibleAddAddress}
                setVisible={setVisibleAddAddress}
                setSelectLocation={setSelectLocation}
                selectLocation={selectLocation}
            />
        </div >
    )
}

export default Index;
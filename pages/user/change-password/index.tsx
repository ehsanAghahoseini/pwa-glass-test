import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { baseUrl } from "../../../apis";
import Link from "next/link";
import { customApi } from "../../../apis";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import Router from 'next/router'
import { toast } from "react-toastify";
import { ProfileTypesInput } from '../../../types/profile.types';
import ProfileSide from '../../../components/user/ProfileSide';
import BtnLoader from "../../../components/layout/BtnLoader";
import { ChangePasswordAPi } from "../../../apis/profile-api/profile-api";

const Index: NextPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [display, setDisplay] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState({
        'first': false,
        'secound': false,
    })
    const [textError, setTextError] = useState('');
    const [displayFormError, setDisplayFormError] = useState(false);

    const handelFormError = (textError: string) => {
        setDisplayFormError(true)
        setTextError(textError)
        toast(textError, { type: "error" })
        return
    }

    const displayPassword = (type: string) => {
        let data: any = { ...showPassword };
        data[type] = !data[type]
        setShowPassword(data)
    }


    const updataProfile = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (e.target[1].value != e.target[2].value) {return handelFormError("password not match")}
        setDisplay(true)
        try {
            const res = await ChangePasswordAPi(e)
            toast("update success", { type: "success" })
            setDisplay(false)
        }
        catch (err: any) {
            handelFormError(err?.message)
            setDisplay(false)
        }
    }

    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
        }
        else {
            Router.push('/auth/login')
        }
    }, [])
    


    if (!isLogin) {
        return (<></>)
    }


    return (
        <div className=" w-full lg:w-10/12  m-auto mt-8 p-2 lg:p-0 flex flex-col relative">
            <ProfileSide active='password' />
            <div className=" w-full h-fit mb-2 p-4 flex flex-col overflow-hidden max-w-screen-lg mx-auto">
                <form onSubmit={updataProfile} className=" flex flex-wrap">
                    <div className="  w-full sm:w-6/12 flex flex-col p-1">
                        <div className="w-full flex flex-col mt-1">
                            <span className=" text-xs text-gray-500">Old Password</span>
                            <input type="password" className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                        </div>
                        <div className="w-full flex flex-col my-1">
                            <span className=" text-xs text-gray-500">New Password</span>
                            <div className=" flex items-center relative mb-3">
                                <input type={showPassword.first ? 'text' : 'password'} className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none " required />
                                <div onClick={() => displayPassword('first')} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col my-1">
                            <span className=" text-xs text-gray-500">Confirm Password</span>
                            <div className=" flex items-center relative mb-3">
                                <input type={showPassword.secound ? 'text' : 'password'} className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none " required />
                                <div onClick={() => displayPassword('secound')} className=" w-[30px] h-[30px] absolute right-0 bottom-0 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/eye.png" alt="eye" className=" w-[20px]" />
                                </div>
                            </div>
                        </div>
                        <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                            <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                        </div>
                    </div>
                    <div className="  w-full sm:w-6/12 flex flex-col p-1">

                    </div>
                    <div className="  w-full sm:w-6/12 flex flex-col p-1 justify-center">
                        {!display ?
                            <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3">Update</button>
                            :
                            <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3 flex justify-center items-center relative" disabled>
                                <BtnLoader />
                            </button>
                        }
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Index;
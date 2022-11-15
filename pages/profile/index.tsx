import React, { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { baseUrl, customApi } from "../../apis";
import { toast } from "react-toastify";
import CheckUserAuth from '../../components/checkUserAuth/CheckUserAuth'
import Router from 'next/router'
import { ProfileTypesInput} from '../../types/profile.types';

const Index: NextPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [userData, setUserData] = useState<any>({})


    const updataProfile=async(e : any)=>{
        e.preventDefault();
        const res = await customApi({ url: `${baseUrl}/app/edit_profile` }, { method: 'POST', body: JSON.stringify(userData)})
        if(res.status){
            toast("update success", { type: "success" })
            getData()
          }
    }
    
    const handelChangeInput=(data : ProfileTypesInput)=>{
        let newData = {...userData}
        newData[data.name] = data.value ;
        setUserData(newData)
    }


    const getData = async () => {
        const res = await customApi({ url: `${baseUrl}/app/profile` }, { method: 'POST', body: JSON.stringify({ "id": localStorage.getItem('id') }) })
        if (res.status) {
            let userInfo = {
                'name':res.data.name ,
                'email':res.data.email ,
                'bio':res.data.bio ,
                'address':res.data.address ,
                'phone':res.data.phone ,
                'password':res.data.password ,
                'id':res.data.id ,
            }
            setUserData(userInfo)
        }
        else {
            toast("error", { type: "error" })
        }
    }


    useEffect(() => {
        if (CheckUserAuth()) {
            getData()
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
        <div className=" w-full lg:w-6/12 m-auto mt-8 mb-20 p-2 flex flex-col items-center justify-center relative ">
            <h1 className=" text-3xl">Edit Profile</h1>
            <span className=" mt-2 text-xs font-normal">Edit your profile here</span>
            <form onSubmit={updataProfile} className=" flex flex-col w-full sm:w-8/12 mt-6" >
                <input type="email" placeholder="Email" value={userData?.email} onChange={(e)=>handelChangeInput({name :"email" , value : e.target.value})} className=" w-full h-9 border border-gray-300 pl-1 text-sm focus:outline-none" required />
                <input type="text" placeholder="Name" value={userData?.name} onChange={(e)=>handelChangeInput({name :"name" , value : e.target.value})}  className=" w-full h-9 border border-gray-300 pl-1 text-sm focus:outline-none mt-3" required />
                <input type="password" placeholder="Password" value={userData?.password} onChange={(e)=>handelChangeInput({name :"password" , value : e.target.value})}  className=" w-full h-9 border border-gray-300 pl-1 text-sm focus:outline-none mt-3" required />
                <input type="number" placeholder="Phone" value={userData?.phone} onChange={(e)=>handelChangeInput({name :"phone" , value : e.target.value})}  className=" w-full h-9 border border-gray-300 pl-1 text-sm focus:outline-none mt-3" required />
                <textarea placeholder="address" value={userData?.address} onChange={(e)=>handelChangeInput({name :"address" , value : e.target.value})}  className=" w-full min-h-[100px] border border-gray-300 pl-1 text-sm focus:outline-none mt-3" required />
                <button className=" w-full h-9 text-white bg-ehbi-300 focus:outline-none mt-3">Edit</button>
            </form>
            <span className=" mt-5 cursor-pointer text-blue-600 text-sm">Panel for seller and whoSeller</span>
        </div>
    )
}

export default Index;
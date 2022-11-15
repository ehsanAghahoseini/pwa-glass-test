import React from "react"
import Link from "next/link";

export const ServerError = () => {
    return (
        <div className=" w-full min-h-screen flex justify-center items-center flex-col">
            <img className='max-w-[200px]' src='/assets/svg/glasses-broken.svg' />
            <span className=" text-xl my-3">Please wait</span>
            <span onClick={()=>{location.reload()}} className='text-gr-300 text-xl cursor-pointer'>Try again later</span>
        </div>
    )
}

export default ServerError;

import React from "react"
import Link from "next/link";

export const NotFound = () => {
    return (
        <div className=" w-full min-h-screen flex justify-center items-center flex-col">
            <img className='max-w-[200px]' src='/assets/svg/glasses-broken.svg' />
            <img className='max-w-[200px] my-[20px]' src='/assets/svg/404.svg' />
            <Link href={'/'}>
                <span className='text-gr-300 text-xl cursor-pointer'>Back to home</span>
            </Link>
        </div>
    )
}

export default NotFound;

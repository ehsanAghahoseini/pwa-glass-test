import Link from "next/link";
import { useEffect, useState } from "react";
import { PayMethodApi } from "../../apis/payment-api/payment-api";
import CSkeleton from "../CSkeleton/CSkeleton";


const Footer = () => {
  const [listMethodPay, setListMethodPay] = useState<any>([])

  const getPaymentMethod = async () => {
    try {
      const res = await PayMethodApi()
      setListMethodPay(res)
    }
    catch {

    }
  }
  useEffect(() => {
    // getPaymentMethod()
  }, [])
  return (
    <div className=" w-full bg-sky-50  flex flex-col ">

      <div className=" w-full flex justify-center bg-[#E7F5ED]">

        {/* Footer for desktop */}
        <div className=" w-full lg:w-10/12 hidden md:flex flex-wrap py-4 lg:px-0 px-2">

          <div className=" w-full lg:w-3/12 md:w-6/12 flex flex-col mb-2">
            <Link href={"/user/profile/"}>
              <a className=" text-sm mb-3 mt-4 cursor-pointer">Your Account</a>
            </Link>
            <Link href={"/user/address/"}>
              <a className=" text-sm mb-3 cursor-pointer">Your Address</a>
            </Link>
            <Link href={"/user/order/"}>
              <a className=" text-sm mb-3 cursor-pointer">Your Orders</a>
            </Link>
          </div>

          <div className=" w-full lg:w-3/12 md:w-6/12 flex flex-col mb-2">
            <Link href={"/contact-us"}>
              <a className=" text-sm mb-3 mt-4 cursor-pointer">Contact Us</a>
            </Link>
            <Link href={"/term-conditions"}>
              <a className=" text-sm mb-3 cursor-pointer">Term & Conditions</a>
            </Link>
            <Link href={"/privacy-policy"}>
              <a className=" text-sm mb-3 cursor-pointer">Privacy Policy</a>
            </Link>
          </div>

          <div className=" w-full lg:w-3/12 md:w-6/12 flex flex-col mb-2">
            <Link href={"/"}>
              <a className=" text-sm mb-3 mt-4 cursor-pointer">Home</a>
            </Link>
            <Link href={"/about"}>
              <a className=" text-sm mb-3 cursor-pointer">About Us</a>
            </Link>
          </div>

          <div className=" w-full lg:w-3/12 md:w-6/12 flex flex-col mb-2">
            <span className=" text-sm mb-3 mt-4">We Accept</span>
            <div className=" flex flex-wrap">
              {['paypal.png' , 'l_master.png' , 'l_visa.png' , 'cash.png'].map((item: any, index: number) =>
                <img key={index} src={`/assets/logo/${item}`} alt={item} className=" h-[25px] mx-1" />
              ) }
            </div>
          </div>

        </div>

        {/* Footer for mpbile */}
        <div className=" w-full  md:hidden flex flex-wrap py-4 px-0 text-xs">
          <div className=" w-[25%]  flex justify-center text-center ">
            <Link href='/term-conditions'>
              <span className=" text-sm cursor-pointer ">Term & Conditions</span>
            </Link>
          </div>
          <div className=" w-[25%]  flex justify-center text-center">
            <Link href='/privacy-policy'>
              <span className=" text-sm cursor-pointer ">Privacy Policy</span>
            </Link>
          </div>
          <div className=" w-[25%]  flex justify-center text-center">
            <Link href='/contact-us'>
              <span className=" text-sm cursor-pointer ">Contact Us</span>
            </Link>
          </div>
          <div className=" w-[25%]  flex justify-center text-center ">
            <Link href='/about'>
              <span className=" text-sm cursor-pointer ">About Us</span>
            </Link>
          </div>
          <div className=" w-full  flex justify-center mt-4">
            <img src="/assets/logo/Mastercard.png" alt="logo" className=" h-[25px] mx-[5px]" />
            <img src="/assets/logo/visaa-logo.png" alt="logo" className=" h-[25px] mx-[5px]" />
          </div>
        </div>

      </div>

      <div className=" w-full bg-gr-400 flex flex-col items-center justify-center border-t border-gray-300 min-h-[50px] py-[15px]">
        <div className=" w-full  text-center flex justify-center items-center text-sm ">
          Copyright © 2021-2022 <span className="text-green-600 mx-[2px]"> OPTICS4LESS </span>. All rights reserved.
        </div>
        <a href="https://almubdieuntech.com/" target={"_blank"} rel="noreferrer" referrerPolicy={"no-referrer"} className=" text-sm text-gray-800 mt-[12px] flex items-center w-full justify-center"> Design & Developed By  <img className=" max-w-[16px] ml-2" alt="almubdieuntech" src="/assets/almubdi.png" /> </a>
      </div>

    </div>
  )
}



export default Footer;

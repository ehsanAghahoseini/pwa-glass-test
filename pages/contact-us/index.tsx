import { NextPage } from 'next';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import BtnLoader from '../../components/layout/BtnLoader';
import { toast } from "react-toastify";
import { ContactUsApi } from '../../apis/contactUs-api/payment-api';


const Index: NextPage = () => {
    const [display, setDisplay] = useState<boolean>(false)
    const [displayMessage, setDisplayMessage] = useState<boolean>(false)
    const formRef: any = useRef()

    const submitContcat = async (e: any) => {
        e.preventDefault();
        setDisplayMessage(false)
        setDisplay(true)
        try {
            const res = await ContactUsApi(formRef)
            setDisplay(false)
            setDisplayMessage(true)
            toast("successfully sent message", { type: "success" })
        }
        catch (err: any) {
            toast(err?.message, { type: "error" })
            setDisplay(false)
        }
    }


    return (
        <div className=' flex w-full pt-10 pb-14 min-h-[calc(100vh-300px)] max-w-screen-lg mx-auto'>

            <div className=" w-full h-fit mb-2 p-4 flex flex-col overflow-hidden max-w-screen-lg mx-auto">
                <div className=" flex flex-wrap">

                    <div className="  w-full sm:w-6/12 flex flex-col p-1 items-center md:items-start py-10 md:py-0">
                        <h1 className=' text-gr-300 text-[45px] mb-6'>
                            Contact Us
                        </h1>
                        <p className=' max-w-[250px] text-justify'>
                            If you would like to make any inquiries kindly fill out the details and we will get back to to you within 3 working days.
                        </p>
                        <div className=' flex items-center mt-10'>
                            <img src='/assets/social/insta.png' className=' w-full max-w-[20px] mr-3' />
                            <img src='/assets/social/whatsup.png' className=' w-full max-w-[20px] mr-3' />
                            {/* <img src='/assets/social/youtube.png' className=' w-full max-w-[20px] mr-3' /> */}

                        </div>

                    </div>
                    <div className="  w-full sm:w-6/12 flex flex-col p-1">
                        <form ref={formRef} onSubmit={submitContcat} className=" flex flex-wrap">

                            <div className="w-full flex flex-col mt-1">
                                <span className=" text-xs text-gray-500">Name</span>
                                <input placeholder='insert name' name={'name'} type="text" className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                            </div>
                            <div className="w-full flex flex-col mt-1">
                                <span className=" text-xs text-gray-500">Email</span>
                                <input placeholder='example@ex.com' name={'email'} type="email" className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                            </div>
                            <div className="w-full flex flex-col mt-1">
                                <span className=" text-xs text-gray-500">Message</span>
                                <textarea placeholder='insert Message' name={'message'} className=" w-full mt-2 bg-gray-100 rounded-lg p-2 h-24 border-b-2 border-gr-300 mb-5 text-sm focus:outline-none" required />
                            </div>
                            <div className={` w-full py-3 flex items-center text-gr-300 border border-gr-300 rounded transition-all ${displayMessage ? 'py-3 opacity-100 visible' : 'p-0 opacity-0 invisible'}`}>
                                <li className='ml-6'>successfully sent message</li>
                            </div>
                            <div className="  w-full sm:w-6/12 flex flex-col p-1 justify-center items-center md:items-start ">
                                {!display ?
                                    <button type="submit" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3">Send</button>
                                    :
                                    <button type="button" className=" w-[130px] h-9 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3 flex justify-center items-center relative" disabled>
                                        <BtnLoader />
                                    </button>
                                }
                            </div>
                        </form>
                    </div>

                </div>
            </div >


        </div>
    );
};

export default Index;

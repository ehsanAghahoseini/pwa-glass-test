import React, { FormEventHandler, useEffect, useState } from "react";
import type { NextPage } from "next";
import { baseUrl, customApi } from "../../apis";
import { toast } from "react-toastify";
import Router from 'next/router'
import BtnLoader from "../../components/layout/BtnLoader";

const Index: NextPage = () => {
    const [fileList, setFileList] = useState<any>([])
    const [display, setDisplay] = useState<boolean>(false)

    let svgData = [
        '/assets/svg/business1.svg#business_1',
        '/assets/svg/business2.svg#business_2',
        '/assets/svg/business3.svg#business_3',
        '/assets/svg/business4.svg#business_4',
        '/assets/svg/business5.svg#business_5',
        '/assets/svg/business6.svg#business_6',

    ]

    const addFileToList = (file: any) => {
        let list = [...fileList];
        list.push(file);
        setFileList(list)
    }

    const deleteFile = (index: number) => {
        let list = [...fileList];
        list.splice(index, 1);
        setFileList(list)
    }


    const registerSeller = async (e: any) => {
        e.preventDefault();
        if(e.target[2].value.length <8){
            toast("password less 8 character", { type: "error" })
            return
        }
        setDisplay(true);
        let formData = new FormData()
        formData.append("name", e.target[0].value);
        formData.append("email", e.target[1].value);
        formData.append("password", e.target[2].value);
        formData.append("role", e.target[3].value);
        for (let i in fileList) {
            formData.append(`files[${i}]`, fileList[i]);
        }
        const res = await customApi({ url: `${baseUrl}/auth/register` }, { method: 'POST', body: formData, token: true, formData: true })
        setDisplay(false)
        if (res.status == true) {
            toast("register success", { type: "success" })
        }
        else if (res.status == false){
            toast(res.message, { type: "error" })
        }

    }



    return (
        <div className="w-full m-auto  flex flex-col relative">


            <div className=" w-full min-h-fit sm:min-h-screen bg-cover bg-no-repeat bg-bn1 p-2 sm:p-0  relative flex flex-col justify-start sm:justify-center items-center md:items-start">
                <div className=" w-full sm:w-96 h-full ml-0 md:ml-36 flex flex-col justify-center">
                    <h1 className=" text-3xl sm:text-5xl flex flex-col text-white">
                        <span className=" mb-2">Reopen your</span>
                        <span className=" mb-2">business with</span>
                        <span className=" mb-2">Optics4less</span>
                    </h1>
                    <div className=" w-full min-h-[430px] bg-white flex flex-col p-5 rounded-md">
                        <h2 className=" text-xl">Free Consultation</h2>
                        <span className=" text-sm text-gray-500">Get Free Consultation For IT Solutions</span>
                        <form onSubmit={registerSeller} className=" w-full flex flex-col">

                            <div className=" w-full flex mt-6 text-sm">
                                <div className=" w-6/12 px-1">
                                    <input type="text" placeholder="Name" className=" w-full h-9 rounded-md border focus:outline-none px-1 " />
                                </div>
                                <div className=" w-6/12 px-1">
                                    <input type="email" placeholder="Email" className=" w-full h-9 rounded-md border focus:outline-none px-1 " />
                                </div>
                            </div>

                            <div className=" w-full flex mt-3 text-sm">
                                <div className=" w-6/12 px-1">
                                    <input type="password" placeholder="Password" className=" w-full h-9 rounded-md border focus:outline-none px-1 " />
                                </div>
                                <div className=" w-6/12 px-1">
                                    <select placeholder="Email" className=" w-full h-9 rounded-md border focus:outline-none px-1 bg-white " >
                                        <option value="seller">Seller</option>
                                        <option value="whoseller">WhoSeller</option>
                                    </select>
                                </div>
                            </div>

                            <div className=" w-full flex flex-col mt-3">

                                <label>
                                    <input type="file" className=" hidden" onChange={(e:any) => addFileToList(e.target.files[0])} />
                                    <div className=" w-full h-16 flex justify-center items-center border-dashed cursor-pointer mt-3 border border-ehbi-400 text-ehbi-400 rounded-md">+ Select File</div>
                                </label>


                                <div className=" w-full flex flex-wrap mt-3">
                                    {fileList.length > 0 && fileList.map((item: any, index: number) =>
                                        <div key={index} className="flex ml-1 mb-2">
                                            <div onClick={() => { deleteFile(index) }} className=" h-8 w-8 bg-ehbi-400 rounded-l-full flex justify-center items-center cursor-pointer">
                                                <img src="/assets/svg/trash.png" className="w-4 h-4"/>
                                            </div>
                                            <div className=" h-8 min-w-[40px] max-w-[100px] bg-ehbi-400 rounded-r-full flex items-center pr-2 overflow-hidden text-white text-xs">
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {display != true ?
                                <button className=" w-full h-9 mt-4 text-white bg-ehbi-400 rounded">Submit</button>
                                :
                                <button type="button" className=" w-full h-9 mt-4 text-white bg-ehbi-400 rounded flex justify-center items-center" disabled><BtnLoader /></button>
                            }
                        </form>
                    </div>
                </div>
            </div>

            <div className=" w-full   flex justify-center mt-20">
                <div className=" w-full lg:w-10/12 min-w-full lg:min-w-[1024px]  flex flex-wrap justify-center items-center ">
                    {svgData.map((item: any, index: any) =>
                        <div key={index} className=" w-32 h-auto sm:w-40 sm:h-40 bg-white rounded-md shadow py-5 sm:py-0 mx-2 mb-2 flex flex-col items-center justify-center">
                            <svg x="0px" y="0px" viewBox="0 0 295.239 295.239" className="fill-ehbi-400 h-16 w-16 mb-7 ">
                                <use xlinkHref={item} />
                            </svg>
                            <h4 className=" font-bold text-center ">Free Consultation</h4>
                        </div>
                    )}
                </div>
            </div>

            <div className=" w-full   flex justify-center mt-11 sm:mt-32">
                <div className=" w-10/12 min-w-full lg:min-w-[1024px]   flex flex-col lg:flex-row p-4 items-center  ">
                    <div className=" w-full lg:w-6/12 flex justify-center items-center ">
                        <img src='/assets/media/mobile.png' alt="panel" className=" w-8/12" />
                    </div>
                    <div className="  w-full lg:w-6/12  flex flex-col">
                        <h2 className=" text-3xl sm:text-4xl leading-[50px] mb-11">Optics4less Crafting Beautiful Experience</h2>
                        <span className=" text-gray-400 text-lg font-light">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                        <span className=" text-gray-400 text-lg font-light mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                        <span className=" text-gray-400 text-lg font-light mt-5">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                        <button className=" w-36 h-10 mt-7 text-ehbi-400 border border-ehbi-400 rounded-md ">Seller panel</button>
                    </div>
                </div>
            </div>


            <div className=" w-full  flex justify-center mt-11 sm:mt-32">
                <div className=" w-10/12 min-w-full lg:min-w-[1024px]   flex flex-col lg:flex-row  items-center  p-4 py-7 rounded-lg  ">
                    <div className=" w-full lg:w-6/12 flex flex-col rounded-md order-2 ">
                        <h2 className=" text-3xl sm:text-4xl leading-[50px] mb-11">Reopen yourbusiness withOptics4less</h2>
                        <form onSubmit={registerSeller} className=" w-full flex flex-col ">
                            <div className=" w-full flex flex-wrap ">
                                <div className=" w-full sm:w-6/12 mb-4 sm:mb-0 flex flex-col px-2">
                                    <span>Your name</span>
                                    <input type="text" placeholder=" Name" className=" w-full h-12 rounded-md border border-ehbi-400 mt-[10px] px-2 focus:outline-none" />
                                </div>
                                <div className=" w-full sm:w-6/12 mb-4 sm:mb-0 flex flex-col px-1">
                                    <span>Your email address</span>
                                    <input type="email" placeholder=" Email" className=" w-full h-12 rounded-md border border-ehbi-400 mt-[10px] px-2 focus:outline-none" />
                                </div>
                            </div>
                            <div className=" w-full flex sm:mt-8 flex-wrap ">
                                <div className=" w-full sm:w-6/12 mb-4 sm:mb-0 flex flex-col px-1">
                                    <span>Your password</span>
                                    <input type="password" placeholder=" Name" className=" w-full h-12 rounded-md border border-ehbi-400 mt-[10px] px-2 focus:outline-none" />
                                </div>
                                <div className=" w-full sm:w-6/12 mb-4 sm:mb-0 flex flex-col px-1">
                                    <span>Your type</span>
                                    <select className=" w-full h-12 rounded-md bg-white border border-ehbi-400 mt-[10px] px-2 focus:outline-none" >
                                        <option value="seller">Seller</option>
                                        <option value="whoseller">WhoSeller</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" w-full flex flex-col mt-0 sm:mt-4">
                                <label>
                                    <input type="file" className=" hidden" onChange={(e:any) => addFileToList(e.target.files[0])} />
                                    <div className=" w-full h-16 flex justify-center items-center border-dashed cursor-pointer mt-3 border border-ehbi-400 text-ehbi-400 rounded-md">+ Select File</div>
                                </label>
                                <div className=" w-full flex flex-wrap mt-3">
                                    {fileList.length > 0 && fileList.map((item: any, index: number) =>
                                        <div key={index} className="flex ml-1 mb-2">
                                            <div onClick={() => { deleteFile(index) }} className=" h-8 w-8 bg-ehbi-400 rounded-l-full flex justify-center items-center cursor-pointer">
                                                <img src="/assets/svg/trash.png" className="w-4 h-4"/>
                                            </div>
                                            <div className=" h-8 min-w-[40px] max-w-[100px] bg-ehbi-400 rounded-r-full flex items-center pr-2 overflow-hidden text-white text-xs">
                                                <span>{item.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {display != true ?
                                <button className=" w-36 h-12 border mt-10 rounded-md bg-ehbi-400 text-white">submit</button>
                                :
                                <button type="button" className=" w-36 h-12 border mt-10 rounded-md bg-ehbi-400 text-white flex justify-center items-center" disabled><BtnLoader/></button>
                            }
                        </form>
                    </div>
                    <div className=" w-full lg:w-6/12 mb-4 flex justify-center items-center order-1 lg:order-3 ">
                        <img src='/assets/media/mac.png' alt="panel" className=" w-8/12" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index;
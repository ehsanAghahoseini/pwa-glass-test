import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { SellerRegisterApi } from "../../../apis/auth-api/auth-api";
import { baseUrl } from "../../../apis";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import BtnLoader from "../../../components/layout/BtnLoader";
import CModal from "../../../components/CModal/CModal";
import ModalPrivacyContentShop from "../../../components/sellerComponent/ModalPrivacyContentShop";
import ModalPrivacyContentBrand from "../../../components/sellerComponent/ModalPrivacyContentBrand";

const Index: NextPage = () => {
    const router = useRouter()
    const formRef: any = useRef()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [display, setDisplay] = useState<boolean>(false)
    const [visibleHelp, setVisibleHelp] = useState<boolean>(false)
    const [isSupTermsModal, setIsSupTermsModal] = useState<boolean>(false)
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('')
    const [listFiles, setLisFiles] = useState([])
    const [progressValue, setProgressVlaue] = useState(0)
    const [businessType, setBusinessType] = useState('shop')
    const [visibleMessage, setVisibleMessage] = useState<boolean>(false)
    const [isAgreeSup, setIsAgreeSup] = useState<boolean>(false)
    const [messageModal, setMessageModal] = useState<string>('')

    const handelManyRequest = () => {
        return toast("Please wait until the previous upload is completed", { type: "info" })
    }

    const deleteFile = (index: number) => {
        let data = [...listFiles];
        for (let i in data) {
            if (+i == index) {
                data.splice(index, 1)
            }
        }
        setLisFiles(data)
    }

    const onFinish = async (e: any) => {
        e.preventDefault();
        if (listFiles.length == 0) return toast("The auth files field is required", { type: "error" })
        setDisplayBtn(true)
        try {
            const res = await SellerRegisterApi(formRef, listFiles, businessType)
            setDisplayBtn(false)
            setMessageModal(res)
            setVisibleMessage(true)
            formRef.current.reset();
            setLisFiles([])
            setFileName('')
        }
        catch (err: any) {
            toast(err?.message, { type: "error" })
            setDisplayBtn(false)
        }

    }


    const uploadFile = (e: any) => {
        if (display == true) {
            return toast("Please wait until the previous upload is completed", { type: "info" })
        }
        setDisplay(true)
        setFileName(e.target.files[0].name)
        let fd = new FormData();
        fd.append('auth_file', e.target.files[0]);
        let request = new XMLHttpRequest();
        request.open('POST', `${baseUrl}/auth/upload/auth`);
        request.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);

        request.upload.addEventListener('progress', function (e) {
            setProgressVlaue(+((e.loaded / e.total) * 100).toFixed(0))
        });

        request.addEventListener('load', () => {
            if (request.status == 200) {
                let res = JSON.parse(request.response)
                if (res.status == true) {
                    let data: any = [...listFiles];
                    data.push({
                        'name': e.target.files[0].name,
                        'path': res.data.path
                    })
                    setLisFiles(data)
                    setDisplay(false)
                    setProgressVlaue(0)
                }
                else {
                    setDisplay(false)
                    setProgressVlaue(0)
                    toast(res.error.error, { type: "error" })
                }
            }
            else {
                setDisplay(false)
                setProgressVlaue(0)
                toast("err", { type: "error" })
            }

        });

        request.addEventListener('error', (err) => {
            setDisplay(false)
            setProgressVlaue(0)
            toast("err", { type: "error" })
        });

        request.send(fd);
    }



    return (
        <div className="flex flex-col bg-seller bg-no-repeat bg-cover bg-fixed">

            <div className=" w-full min-h-screen  flex justify-center items-center ">
                <div className="w-full max-w-[1400px] flex flex-col md:flex-row items-center pl-[20px] md:pl-[40px] md:pr-0 pr-[20px]">
                    <div className=" w-full md:w-6/12 md:pt-[60px] pt-[10px] h-fit flex flex-col order-2 md:order-1 ">
                        <div className=" w-full flex items-center">
                            <div onClick={() => { setBusinessType('shop') }} className={` w-full md:w-[130px] h-[45px] border  md:mx-0 mx-4 rounded-[30px] flex justify-center items-center md:text-base text-sm text-center cursor-pointer border-gr-300 ${businessType == 'shop' ? 'text-white border-0 bg-gr-300' : 'text-gr-300 border bg-inherit'} `}>OPTICAL SHOP</div>
                            <div onClick={() => { setBusinessType('brand') }} className={` w-full md:w-[130px] h-[45px]  ml-0 md:ml-[50px] md:mx-0 mx-4 rounded-[30px] flex justify-center items-center  md:text-base text-sm cursor-pointer text-center border-gr-300 ${businessType == 'brand' ? 'text-white border-0 bg-gr-300' : 'text-gr-300 border bg-inherit'}`}>SUPPLIER</div>
                        </div>
                        <form ref={formRef} onSubmit={onFinish} className="w-full flex flex-col mt-[20px]">

                            <div className="w-full flex flex-col mt-1">
                                <span className="  text-gray-700">Business name</span>
                                <input type="text" placeholder="Enter your business name" name='name' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                            </div>

                            <div className="w-full flex flex-col mt-1">
                                <span className="  text-gray-700">Address</span>
                                <input type="text" placeholder="Enter your business address" name='address' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                            </div>

                            {!CheckUserAuth() &&
                                <>
                                    <div className="w-full flex flex-col mt-1">
                                        <span className="  text-gray-700">Email</span>
                                        <input type="email" placeholder="Enter your email" name='owner_email' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                                    </div>

                                    <div className="w-full flex flex-col mt-1">
                                        <span className="  text-gray-700">Owner name</span>
                                        <input type="text" placeholder="Enter your owner name" name='owner_name' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                                    </div>

                                    <div className="w-full flex flex-col mt-1">
                                        <span className="  text-gray-700">Phone</span>
                                        <input type="text" placeholder="Enter your phone" name='owner_phone' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                                    </div>

                                    <div className="w-full flex flex-col mt-1">
                                        <span className="  text-gray-700">Password</span>
                                        <input type="password" placeholder="Enter your password" name='password' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none bg-transparent" required />
                                    </div>
                                </>
                            }

                            <div className=" flex items-center text-xs my-4">
                                <div onClick={() => {
                                    setIsAgreeSup(!isAgreeSup)
                                }} className=" border border-green-400 w-[15px] h-[15px] flex justify-center cursor-pointer items-center mr-2 rounded-sm ">
                                    {isAgreeSup ? <div className=" bg-green-400 w-[10px] h-[10px] rounded-sm" /> : ""}
                                </div>
                                I accept the 
                                <a onClick={() => {
                                     setIsSupTermsModal(true)
                                }} className=" text-blue-500 cursor-pointer ml-1">
                                    terms of service
                                </a>
                            </div>

                            <div className="w-full flex items-center justify-between mt-4">
                                {display ?
                                    <div onClick={handelManyRequest} className=" flex items-center">
                                        <div className=" w-[30px] h-[30px] border border-gr-300 rounded-full flex justify-center items-center text-2xl text-gr-300 cursor-pointer">+</div>
                                        <span className=" text-gr-300 ml-[20px] cursor-pointer">Upload documents for opening an account with optic4less</span>
                                    </div>
                                    :
                                    <label className=" flex items-center">
                                        <div className=" w-[30px] h-[30px] border border-gr-300 rounded-full flex justify-center items-center text-2xl text-gr-300 cursor-pointer">+</div>
                                        <span className=" text-gr-300 ml-[20px] cursor-pointer">Upload documents for opening an account with optic4less</span>
                                        <input accept="image/png,image/jpg,image/jpeg,image/webp,application/pdf,text/plain csv" type="file" className="hidden" onChange={(e: any) => uploadFile(e)} />
                                    </label>
                                }
                                <div onClick={() => { setVisibleHelp(!visibleHelp) }} className=" w-[27px] h-[27px] bg-gr-300 rounded-full flex justify-center items-center  text-white cursor-pointer">?</div>
                            </div>
                            <div className=" w-full flex flex-wrap items-center mt-3">
                                {listFiles.map((item: any, index: number) =>
                                    <div key={index} className="w-full sm:w-6/12 px-1 mb-1 ">
                                        <div className=" w-full h-[45px] bg-white rounded-[10px] shadow flex items-center justify-between px-2  overflow-hidden">
                                            <div className=" w-[calc(100%-30px)] flex items-center overflow-hidden">
                                                <img src="/assets/svg/files.svg" className=" w-[35px] h-[35px] rounded-full p-[7px] shadow" />
                                                <span className=" text-xs ml-3 text-gray-500">{item.name.substring(0, 15)}</span>
                                            </div>
                                            <div onClick={() => deleteFile(index)} className=" w-[30px] h-[30px] rounded-[5px] shadow bg-gr-100 flex justify-center items-center cursor-pointer">
                                                <img src='/assets/svg/trash.svg' className=" w-4" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {display == true &&
                                    <div className=" w-full sm:w-6/12  px-1 mb-1 ">
                                        <div className=" w-full h-[45px] bg-white rounded-[10px] shadow flex items-center justify-between px-2  overflow-hidden">
                                            <div className=" w-full flex items-center overflow-hidden">
                                                <img src="/assets/svg/files.svg" className=" w-[35px] h-[35px] rounded-full p-[7px] shadow" />
                                                <div className="w-[calc(100%-35px)] flex flex-col px-[5px]" >
                                                    <div className=" w-full flex items-center justify-between mb-[5px] ">
                                                        <span className=" text-xs">{fileName != '' && fileName.substring(0, 15)}</span>
                                                        <span className="text-sm text-gr-300">{progressValue} %</span>
                                                    </div>
                                                    <progress className=" h-[5px]  rounded-[10px] " value={progressValue} max={100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            {displayBtn ?
                                <button className=" w-[130px] h-[45px] bg-gr-300 mb-6 mt-3 rounded-[30px] flex justify-center items-center text-white"><BtnLoader /></button>
                                :
                                <button className=" w-[130px] h-[45px] bg-gr-300 mb-6 mt-3 rounded-[30px] flex justify-center items-center text-white">Submit</button>
                            }
                            <div className="flex items-center md:mb-[100px] mb-[110px]">
                                <span className="text-sm">Already have a shop ? </span>
                                <a rel="noreferrer" href="https://my.optics4less.com/" target={'_blank'}>
                                    <span className="text-sm ml-[6px] text-gr-300 cursor-pointer">Login</span>
                                </a>
                            </div>
                        </form>
                    </div>

                    <div className=" w-full md:w-6/12 flex flex-col justify-center items-center  order-1 md:order-2 md:my-0 my-[40px]">
                        <img src="/assets/media/reopen.png" alt="Reopen your business with Optics4less" className="max-w-[300px] w-full" />
                    </div>
                </div>
            </div>

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
                        <span className="line">
                            Optic4Less is an online platform that facilitates the sale of optical wear between the buyer and consumer. It is a user friendly platform which allows for seamless browsing, selection, purchase and delivery of various optical wear. Open your seller account and enjoy the benefits of online visibility which allows you to tap into a new consumer pool. It is a quick and simple process.
                        </span>
                        <span className="mt-[25px]">
                            Optics4Less allows the manufacturer to sell their collection of eyewear online to optical retailers. They can showcase their collections online and the retailers can seamlessly select and purchase these online hassle free. Open your manufacturer account the reap the rewards of your online seller account.
                        </span>
                        <span className="mt-[25px]">
                            Both suppliers and retail shops can access their panel to view all the transactions history and the flow chart of the sales revenue during a day or a month or a year. Also, it is easier for them to compare sales. Every day that technology advances, online businesses advance as well. Optics4less has created a business that suppliers and retail shops do business with each other in their own panel without travelling distances.
                        </span>
                        <span className="mt-[25px]">
                            The chat menu option will be available for customers to interact with the retail shops if they have any inquires about a specific model or delivery time or any other details they want to know about the shop or an eyewear in general
                        </span>
                    </div>
                </div>
            </div>

            <CModal visible={visibleHelp} setVisible={setVisibleHelp} radius={'30px'} uId={'Mo-info-seller'} >
                <div className=" w-full p-4">
                    <li>Company Trade license </li>
                    <li>Tax registration number  </li>
                    <li>Passport and Emirets ID copy of authorized person </li>
                </div>
            </CModal>

            <CModal visible={visibleMessage} setVisible={setVisibleMessage} radius={'30px'} uId={'message-register-seller'} >
                <div className=" w-full flex flex-col p-4">
                    <div className="w-full flex justify-center items-center">
                        <img src='/assets/media/success.png' className="w-[40px]" alt="success" />
                    </div>
                    <span className="text-center mt-[20px]">{messageModal}</span>
                    <button onClick={() => { setVisibleMessage(false) }} className=" w-[120px] h-[40px] m-auto mt-[30px] rounded bg-[#31b97b] text-white">Ok</button>
                </div>
            </CModal>

            <CModal width="100%" className=" max-w-screen-lg" visible={isSupTermsModal} setVisible={setIsSupTermsModal} radius={'30px'} uId={'supTemModal'} >
                {businessType == 'shop' ?
                    <ModalPrivacyContentShop />
                    :
                    <ModalPrivacyContentBrand />
                }

                <div className="w-full flex items-center px-[10px] ">
                    <button className="w-[150px] h-[40px] rounded-[30px] bg-gr-300 text-white" onClick={() => { setIsSupTermsModal(false) }}>
                        Accept
                    </button>
                </div>

            </CModal>

        </div>
    )
}

export default Index;
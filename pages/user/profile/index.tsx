import React, { useState, useEffect, useRef, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl } from "../../../apis";
import Link from "next/link";
import { customApi } from "../../../apis";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import Router from 'next/router'
import { toast } from "react-toastify";
import { ProfileTypesInput } from '../../../types/profile.types';
import ProfileSide from '../../../components/user/ProfileSide';
import LoadingPage from "../../../components/layout/LoadingPage";
import BtnLoader from "../../../components/layout/BtnLoader";
import { GetProfileAPi, UpdateProfileAPi, UploadAvatarAPi } from "../../../apis/profile-api/profile-api";
import CSkeleton from "../../../components/CSkeleton/CSkeleton";
import { ContextFailLoad } from "../../../components/context/ContextFailLoad";
import CModal from "../../../components/CModal/CModal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const defaultSrc =
    "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Index: NextPage = () => {
    const [display, setDisplay] = useState<boolean>(true)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [visibleModal, setVisibleModal] = useState<boolean>(false)
    const [userData, setUserData] = useState<any>({})
    const [selectedImages, setSelectedImages] = useState<{ path: string, url: string }>()
    const formRef: any = useRef()
    const CtxFail = useContext(ContextFailLoad);

    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState<any>();


    const handelOnChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
        setVisibleModal(true)
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            uploadAvatar(cropper.getCroppedCanvas().toDataURL())
        }
    };

    const updataProfile = async (e: any) => {
        e.preventDefault()
        setDisplay(true)
        try {
            const res = await UpdateProfileAPi(e, selectedImages?.path)
            toast("update success", { type: "success" })
            setDisplay(false)
        }
        catch {
            setDisplay(false)
        }
    }


    const uploadAvatar = async (data: any) => {
        fetch(data)
            .then(res => res.blob())
            .then(async blob => {
                const file = new File([blob], "File name", { type: "image/png" })
                setDisplay(true)
                try {
                    const res = await UploadAvatarAPi(file)
                    toast("Image is pre-iploaded, compelete proccess by click to update profile", { type: "success", autoClose: false })
                    setVisibleModal(false)
                    setSelectedImages({ path: res.path, url: res.url })
                    setDisplay(false)
                }
                catch {
                    setDisplay(false)
                }
            })
    }


    const getData = async () => {
        setDisplay(true);
        try {
            const res = await GetProfileAPi()
            setDisplay(false)
            setUserData(res)
            setSelectedImages({ url: res.avatar ? res.avatar : defaultSrc, path: "" })
            formRef.current['name'].value = res.name
            formRef.current['phone'].value = res.phone
        }
        catch {
            setDisplay(false)
            CtxFail.setFailedLoad(true)
        }
    }

    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
            getData()
        }
        else {
            Router.push('/auth/login')
        }
    }, [])



    if (!isLogin) {
        return (<></>)
    }


    return (
        <>
            <div className=" w-full lg:w-10/12  m-auto mt-8 p-2 lg:p-0 flex flex-col relative">
                <ProfileSide active='profile' />
                <div className=" w-full h-fit mb-2 p-4 flex flex-col overflow-hidden max-w-screen-lg mx-auto">
                    <form ref={formRef} onSubmit={updataProfile} className=" flex flex-wrap">
                        <div className="  w-full sm:w-6/12 flex flex-col p-1">
                            <div className="w-full flex flex-col mt-1 mb-5">
                                <span className=" text-xs text-gray-500">Email</span>
                                <input type="email" name='email' value={userData?.email} className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                            </div>
                            <div className="w-full flex flex-col mt-1">
                                <span className=" text-xs text-gray-500">Name</span>
                                <input type="text" name='name' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                            </div>
                            <div className="w-full flex flex-col mt-1">
                                <span className=" text-xs text-gray-500">Phone</span>
                                <input type="text" name='phone' className=" w-full h-9 border-b-2 border-gr-300  pl-1 mb-5 text-sm focus:outline-none" required />
                            </div>

                        </div>
                        <div className="  w-full sm:w-6/12 flex flex-col p-1 items-center md:items-end py-10 md:py-0">
                            <div className=" flex flex-col justify-center items-center">
                                <label className=" flex justify-center items-center relative border-2 border-gr-300 w-[150px] h-[150px] rounded-full  ">
                                    <div className=" overflow-hidden absolute w-full h-full flex justify-center rounded-full">
                                        <img src={selectedImages?.url} alt={selectedImages?.path} className=" w-full " />
                                    </div>
                                    <input onChange={(e: any) => { handelOnChange(e) }} type="file" accept="image/*" className=" hidden" />
                                    <span className=" w-[25px] h-[25px] absolute bottom-0 right-4 bg-white border-2 cursor-pointer border-gr-300 rounded-full flex justify-center items-center text-gr-300 font-bold text-lg">
                                        +
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="  w-full sm:w-6/12 flex flex-col p-1 justify-center items-center md:items-start ">
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

            <CModal visible={visibleModal} setVisible={setVisibleModal} radius={'10px'} uId={'Mo-edit-profile'} >
                <div className=" w-full flex flex-col">
                    <Cropper
                        style={{ height: 300, width: "100%", borderRadius: "30px" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                            setCropper(instance);
                        }}
                        guides={true}
                    />
                    <div className=" w-full mt-[20px] flex justify-center items-center">
                        {!display ?
                            <button onClick={getCropData} type="button" className=" w-[130px] h-9 mx-1 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3">Crop</button>
                            :
                            <button type="button" className=" w-[130px]  h-9 mx-1 text-white bg-gr-300 rounded-[30px] focus:outline-none  mt-3 flex justify-center items-center relative" disabled>
                                <BtnLoader />
                            </button>
                        }
                        <button onClick={() => { setVisibleModal(false) }} type="button" className=" w-[130px] h-9 mx-1 text-[tomato] border border-[tomato] rounded-[30px] focus:outline-none  mt-3">Cancel</button>

                    </div>
                </div>
            </CModal>
        </>
    )
}

export default Index;
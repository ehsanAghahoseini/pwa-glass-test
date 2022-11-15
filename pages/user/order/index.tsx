import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl, DownloadInvoiceApi } from "../../../apis";
import Link from "next/link";
import { customApi } from "../../../apis";
import CheckUserAuth from "../../../components/checkUserAuth/CheckUserAuth";
import { ContextCart } from '../../../components/context/ContextCart';
import { ContextFavorite } from "../../../components/context/ContextFavorite";
import Router from 'next/router'
import { toast } from "react-toastify";
import { ProfileTypesInput } from '../../../types/profile.types';
import ProfileSide from '../../../components/user/ProfileSide';
import CModal from "../../../components/CModal/CModal";
import BtnLoader from "../../../components/layout/BtnLoader";
import LoadingPage from "../../../components/layout/LoadingPage";
import { PaginingModel } from "../../../types/models/pagining.types";
import { OrdersListApi } from "../../../apis/orders-api/address-api";
import SkeltonOrders from "../../../components/CSkeleton/SkeltonOrders";
import ModalDetailOrders from "../../../components/orderComponent/ModalDetailOrders";
import ModalTrackOrders from "../../../components/orderComponent/ModalTrackOrders";
import ModalCommentOrders from "../../../components/orderComponent/ModalCommentOrders";
import { MetaModel } from "../../../types/models/pagining.types";
import MetaPagination from "../../../components/MetaPagination/MetaPagination";
import PageLoader from "next/dist/client/page-loader";
import { ContextFailLoad } from "../../../components/context/ContextFailLoad";
import { checkPermission } from "../../../components/Permissions/checkPermissions";
import { PricePermissions } from "../../../components/Permissions/listPermissions";


const Index: NextPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<number>(1)
    const [display, setDisplay] = useState<boolean>(false)
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [visiblePay, setvisiblePay] = useState<boolean>(false)
    const [visibleDetail, setVisibleDetail] = useState<boolean>(false)
    const [visibleComment, setVisibleComment] = useState<boolean>(false)
    const [visibleTrack, setVisibleTrack] = useState<boolean>(false)
    const [isEpmtyList, setIsEpmtyList] = useState<boolean>(false)
    const [selectOrder, setSelectOrder] = useState<any>(null)
    const [selectedOrder, setSelectedOrder] = useState<any>(null)
    const [selectPayMethod, setSelectPayMethod] = useState<any>(null)
    const [listOrder, setListOrder] = useState<any>([])
    const [metaPage, setMetaPage] = useState<MetaModel>();
    const [orderDetails, setOrderDetails] = useState<any>(null)
    const [listMethodPay, setListMethodPay] = useState<any>([])
    const CtCard = useContext(ContextCart);
    const CtFav = useContext(ContextFavorite);
    const CtxFail = useContext(ContextFailLoad);



    const getPaymentMethod = async (id: number, status: string) => {
        setDisplay(true)
        const res = await customApi({ url: `${baseUrl}/orders/services` }, { method: 'GET', token: true })
        setDisplay(false)
        if (res.status == true) {
            setSelectOrder({
                'id': id,
                'status': status
            })
            setListMethodPay(res.data)
            setvisiblePay(true)
        }
        else if (res.status == false && res.message == 'Unauthenticated') {
            localStorage.clear();
            sessionStorage.clear()
            CtCard.setCardList([]);
            CtCard.setCardLength(0)
            CtFav.setFavorite([]);
            Router.push("/auth/login")
        }
    }


    const resendPayment = async () => {
        if (selectPayMethod == null) { return toast("select pay method", { type: "info" }) }
        if (selectOrder != null && selectOrder.status == 'waiting_payment') {
            setDisplay(true)
            const res = await customApi({ url: `${baseUrl}/orders/${selectOrder.id}/pay?service_id=${selectPayMethod.id}` }, { method: 'GET', token: true })
            setDisplay(false)
            if (res.status == true) {
                location.href = res.data
            }
        }
        else {
            toast("false", { type: "info" })
        }

    }

    const cancelOrder = async (id: any) => {
        setDisplay(true)
        const res = await customApi({ url: `${baseUrl}/orders/${id}/cancel` }, { method: 'GET', token: true })
        setDisplay(false)
        if (res.status == true) {
            setDisplay(false)
            toast(res.message, { type: "info" })
            getData(activeTab)
        }
        else {
            toast("not found", { type: "info" })
        }
    }

    const downloadInvoice = async (id: any) => {
        setDisplay(true)
        try {
            const res: any = await DownloadInvoiceApi(id)
            var el = document.createElement("a");
            el.setAttribute("href", res);
            el.setAttribute("download", 'invoice');
            el.setAttribute("target", '_blank');
            document.body.appendChild(el);
            el.click();
            el.remove();
            setDisplay(false)
        } catch {
            setDisplay(false)
        }
    }

    const getDetail = async (item: any) => {
        if (display) return
        setDisplay(true)
        const res = await customApi({ url: `${baseUrl}/orders/${item.id}` }, { method: 'GET', token: true })
        if (res) {
            setOrderDetails(res)
            setVisibleDetail(true)
            setDisplay(false)
        }
        else {
            toast("not found", { type: "info" })
        }
    }

    const getData = async (activeTab: number) => {
        setIsEpmtyList(false)
        //?order=reciving
        setDisplaySkelton(true)
        try {
            const res: PaginingModel = await OrdersListApi(activeTab)
            setListOrder(res.data)
            setIsEpmtyList(res.data.length === 0)
            setMetaPage(res.meta)
            setDisplaySkelton(false)
        }
        catch {
            CtxFail.setFailedLoad(true)
            setDisplaySkelton(false)
        }
    }


    useEffect(() => {
        if (CheckUserAuth()) {
            setIsLogin(true)
            getData(activeTab)
        }
        else {
            Router.push('/auth/login')
        }
    }, [activeTab])


    if (!isLogin) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {display && <LoadingPage />}
            <div className=" w-full lg:w-10/12  m-auto mt-8 p-2 lg:p-0 flex flex-col  ">
                <ProfileSide active='orders' />
                <div className=" w-full  h-fit mb-2 p-4 flex flex-col rounded  overflow-hidden max-w-screen-lg mx-auto">
                    <div className=" w-full  my-[20px] flex items-center sm:px-3 px-0">
                        <span onClick={() => { setActiveTab(1) }} className={` min-w-[100px]  text-gray-500 md:text-base text-sm  pb-1 text-center cursor-pointer  ${activeTab == 1 ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Order</span>
                        <span onClick={() => { setActiveTab(2) }} className={` min-w-[100px] ml-[20px] text-gray-500 md:text-base text-sm  pb-1 text-center cursor-pointer  ${activeTab == 2 ? 'border-b-2 border-gr-300 ' : 'border-0'}`}>Order received</span>
                    </div>
                    <div className=" w-full flex flex-wrap mt-4">
                        {!displaySkelton && listOrder.map((item: any, index: any) =>
                            <div key={index} className=" w-full mb-6 py-3 rounded border-b flex items-start flex-wrap ">
                                <div className=" w-full md:w-[100px] flex flex-row md:flex-col items-center  overflow-hidden md:mb-0 mb-5">
                                    <img src={item.shop.logo} alt="logo" className=" w-12 h-12  rounded-full" />
                                    <span className=" text-gray-800 text-xs mt-0 md:mt-4 ml-[15px] md:ml-0">{item.shop.name}</span>
                                </div>
                                <div className=" w-full md:w-[calc(100%-300px)]  flex flex-col px-3">
                                    {item.products.map((itemIn: any, index: number) =>
                                        <div key={itemIn} className=" w-full flex mb-2 justify-around items-center h-[70px]">
                                            <div className='flex items-center'>
                                                <span className='mx-1'>{index + 1}</span>
                                                <img src={itemIn?.image ? itemIn.image : "/assets/media/b5.jpg"} alt="logo" className="sm:h-[70px] h-[40px] mx-2" />
                                            </div>
                                            <div className=" flex items-center w-[50px] sm:w-[100px] justify-between sm:text-base text-xs  mx-2">
                                                <img className=" w-[20px] h-[20px] rounded-full bg-red-100" src={itemIn.color_image ? itemIn.color_image : "/assets/media/gucci.png"} />
                                                <span className=" text-[11px] pt-2"> X</span>
                                                <span>{itemIn.count}</span>
                                            </div>
                                            <div className=" flex flex-col mx-2">
                                                {checkPermission(PricePermissions.view) &&
                                                    <>
                                                        {itemIn.discount == 0 ?
                                                            <span className="text-sm">AED {itemIn.price}</span>
                                                            :
                                                            <span className="text-sm">AED {itemIn.price - (itemIn.price * itemIn.discount / 100)}</span>
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className=" w-full md:w-[200px] flex flex-row md:flex-col justify-center items-end px-2 pl-4 rounded">
                                    {activeTab == 2 ?
                                        <> {item.products.map((itemIn: any, index: number) =>
                                            <div key={index} className=" flex items-center mb-0 md:mb-[10px] order-2 md:order-1 h-[70px]">
                                                {activeTab == 2 &&
                                                    <div onClick={() => {
                                                        setSelectedOrder(itemIn)
                                                        setVisibleComment(true)
                                                    }} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                        <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Rate</div>
                                                        <img src="/assets/svg/star-dark.svg" className="h-4" />
                                                    </div>
                                                }
                                                {activeTab == 2 &&
                                                    <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                        <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Return</div>
                                                        <img src="/assets/svg/refresh.svg" className="h-4" />
                                                    </div>
                                                }
                                                {activeTab == 2 &&
                                                    <div className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                        <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Refunds</div>
                                                        <img src="/assets/svg/rotate-right.svg" className="h-4" />
                                                    </div>
                                                }
                                                <div onClick={() => getDetail(item)} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                    <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">View</div>
                                                    <img src="/assets/svg/eye.png" className="h-4" />
                                                </div>
                                            </div>
                                        )}
                                        </>
                                        :
                                        <div className=" flex items-center mb-0 md:mb-[10px] order-2 md:order-1">
                                            {activeTab == 1 &&
                                                <div onClick={() => {
                                                    item?.tracking && setSelectedOrder(item?.tracking)
                                                    item?.tracking && setVisibleTrack(true)
                                                }} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                    <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">Track</div>
                                                    <img src="/assets/svg/car.png" className="w-4 h-4" />
                                                </div>
                                            }
                                            <div onClick={() => getDetail(item)} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">View</div>
                                                <img src="/assets/svg/eye.png" className="h-4" />
                                            </div>
                                            {checkPermission(PricePermissions.view) &&
                                                <div onClick={() => downloadInvoice(item.id)} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                                                    <div className="bg-gr-100 w-[60px] h-[20px] absolute text-gray-500 flex justify-center items-center top-[-25px] text-sm rounded opacity-0 invisible group-hover:top-[-30px] group-hover:opacity-100 group-hover:visible transition-all ">invoice</div>
                                                    <img src="/assets/svg/receipt.png" className="h-4" />
                                                </div>
                                            }
                                        </div>
                                    }

                                    <div className=" w-full flex flex-col order-1 md:order-2">
                                        {checkPermission(PricePermissions.view) &&
                                            <div className="w-full flex  items-center text-xs">
                                                <span>Shipping:</span>
                                                <span className="ml-[20px]">AED {item.shipping_price ? item.shipping_price : "---"}</span>
                                            </div>
                                        }
                                        {checkPermission(PricePermissions.view) &&
                                            <div className=" flex flex-col mt-[15px]">
                                                <span>subtotal :</span>
                                                <span className=" font-bold">AED {item.total_payment ? item.total_payment : "---"}</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                        {isEpmtyList ? <span className=" w-full flex justify-center items-center py-12 text-lg text-gray-300"> No Result</span> : ""}

                        {displaySkelton == true && new Array(5).fill(1).map((item: any, index: number) =>
                            <SkeltonOrders key={index} />
                        )}

                    </div>
                </div>

                <CModal visible={visiblePay} setVisible={setvisiblePay} uId="modal-PayMethod" >
                    {listMethodPay.map((item: any, index: any) =>
                        <div key={index} onClick={() => { setSelectPayMethod(item) }} className={` w-full h-20 rounded border mt-2 mb-4 flex items-center cursor-pointer ${selectPayMethod != null && selectPayMethod.id == item.id ? 'border-green-600' : 'border-gray-300'}`}>
                            <div className=" w-8 h-full flex items-center justify-center">
                                <span className={` w-4 h-4 rounded-full border flex justify-center items-center ${selectPayMethod != null && selectPayMethod.id == item.id ? 'border-green-600 ' : 'border-gray-400 '} `}>
                                    {selectPayMethod != null && selectPayMethod.id == item.id &&
                                        <span className=" w-2 h-2 rounded-full bg-green-600"></span>
                                    }
                                </span>
                            </div>
                            <img src={item.icon} alt="icon" className=" w-[80px] rounded" />
                        </div>
                    )}
                    <div className="CModel-Bottom">
                        {selectPayMethod == null &&
                            <button className=" cursor-not-allowed w-[100px] h-[35px] rounded bg-gray-600" disabled={true}>Ok </button>
                        }
                        {selectPayMethod != null && display == false &&
                            <button onClick={() => resendPayment()} className="CModel-Bottom-btn-ok" >Ok </button>
                        }
                        {selectPayMethod != null && display == true &&
                            <button type='button' className="CModel-Bottom-btn-ok" disabled><BtnLoader /></button>
                        }
                        <button className="CModel-Bottom-btn-cancel" onClick={() => { setvisiblePay(false) }}>Cansel</button>
                    </div>
                </CModal>

                <ModalDetailOrders
                    visible={visibleDetail}
                    setVisible={setVisibleDetail}
                    orderDetails={orderDetails}
                />

                <ModalTrackOrders
                    visible={visibleTrack}
                    setVisible={setVisibleTrack}
                    selecedOrder={selectedOrder}
                />

                <ModalCommentOrders
                    visible={visibleComment}
                    setVisible={setVisibleComment}
                    selectedOrder={selectedOrder}
                    isReq={display}
                    setIsReq={setDisplay}
                />

                <MetaPagination metaPage={metaPage} setMetaPage={setMetaPage} path={'user/order'} />

            </div>
        </>
    )
}

export default Index;
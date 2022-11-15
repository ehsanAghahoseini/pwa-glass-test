import { useEffect, useState } from "react";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";
import dynamic from "next/dynamic";
import { ModalDetailAddressProps } from "../../types/type-props/ModalDetailAddressProps";
import { customApi, baseUrl } from "../../apis";
import { toast } from "react-toastify";
import { ModalDetailOrdersProps } from "../../types/type-props/ModalDetailOrdersProps";



const ModalTrackOrders = ({ setVisible, visible, selecedOrder }: any) => {


    return (
        <>
            <CModal visible={visible} setVisible={setVisible} uId="track-order" radius={'30px'} >
                {selecedOrder &&
                    <div className="flex flex-col p-3">
                        <div className=" w-full  p-3 flex items-center justify-end">
                            <div onClick={() => { setVisible(false) }} className="  text-gray-500 rounded cursor-pointer flex items-center justify-center">X</div>
                        </div>
                        <div className="w-full mb-5 flex justify-between items-center text-gray-500 text-lg pt-3">
                            <div className=" flex items-center">
                                {selecedOrder.submit ?
                                    <div className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center" >
                                        <img src="/assets/svg/check2.svg" className="w-4" />
                                    </div>
                                    :
                                    ""
                                }
                                <span className="  ml-6">Order received</span>
                            </div>
                            <div className=" flex items-center">
                                <span className="  ml-6"> {selecedOrder.submit}</span>
                            </div>
                        </div>
                        <div className="w-full mb-5 flex justify-between items-center text-gray-500 text-lg">
                            <div className=" flex items-center">
                                {selecedOrder.process ?
                                    <div className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center" >
                                        <img src="/assets/svg/check2.svg" className="w-4" />
                                    </div>
                                    :
                                    ""
                                }
                                <span className="  ml-6">Packing process </span>
                            </div>
                            <div className=" flex items-center">
                                <span className="  ml-6"> {selecedOrder.process}</span>
                            </div>
                        </div>
                        <div className="w-full mb-5 flex justify-between items-center text-gray-500 text-lg">
                            <div className=" flex items-center">
                                {selecedOrder.send ?
                                    <div className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center" >
                                        <img src="/assets/svg/check2.svg" className="w-4" />
                                    </div>
                                    :
                                   ""
                                }
                                <span className="  ml-6">Packing on delivery</span>
                            </div>
                            <div className=" flex items-center">
                                <span className="  ml-6"> {selecedOrder.send}</span>
                            </div>
                        </div>

                    </div>
                }
            </CModal>
        </>
    )
}

export default ModalTrackOrders;
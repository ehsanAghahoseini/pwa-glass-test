import CModal from "../CModal/CModal";
import { ModalDetailOrdersProps } from "../../types/type-props/ModalDetailOrdersProps";
import { commaFire } from "../widgets/commaFire";
import { useEffect, useState } from "react";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";


const ModalDetailOrders = ({ orderDetails, setVisible, visible }: ModalDetailOrdersProps) => {
    const [totalQuantity, setTotalQuantity] = useState<number>(0)

    useEffect(() => {
        if (orderDetails) {
            let quantity = 0;
            for (let i of orderDetails.products) {
                quantity = quantity + i.count;
            }
            setTotalQuantity(quantity)
        }
    }, [orderDetails])

    return (
        <>
            <CModal visible={visible} setVisible={setVisible} uId="Detail-order" radius={'30px'} >
                <>
                    {orderDetails != null &&
                        <div className=" px-3">
                            <div className=" w-full  p-3 flex items-center justify-between">
                                <div className=" flex items-center">
                                    <img src={orderDetails.shop.logo} alt="logo" className=" w-12 h-12 rounded-full shadow" />
                                    <span className=" ml-3 text-gray-600">{orderDetails.shop.name}</span>
                                </div>
                                <div onClick={() => { setVisible(false) }} className="  text-gray-500 rounded cursor-pointer flex items-center justify-center">X</div>
                            </div>
                            <p className=" text-[20px]">Order Number : <strong>#{orderDetails.name}</strong></p>
                            <div className=" w-full flex flex-col p-3">
                                <span className=" my-1 text-gray-600 pb-2"> {orderDetails.address.receive_address}</span>
                                <span className=" my-1 text-gray-600">{orderDetails.address.receive_phone}</span>
                            </div>
                            {orderDetails.products.length > 0 && orderDetails?.products?.map((item: any, index: any) =>
                                <div key={index} className=" w-full p-3 flex items-center justify-between  ">
                                    <div className="flex items-center">
                                        <img src={item.image ? item.image : "/assets/media/reopen.png"} alt="image" className=" w-[80px] rounded" />
                                        <div className=" flex ml-8" >
                                            <img className="w-5 h-5 bg-red-500 rounded-full"
                                                src={item.color.image ? item.color.image : "/assets/media/reopen.png"} />
                                            <span className=" ml-2">x</span>
                                            <span className="ml-2">{item.count}</span>
                                        </div>
                                    </div>
                                    <div className="border flex flex-col justify-center items-center px-2 ml-2 rounded-xl text-[11px] bg-white">
                                        <small className="">Frame Size</small>
                                        {item.frame && <>{item.frame}</>}
                                    </div>
                                    <div className=" flex justify-center items-center flex-col">
                                        {checkPermission(PricePermissions.view) &&
                                            <>
                                                {item.discount_per_count ?
                                                    <>
                                                        <s><span className=" text-[10px] mr-1">AED </span> {item.price_per_count}</s>
                                                        <span className=" text-lg"><span className=" text-[10px] mr-1">AED </span> {(+item.price_per_count - (+item.price_per_count * +item.discount_per_count))}</span>
                                                    </>
                                                    :
                                                    <span className=" text-lg"><span className=" text-[10px] mr-1">AED </span> {item.price_per_count}</span>
                                                }
                                            </>
                                        }
                                    </div>
                                </div>
                            )}
                            <div className=" w-full flex items-center justify-center">
                                <div className=" w-full flex flex-col p-3">
                                    {checkPermission(PricePermissions.view) &&

                                        <>
                                            <span className=" text-gray-600">Subtotal :</span>
                                            <span className="text-lg">AED {orderDetails.total_payment}</span>
                                        </>
                                    }
                                </div>
                                <div className=" w-full flex flex-col p-3">
                                    <span className=" text-gray-600">Total quantity :</span>
                                    <span className="text-lg"> {totalQuantity}</span>
                                </div>
                            </div>
                            <button onClick={() => { setVisible(false) }} className=" w-[120px] h-10 m-3 mt-[60px] bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                <span>Ok</span>
                            </button>

                        </div>
                    }
                </>
            </CModal>
        </>
    )
}

export default ModalDetailOrders;
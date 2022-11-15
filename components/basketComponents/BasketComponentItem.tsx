import React, { useEffect, useState, useContext } from "react";
import RatingComponent from "../widgets/Rating.component";
import { DeleteProduct, PlusItem, Minusetem, DeleteCart } from '../../components/cart/ManageCart';
import { ContextCart } from '../../components/context/ContextCart';
import Link from "next/link";
import CheckUserAuth from "../../components/checkUserAuth/CheckUserAuth";
import { useRouter } from "next/router";
import { CheckStockProductOnBasket } from "../../apis/payment-api/payment-api";
import BtnLoader from "../layout/BtnLoader";
import { toast } from "react-toastify";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";


const BasketComponentItem = ({ value, setSelectCart, setCart }: any) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const CtxCard = React.useContext(ContextCart);
    const router = useRouter()


    const pluseProductToCart = async ( product_parent_id: any,shopId: any,variant_id:any , count: any) => {
        setDisplayBtn(true)
        try {
            const res = await CheckStockProductOnBasket(variant_id)
            setDisplayBtn(false)
            if (count + 1 <= parseInt(res.stock)) {
                let new_List = await PlusItem(product_parent_id, shopId, variant_id);
                setSelectCart(null)
                CtxCard.setCardList(new_List[0])
                CtxCard.setCardLength(new_List[1])
                setCart(new_List[0])
                return
            }
            return toast('No More Stock ', { type: "error" })
        }
        catch {
            setDisplayBtn(false)
        }
    }

    const deleteProductFromCart = async (product_parent_id: any, shopId: any,  variant_id: number) => {
        let new_List = await DeleteProduct(product_parent_id, shopId, variant_id);
        setSelectCart(null)
        CtxCard.setCardList(new_List[0])
        CtxCard.setCardLength(new_List[1])
        setCart(new_List[0])
    }

    const minuseProductFromCart = async (product_parent_id: any, shopId: any,  variant_id: any) => {
        let new_List = await Minusetem(product_parent_id, shopId, variant_id);
        setSelectCart(null)
        CtxCard.setCardList(new_List[0])
        CtxCard.setCardLength(new_List[1])
        setCart(new_List[0])
    }

    const deleteCart = async (shopId: any) => {
        let new_List = await DeleteCart(shopId);
        setSelectCart(null)
        CtxCard.setCardList(new_List[0])
        CtxCard.setCardLength(new_List[1])
        setCart(new_List[0])
    }

    const routToCheckout = (shopId: any) => {
        if (!CheckUserAuth()) {
            router.push({ pathname: "/auth/login", query: { fromCheckOut: true, shopId: shopId } })
        }
        else router.push(`/checkout/${shopId}`)
    }

    return (
        <>
            {value &&
                <div className=" w-full flex flex-col border-2 border-gr-100 rounded mb-6">
                    <div className="   p-3 flex items-center">
                        <Link href={`/s/${value.shop.slug}`}>
                            <img src={value.shop.logo} className=" w-[60px] h-[60px] shadow rounded-full cursor-pointer" alt="logo" />
                        </Link>
                        <div className=" flex flex-col ml-3">
                            <Link href={`/s/${value.shop.slug}`}>
                                <span className="text-sm mb-2 cursor-pointer">{value.shop.name}</span>
                            </Link>
                            <RatingComponent rateNumber={value.shop.review} />
                        </div>
                    </div>
                    <div className=" w-full flex flex-col p-3 ">
                        {value.shopCart.length > 0 && value.shopCart.map((item: any, index: number) =>
                            <div key={index} className=" flex items-center justify-between mb-6 md:mb-3">
                                <span>{index + 1}</span>
                                <Link href={`${item.uri}`}>
                                    <img className=" w-6/12 md:w-5/12 rounded-[10px] cursor-pointer" src={item.image} />
                                </Link>
                                <div className=" w-6/12 md:w-7/12 flex md:flex-row flex-col items-center">
                                    <div className=" w-full md:w-6/12 flex flex-col  items-center">
                                        <span className="text-sm">{item.title}</span>
                                        <img src={item.color} alt="color" className=" w-[20px] h-[20px] rounded-full  my-2" />
                                        {checkPermission(PricePermissions.view) &&
                                            <span className=" font-semibold ">AED {item.price}</span>
                                        }
                                        <div className=" w-[80%] sm:w-[180px] min-h-[35px] text-center sm:text-base text-xs mt-3 bg-gr-100 rounded-[30px] border border-gr-300 flex items-center justify-center">
                                            <img src="/assets/svg/car.png" className=" w-5 mr-2 sm:flex hidden" />
                                            <span>{item.delivery_day} Day Shipping</span>
                                        </div>
                                    </div>
                                    {item.count > 0 ?
                                        <div className=" w-full md:w-6/12   flex items-center justify-between pl-3 md:mt-0 mt-3">
                                            {item.count == 1 ?
                                                <div onClick={() => deleteProductFromCart( item.product_parent_id,value.shop.id, item.variant_id)} className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center text-white cursor-pointer">
                                                    <img src="/assets/svg/trash-white.svg" className="w-4 h-4" />
                                                </div>
                                                :
                                                <div onClick={() => minuseProductFromCart(item.product_parent_id,value.shop.id, item.variant_id)} className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center text-white cursor-pointer">-</div>
                                            }
                                            <span className="text-gr-300">{item.count}</span>
                                            {displayBtn ?
                                                <div className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center text-white cursor-pointer">
                                                    <BtnLoader />
                                                </div>
                                                :
                                                <div onClick={() => pluseProductToCart(item.product_parent_id,value.shop.id, item.variant_id , item.count)} className=" w-[25px] h-[25px] rounded-full bg-gr-300 flex justify-center items-center text-white cursor-pointer">+</div>
                                            }
                                        </div>
                                        :
                                        <div className=" w-full md:w-6/12  flex items-center justify-between pl-3 md:mt-0 mt-3">
                                            <div className=" flex justify-center items-center mt-[20px] h-[40px] rounded-[30px] w-full bg-gray-300 text-white cursor-not-allowed">
                                                No Stock
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" w-full flex items-center justify-end mt-[20px] pb-5 pr-3">
                        <div onClick={() => deleteCart(value.shop.id)} className="w-[200px] h-[40px] text-gr-300 border border-gr-300 rounded-[30px] flex justify-center items-center mx-2 text-sm cursor-pointer">Delete cart</div>
                        <div onClick={() => routToCheckout(value.shop.id)} className="w-[200px] h-[40px] bg-gr-300 rounded-[30px] flex justify-center items-center text-white text-sm  cursor-pointer">Checkout</div>
                    </div>
                </div>
            }
        </>
    )
}

export default BasketComponentItem;
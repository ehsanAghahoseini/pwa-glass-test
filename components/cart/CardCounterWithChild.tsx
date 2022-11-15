import React, { useState, useEffect, useContext } from "react";
import { ContextCart } from '../context/ContextCart';
import { AddToCart, PlusItem, DeleteProduct, Minusetem } from '../../components/cart/ManageCart';
import Link from "next/link";
import { toast } from "react-toastify";


interface CardCounterWithChildProps {
    selectedChild: any,
    selectedFrame: number,
    product: any,
    goToBasket?: boolean,
    asShop?: boolean,
}

const CardCounterWithChild = ({ product, selectedChild, goToBasket, selectedFrame, asShop }: CardCounterWithChildProps) => {
    const CtxCard = useContext(ContextCart);
    const [childrenExistCard, setChildrenExistCard] = useState<any>({})
    const [isNoMoreStock, setIsNoMoreStock] = useState<boolean>(false)

    const AddProductToCart = async (product: any, children: any, variant_id: any) => {
        let cart = await AddToCart(product, children,  variant_id);
        CtxCard.setCardList(cart[0])
        CtxCard.setCardLength(cart[1])
        GetShopCard(product.shop.id)
    }

    const pluseProductToCart = async (shopId: number, variant_id: any) => {
        for (let i of product.children[selectedChild]) {
            if (i.variant_id == variant_id && i.stock <= childrenExistCard[`${product.id}${i.variant_id}`]) {
                if(asShop == true) toast('No More Stock', { type: "error" })
                return setIsNoMoreStock(true)
            }
        }
        let cart = await PlusItem(product.id , shopId, variant_id);
        CtxCard.setCardList(cart[0])
        CtxCard.setCardLength(cart[1])
        GetShopCard(shopId)
    }

    const deleteProductFromCart = async (shopId: number, variant_id: any) => {
        setIsNoMoreStock(false)
        let cart = await DeleteProduct(product.id ,shopId, variant_id);
        CtxCard.setCardList(cart[0])
        CtxCard.setCardLength(cart[1])
        GetShopCard(shopId)
    }

    const minuseProductFromCart = async (shopId: number, variant_id: any) => {
        setIsNoMoreStock(false)
        let cart = await Minusetem(product.id ,shopId, variant_id);
        CtxCard.setCardList(cart[0])
        CtxCard.setCardLength(cart[1])
        GetShopCard(shopId)
    }

    const GetShopCard = async (shopId: number) => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]))
        }
        var cart = JSON.parse(String(localStorage.getItem('cart')));
        let data: any = {}
        for (let i of cart) {
            if (i.shop.id == shopId) {
                for (let j of i.shopCart) {
                    data[`${j.product_parent_id}${j.variant_id}`] = j.count;
                }
                setChildrenExistCard(data)       
            }
        }
    }

    useEffect(() => {
        if (product.shop.id) {
            GetShopCard(product.shop.id)
        }
    }, [product, CtxCard.cardList])

    useEffect(() => {
        setIsNoMoreStock(false)
    }, [selectedFrame, selectedChild])

    useEffect(()=>{
        console.log(selectedFrame);
        console.log(selectedChild);
        
    },[])

    return (

        <>
            {!childrenExistCard[`${product.id}${product.children[selectedChild]?.[selectedFrame].variant_id}`] ?
                <div onClick={() => AddProductToCart(product, product.children[selectedChild][selectedFrame], product.children[selectedChild][selectedFrame].variant_id)} className={`${asShop ? 'h-full text-[11px]':'mt-[20px] h-[40px]'} flex justify-center items-center rounded-[30px] w-full bg-gr-300 text-white cursor-pointer`}>
                    Add to Cart
                </div>
                :
                <div className=" w-full flex flex-col">
                    {childrenExistCard[`${product.id}${product.children[selectedChild]?.[selectedFrame].variant_id}`] != 1 ?
                        <div className={` w-full flex justify-between ${ asShop != true && 'mt-[20px]' }`}>
                            <div onClick={() => minuseProductFromCart(product.shop.id, product.children[selectedChild][selectedFrame].variant_id)} className={` ${asShop ? 'w-[25px] h-[25px]' : 'w-[30px] h-[30px]'} bg-gr-300 rounded-full flex justify-center items-center text-white text-lg  cursor-pointer`}>-</div>
                            <span className=" text-gr-300">{childrenExistCard[`${product.id}${product.children[selectedChild][selectedFrame].variant_id}`]}</span>
                            <div onClick={() => pluseProductToCart(product.shop.id, product.children[selectedChild][selectedFrame].variant_id)} className={` ${asShop ? 'w-[25px] h-[25px]' : 'w-[30px] h-[30px]'} bg-gr-300 rounded-full flex justify-center items-center text-white text-lg  cursor-pointer`}>+</div>
                        </div>
                        :
                        <div className={` w-full flex justify-between ${ asShop != true && 'mt-[20px]' }`}>
                            <div onClick={() => deleteProductFromCart(product.shop.id , product.children[selectedChild][selectedFrame].variant_id)} className={` ${asShop ? 'w-[25px] h-[25px]' : 'w-[30px] h-[30px]'} bg-gr-300 rounded-full flex justify-center items-center text-white text-lg  cursor-pointer`}>
                                <img src="/assets/svg/trash-white.svg" className="w-4 h-4" />
                            </div>
                            <span className=" text-gr-300">{childrenExistCard[`${product.id}${product.children[selectedChild][selectedFrame].variant_id}`]}</span>
                            <div onClick={() => pluseProductToCart(product.shop.id, product.children[selectedChild][selectedFrame].variant_id)} className={` ${asShop ? 'w-[25px] h-[25px]' : 'w-[30px] h-[30px]'} bg-gr-300 rounded-full flex justify-center items-center text-white text-lg  cursor-pointer`}>+</div>
                        </div>
                    }
                    {asShop != true &&
                        <div className={`w-full flex justify-center pt-4 items-center text-xs font-bold text-red-400 transition-all duration-500 ${isNoMoreStock ? "opacity-100 h-[20px] visible" : "invisible opacity-0 h-0"}`}> No More Stock </div>
                    }
                    {goToBasket == true &&
                        <Link href='/basket'>
                            <div className=" flex justify-center items-center mt-[30px] h-[40px] rounded-[30px] w-full bg-gr-300 text-white cursor-pointer">
                                Go to basket
                            </div>
                        </Link>
                    }
                </div>
            }
        </>

    )
}

export default CardCounterWithChild
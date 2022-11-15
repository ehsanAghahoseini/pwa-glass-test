import React, { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { baseUrl } from "../../apis";
import { CountProductOfCard } from '../../components/cart/ManageCart';
import { ContextCart } from '../../components/context/ContextCart';
import BasketComponentItem from "../../components/basketComponents/BasketComponentItem";
import SkeltonBasket from "../../components/CSkeleton/SkeltonBasket";
import { CheckStockProductOnBasket } from './../../apis/payment-api/payment-api';

const Index: NextPage = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [displaySkelton, setDisplaySkelton] = useState<boolean>(false)
    const [selectCart, setSelectCart] = useState<any>(null)
    const [cart, setCart] = useState<any>([]);
    const CtxCard = useContext(ContextCart);

    const checkZeroCard = async (cards: any) => {
        for (let card of cards) {
            for (let i in card.shopCart) {
                if (card.shopCart[i].count == 0) {
                    card.shopCart.splice(i, 1)
                }
            }
        }
        await localStorage.setItem('cart', JSON.stringify(cards))
    }

    const updateCardShop = async (cards: any) => {
        setDisplaySkelton(true)
        for (let card of cards) {
            let new_card_shop: any = []
            for (let product of card.shopCart) {
                try {
                    const res = await CheckStockProductOnBasket(product.variant_id)
                    product.price = res.discount !== 0 ? res.price - (res.price * res.discount / 100) : res.price;
                    if (product.count > parseInt(res.stock)) {
                        product.count = parseInt(res.stock)
                    }
                    new_card_shop.push(product)
                }
                catch (err: any) {

                }
            }
            card.shopCart = new_card_shop ;
            CtxCard.setCardList(cards)
            CtxCard.setCardLength(await CountProductOfCard(cards))
        }
        await setCart(cards)
        setDisplaySkelton(false)
        checkZeroCard(cards)
    }

    useEffect(() => {
        if (localStorage.getItem('cart')) {
            updateCardShop(JSON.parse(String(localStorage.getItem('cart'))))
        }
    }, [])

    return (
        <div className="w-full flex flex-col items-center ">
            {displaySkelton == false && CtxCard.cardLength != 0 &&
                <>
                    <div className="w-full max-w-[1400px]  sm:min-h-[70px] min-h-[40px] flex justify-center items-center text-base md:text-lg text-gr-300">
                        <span>ALL BASKET</span>
                    </div>
                    <div className=" w-full max-w-[1000px] flex flex-col  p-[10px] md:p-[20px] sm:p-[10px]">
                        {cart.map((val: any, indexMAin: any) =>
                            <>
                                {val.shopCart.length > 0 &&
                                    <BasketComponentItem value={val} setSelectCart={setSelectCart} setCart={setCart} />
                                }
                            </>
                        )}

                    </div>
                </>
            }
            {displaySkelton == false && CtxCard.cardLength == 0 &&
                <div className=" w-full max-w-[1000px] min-h-screen flex flex-col justify-center items-center  p-[10px] md:p-[20px] sm:p-[10px]">
                    <img src="/assets/svg/empty-cart.svg" className=" w-[200px]" />
                    <span className=" text-2xl mt-[20px]">Empty cart</span>
                </div>
            }
            {displaySkelton == true &&
                <SkeltonBasket />
            }
        </div>
    )
}

export default Index;
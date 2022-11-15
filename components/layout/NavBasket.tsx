import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { ContextCart } from '../context/ContextCart';
import { DeleteProduct, CountProductOfCard } from '../../components/cart/ManageCart';
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";


const NavBasket = () => {
  const CtCard = React.useContext(ContextCart);

  const deleteProductFromCart = async (product_id: any, shopId: number, variant_id: number) => {
    let new_List = await DeleteProduct(product_id, shopId, variant_id);
    CtCard.setCardList(new_List[0])
    CtCard.setCardLength(new_List[1])

  }


  // کانتکست مربوط به سبد خرید را هر بار اپدیت میکند
  const getData = async () => {
    if (localStorage.getItem('cart')) {
      let cart_string = localStorage.getItem('cart');
      if (typeof cart_string === 'string') {
        var cart = JSON.parse(cart_string);
        CtCard.setCardList(cart)
        CtCard.setCardLength(await CountProductOfCard(cart))
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className=" h-6 lg:h-8 w-10 m-2 flex justify-around items-center cursor-pointer relative group ">
      <Link href='/basket'>
        <a>
          <img className=" h-4 w-4 lg:h-5 lg:w-5 " src='/assets/svg/Bag.png' alt="shopping" />
        </a>
      </Link>
      <Link href='/basket'>
        <a className=" absolute sm:top-0 top-[-4px] sm:right-[-5px] right-[-10px] bg-gr-300 flex rounded-full lg:flex justify-center items-center text-white text-xs w-[15px] h-[15px]">
          {CtCard.cardLength}
        </a>
      </Link>
      {/* <Link href='/cart'><div className="h-4 lg:h-6 w-4 lg:w-6 bg-[#3ea0c0] rounded-full flex justify-center items-center text-white lg:text-sm text-xs ">{cartLength.cartLength.length >0 ?cartLength.cartLength.length : 0}</div></Link> */}
      <div className=" w-52  absolute lg:flex hidden top-[50px] opacity-0 invisible pt-3 transition-all duration-500 z-10 group-hover:top-full group-hover:visible group-hover:opacity-100 ">
        <div className="w-full rounded-md flex flex-col shadow px-2 bg-white">
          {CtCard.cardList.length > 0 ?
            <>
              <div className=" w-full h-14 border-b border-gray-300 pt-3 px-2 flex justify-between items-center bg-white">
                <span>Cart</span>
                <img src='/assets/svg/Bag.png' alt="icon" className=" w-4 h-4" />
              </div>
              {CtCard.cardList.map((cart: any) =>
                <>
                  {cart.shopCart.map((item: any) =>
                    <div key={item.glass_id} className=" w-full  py-1 flex items-center justify-between bg-white border-b">
                      <Link href={`${item.uri}`} >
                        <img className=" w-14  rounded" src={`${item.image}`} alt="product" />
                      </Link>
                      <div className="  h-16 flex flex-col justify-center px-2">
                        <span className=" text-xs font-semibold">{item.title}</span>
                        {checkPermission(PricePermissions.view) &&
                          <span className=" text-xs">{item.price} $</span>
                        }
                      </div>
                      <div className="text-sm"> X {item.count}</div>
                      <div onClick={() => deleteProductFromCart(item.product_parent_id, cart.shop.id, item.variant_id)} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                        <img src="/assets/svg/trash.png" className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </>
              )}
              <div className=" w-full h-16 flex justify-center items-center">
                <Link href='/basket'>
                  <button className=" h-8 text-white px-2 bg-gr-300 cursor-pointer rounded-[30px]">
                    <span className=" text-sm mx-2">View cart</span>
                  </button>
                </Link>
              </div>
            </>
            :
            <div className=" w-full h-20  pt-3 px-2 mb-3 flex flex-col justify-center items-center bg-white">
              <img className=" w-10 h-10 rounded-full" src='/assets/logo/search.png' alt="svg" />
              <span className="text-slate-600 text-sm mt-2" >Cart Epmty</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export default NavBasket;

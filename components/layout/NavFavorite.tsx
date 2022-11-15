import React, { useState, useEffect } from "react";
import { ContextFavorite } from '../context/ContextFavorite';
import { changeFavorite } from '../favorite/ManageFavorite';
import Link from "next/link";

const NavFavorite = () => {

  const CtFav = React.useContext(ContextFavorite);

  const changeFav = (product: any) => {
    let new_List = changeFavorite(product);
    CtFav.setFavorite(new_List)
  }

  // کانتکست مربوط به  علاقه مندی ها را هر بار اپدیت میکند
  useEffect(() => {
    if (localStorage.getItem('favorite')) {
      var favorite = JSON.parse(String(localStorage.getItem('favorite')));
      CtFav.setFavorite(favorite)
    }
  }, [CtFav.favorite.length])


  return (
    <div className=" h-6 lg:h-8 w-10 m-2 flex justify-around items-center cursor-pointer relative group ">
      <img className=" h-5 w-5 lg:h-6 lg:w-6   " src='/assets/svg/heart-emptyH.png' alt="search" />
      <div className="  absolute sm:top-0 top-[-4px] sm:right-[-5px] right-[-10px] bg-gr-300 flex rounded-full lg:flex justify-center items-center text-white text-xs w-[15px] h-[15px]">
        {CtFav.favorite.length > 0 ? CtFav.favorite.length : 0}
      </div>
      <div className=" w-52  absolute flex top-[50px] md:right-[unset] right-[-60px] opacity-0 invisible pt-3 transition-all duration-500 z-10 group-hover:top-full group-hover:visible group-hover:opacity-100 ">
        <div className="w-full rounded-md flex flex-col shadow px-2 bg-white">
          {CtFav.favorite.length > 0 ?
            <>
              <div className=" w-full h-14 border-b border-gray-300 pt-3 px-2 flex justify-between items-center bg-white">
                <span>Favorite</span>
                <img src='/assets/svg/heart-emptyH.png' alt="icon" className="w-4 h-4" />
              </div>
              {CtFav.favorite.map((item: any , index:number) =>
                <div key={index} className=" w-full py-1 flex items-center justify-between bg-white   border-b">
                  <Link href={`${item.uri}`}>
                    <img className=" w-14 rounded" src={`${item.image}`} alt="product" />
                  </Link>
                  <div className="  h-10 flex flex-col justify-center px-2">
                    <Link href={`${item.uri}`}>
                      <span className=" text-xs">{item.title}</span>
                    </Link>
                  </div>
                  <div onClick={() => changeFav(item)} className=" w-7 h-7 rounded-full bg-gr-100 flex justify-center items-center cursor-pointer mr-1 relative group">
                    <img src="/assets/svg/trash.png" className="w-4 h-4" />
                  </div>
                </div>
              )}
            </>
            :
            <div className=" w-full h-20  pt-3 px-2 mb-3 flex flex-col justify-center items-center bg-white">
              <img className=" w-10 h-10 rounded-full" src='/assets/logo/search.png' alt="svg" />
              <span className="text-slate-600 text-sm mt-2" >Favorite Epmty</span>
            </div>
          }
        </div>
      </div>
    </div>
  )
}


export default NavFavorite;

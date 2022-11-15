import React, {useState, useEffect, useContext} from "react";
import {useRouter} from "next/router";
import {ContextCategories} from "../context/ContextCategoris";

const NavSearch = () => {
    const routing = useRouter()
    const [activeSearch, setActiveSearch] = useState<boolean>(false)
    const CtxCategories = useContext(ContextCategories);


    const searchSubmit = async (e: any) => {
        e.preventDefault();
        if(!e.target[0].value) return
        if (e.target[1].value === "products") {
             routing.push({hostname: "/filter", query: {name: e.target[0].value, page: 1}})
        }else if (e.target[1].value === "shops")  routing.push({hostname: "/shops", query: { searchKey: e.target[0].value, page: 1}})
        var formRes :any = document.getElementById("searchHeadResForm")
        formRes.reset();
        setActiveSearch(false)
    }


    return (
        <div className="  h-6 lg:h-8 w-10  m-2 flex lg:hidden justify-center items-center z-50">
            <img onClick={() => {
                setActiveSearch(!activeSearch)
            }} className=" h-4 lg:h-5 w-4 lg:w-6 cursor-pointer" src='/assets/svg/search2.svg' alt="search"/>
            <div
                className={` absolute w-full h-12 bg-white left-0 right-0 transition-all shadow flex items-center justify-center ${activeSearch ? ' bottom-[-45px] opacity-100 visible' : 'bottom-0 opacity-0 invisible'}`}>
                <form id={"searchHeadResForm"} name="search" key={"search"} onSubmit={searchSubmit}
                      className="  w-[90%] h-9 border rounded-[30px] flex items-center overflow-hidden ">
                    <input className={" w-full border-none focus:outline-none px-2"} placeholder={"search for ..."}/>
                    <select className={` w-[110px] h-[30px] px-[3px] rounded-[30px] border-none focus:outline-none text-xs`} placeholder={"Email/Phone"}>
                        <option value="products">Products</option>
                        <option value="shops">Shops</option>
                    </select>
                    <button className=" w-[60px] h-9  flex justify-center items-center ">
                        <img className=" h-4   " src='/assets/svg/search2.svg' alt="search"/>
                    </button>
                </form>
            </div>
        </div>
    )
}


export default NavSearch;

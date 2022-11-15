import React, {useState, useContext} from "react";
import { useRouter } from "next/router";
import { ContextCategories } from "../context/ContextCategoris";

const NavSearch = () => {
    const routing = useRouter()
    const [activeSearch, setActiveSearch] = useState<boolean>(false)
    const CtxCategories = useContext(ContextCategories);


    const searchSubmit = async (e: any) => {
        e.preventDefault();
        if (e.target[1].value === "products") {
            routing.push({hostname: "/filter", query: {name: e.target[0].value, page: 1}})
        }else if (e.target[1].value === "shops")  routing.push({hostname: "/shops", query: { searchKey: e.target[0].value, page: 1}})
        var formRes :any = document.getElementById("searchHeadResForm")
        formRes.reset();
        setActiveSearch(false)
    }


    return (

        <form name="search" key={"search"} onSubmit={searchSubmit}
            className="   w-full h-[40px] bg-white border rounded-[30px] flex items-center overflow-hidden ">
            <input className={" w-full border-none focus:outline-none px-2"} placeholder={"search for ..."} />
            <select className={` w-[110px] h-[30px] px-[3px] border-none rounded-[30px] focus:outline-none text-xs`} placeholder={"Email/Phone"}>
                <option value="products">Products</option>
                <option value="shops">Shops</option>
            </select>
            <button className=" w-[60px] h-9  flex justify-center items-center ">
                <img className=" h-4   " src='/assets/svg/search.svg' alt="search" />
            </button>
        </form>
    )
}


export default NavSearch;

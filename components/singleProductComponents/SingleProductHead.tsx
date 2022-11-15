
import Link from "next/link";
import React, { useEffect, useState } from "react";
import RatingComponent from "../widgets/Rating.component";



interface IProductColor {
    shopLogo: string,
    shopName: string,
    review: number,
    setIsChatVis: CallableFunction,
    isChatVis: boolean,
    slug: string,
    item: any
}

const SingleProductHead: React.FunctionComponent<IProductColor> = ({ slug, shopLogo, shopName, review, isChatVis, setIsChatVis, item }) => {
    const [role, setRole] = useState<any>(null)
    function backPage() {
        history.back()
    }

    useEffect(() => {
        const role = localStorage.getItem("role")
        role && setRole(role)
    }, [])

    return (
        <div className=" w-full flex sm:flex-row flex-col sm:pl-[30px] py-0  ">
            <div className=" w-full sm:w-8/12 justify-around sm:justify-start   flex items-center">
                <div onClick={() => { history.back() }} className=" w-[30px] h-[30px] rounded-full bg-gray-100 mr-4 md:flex hidden justify-center items-center cursor-pointer">
                    <img src='/assets/svg/leftBigArrow.svg' alt="icon" className="w-[15px] mr-[3px]" />
                </div>
                <Link href={`/s/${slug}`}>
                    <a>
                        <img src={`${shopLogo ? shopLogo : "/assets/media/shop.jpg"}`} alt="logo" className=" w-[50px] h-[50px] rounded-full" />
                    </a>
                </Link>
                <div className=" flex flex-col mx-[0] sm:mx-[25px]">
                    <h3>{shopName ? shopName : "Store Name"}</h3>
                    <RatingComponent rateNumber={review} />
                </div>
                <div onClick={() => setIsChatVis(!isChatVis)} className=" cursor-pointer flex items-center ">
                    <img src='/assets/svg/comment.svg' alt="svg" className=" w-[25px]" />
                    <span className=" text-sm text-gr-300 ml-[5px]"> Ask a question</span>
                </div>
            </div>
            <div className=" w-full sm:w-5/12 h-[70px] flex items-center justify-end ">
                <div className=" px-[13px] h-[35px] rounded-[30px] flex items-center justify-center bg-[#E5E5E5]">
                    <img src='/assets/svg/gallery.svg' alt="svg" className=" w-[20px] mr-[7px]" />
                    <span className=" text-sm">Image</span>
                </div>
                <Link href={`/360/${item.glass_id}`}>
                    <a target="_blank" rel="noopener noreferrer"
                        className=" px-[13px] h-[35px] ml-[10px] cursor-pointer rounded-[30px] bg-gr-300 text-white flex items-center justify-center transition-all duration-300">
                        <img src='/assets/svg/glassWhite.png' alt="svg" className=" w-[20px] mr-[7px]" />
                        <span className=" text-sm">View 360</span>
                    </a>
                </Link>
                {/* {role === "1" &&
                    <a href={`https://my.optics4less.com/panel/product/duplicate/${item.id}`} target={"_blank"} rel="noreferrer" title="Copy Product" className=" px-[8px] h-[35px] ml-[10px] rounded-[30px] flex items-center justify-center cursor-pointer bg-gr-300">
                        <svg x="0px" y="0px" viewBox="0 0 210.107 210.107"
                            className="fill-white w-[20px]">
                            <use xlinkHref="/assets/svg/copy.svg#copy" />
                        </svg>
                    </a>
                } */}

            </div>
        </div>

    )
}

export default SingleProductHead
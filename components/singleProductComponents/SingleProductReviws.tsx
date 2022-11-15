import React, { useState } from "react";
import { MetaModel } from "../../types/models/pagining.types";
import RatingComponent from "../widgets/Rating.component";




interface ISingleProductReviews {
    comments: any[],
    displaySkelton: boolean,
    setPageState: CallableFunction,
    pageState: number,
    metaPage?: MetaModel,
    getNextPage: CallableFunction,
    openCollapsReview: number,
    setOpenCollapsReview: CallableFunction
}


const SingleProductReviews: React.FunctionComponent<ISingleProductReviews> = ({ comments, setOpenCollapsReview, openCollapsReview, metaPage, pageState, setPageState, getNextPage }) => {

    const [maxHeightPx, setMaxHeightPx] = useState<number>(0);

    const changeOpenCollaps = (id: number) => {
        if (id == openCollapsReview) {
            setOpenCollapsReview(0)
            // setMaxHeightPx(0)
        }
        else {
            const ele = document.getElementById(`detail-collaps-${id}`);
            if (ele) {
                setMaxHeightPx(ele.scrollHeight + 50)
            }
            setOpenCollapsReview(id)
        }
    }


    return (
        <div id="review-box" className=" w-full  border-b border-t  mb-[10px] flex flex-col overflow-hidden px-4">
            <div onClick={() => changeOpenCollaps(1)} className="w-full h-[70px] flex items-center cursor-pointer pl-[10px] ">
                <span>{comments.length} reviews</span>
                <img src='/assets/svg/arrow-right.svg' alt="svg" className={` transition-all w-[6px] ml-[30px] ${openCollapsReview === 1 ? 'rotate-90' : 'rotate-0'}`} />
            </div>

            <div id={`review-collaps-${1}`} className={` transition-all   flex flex-col ${openCollapsReview === 1 ? `px-[10px] pb-[10px] max-h-[${maxHeightPx}]` : `max-h-0`}`}>
                {comments.map((item: any, index: any) =>
                    <div key={index} className="w-full flex-col mb-[15px]">
                        <div className="h-[30px] flex items-center ">
                            <span className=" font-semibold mr-4">{item.name}</span>
                            <RatingComponent rateNumber={item.rate} />
                        </div>
                        <span className=" text-sm text-slate-600 mt-[6px]">{item.content}</span>
                    </div>
                )}
            </div>
            {metaPage?.current_page === metaPage?.last_page ? "" :
                <div onClick={()=>{getNextPage(pageState+1)}} className=" flex w-full justify-center items-center">
                    <button className=" text-sm p-2 px-8 my-10 rounded-lg bg-gray-100 cursor-pointer">More Comments</button>
                </div>
            }

        </div>

    )
}

export default SingleProductReviews
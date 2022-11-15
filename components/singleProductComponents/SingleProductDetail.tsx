import React, { useState, useEffect, useContext } from "react";
import CSkeleton from "../CSkeleton/CSkeleton";
import RatingComponent from "../widgets/Rating.component";
// import SingleProductSlider from "./SingleProductSlider";
import { useRouter } from "next/router";
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { changeFavorite } from "../favorite/ManageFavorite";
import { ContextCart } from '../context/ContextCart';
import CardCounterWithChild from '../../components/cart/CardCounterWithChild';
import dynamic from "next/dynamic";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";

const SingleProductSlider: any = dynamic(() => import('./SingleProductSlider'), {
    ssr: false
})


interface ISingleProductDetail {
    item: any,
    setSelectedChild: CallableFunction,
    selectedChild: number,
    displaySkelton: boolean,
    setOpenCollapsReview: CallableFunction
}



const SingleProductDetail: React.FunctionComponent<ISingleProductDetail> = ({ setOpenCollapsReview, item, setSelectedChild, selectedChild, displaySkelton }) => {
    const router = useRouter()
    const [openCollaps, setOpenCollaps] = useState<number>(0)
    const [selectedFrame, setSelectedFrame] = useState<number>(0)
    const [maxHeightPx, setMaxHeightPx] = useState<number>(0);
    const [activeHeart, setActiveHeart] = useState<boolean>(false)
    const [roleType, setRoleType] = useState<any>(0)
    const CtxFav = useContext(ContextFavorite);


    const changeOpenCollaps = (id: number) => {
        if (id == openCollaps) {
            setOpenCollaps(0)
            // setMaxHeightPx(0)
        }
        else {
            const ele = document.getElementById(`detail-collaps-${id}`);
            if (ele) {
                setMaxHeightPx(ele.scrollHeight + 50)
            }
            setOpenCollaps(id)
        }
    }

    const AddProductToFavorite = (product: any) => {
        CtxFav.setFavorite(changeFavorite(product));
        setActiveHeart(!activeHeart)
    }

    const checkHeart = () => {
        if (CtxFav.favorite.length > 0) {
            for (let items of CtxFav.favorite) {
                if (items.id == item.id) {

                    setActiveHeart(true);
                    return;
                }
            }
        }
        setActiveHeart(false)
    }

    useEffect(() => {
        if (item) {
            checkHeart()
        }
    }, [item, CtxFav.favorite])


    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRoleType(localStorage.getItem('role'))
        }
    }, [])

    
    useEffect(() => {
        if (item.children) {            
            setSelectedChild(Object.keys(item.children)[0])
        }

    }, [item])


    return (
        <div className=" w-full flex sm:flex-row flex-col  mb-[20px] ">
            <div className=" w-full sm:w-8/12 justify-center sm:justify-start rounded-lg mx-4 overflow-hidden ">
                {!displaySkelton ?
                    <SingleProductSlider
                        topImg={item.children[selectedChild]?.[selectedFrame]?.top}
                        rightImg={item.children[selectedChild]?.[selectedFrame]?.right}
                        leftImg={item.children[selectedChild]?.[selectedFrame]?.left}
                        delivery_day={item.delivery_day}
                    />
                    :
                    <div className=" w-full overflow-hidden h-[400px]">
                        <CSkeleton />
                    </div>
                }
            </div>
            <div className=" w-full sm:w-5/12  flex flex-col p-[10px] pl-[20px]">

                <div className=" flex item-center justify-between">
                    {!displaySkelton ?
                        <h1>{item.brand?.name} {item.title}</h1>
                        : <div className=" w-[100px] h-[30px] rounded-[15px]"><CSkeleton /></div>}
                    {activeHeart == true ?
                        <img onClick={() => AddProductToFavorite(item)} className="  h-7 cursor-pointer" src='/assets/logo/heart-full.png' alt="like" />
                        :
                        <img onClick={() => AddProductToFavorite(item)} className="  h-7 cursor-pointer " src='/assets/logo/heart-empty.png' alt="like" />
                    }
                </div>

                <div className=" flex text-justify text-sm mt-[10px] text-gray-600">
                    {!displaySkelton ?
                        <span>{item.description}</span>
                        : <div className=" w-[190px] h-[90px] rounded-[15px]"><CSkeleton /></div>}
                </div>

                <div className=" w-full flex justify-between mt-[20px]">
                    <span className=" font-bold text-sm">Rates :</span>
                    <a onClick={() => setOpenCollapsReview(1)} href="#review-box" className=" text-xs text-gr-300 cursor-pointer">Reading Reviews</a>
                </div>
                <RatingComponent rateNumber={item ? item.review : 0} />

                <div className=" flex mt-[20px]">
                    <span>Colors :</span>
                </div>

                <div className=" flex mt-[4px] justify-between">
                    <div className=" flex items-center">
                        {item.children && Object.entries(item.children).map((t: any, k) =>
                            <img onClick={() => {
                                setSelectedChild(t[0]);
                                setSelectedFrame(0)
                            }} key={k} src={t[1][0].color.image} className={` w-[30px] h-[30px] rounded-full mr-1 cursor-pointer border-[3px] ${selectedChild == t[0] ? '  border-gr-300' : 'border-white'}`} />
                        )}
                    </div>
                    {!displaySkelton &&
                        <div className=" flex flex-col">
                            {item?.children?.[selectedChild]?.[selectedFrame].stock != 0 &&
                                <>
                                    {checkPermission(PricePermissions.view) &&
                                        <>
                                            {item.children[selectedChild]?.[selectedFrame].price !== null ?
                                                <>
                                                    {item.children[selectedChild]?.[selectedFrame].discount != 0 ?
                                                        <>
                                                            <span className=" text-xs font-bold line-through">AED {item.children[selectedChild]?.[selectedFrame].price}</span>
                                                            <span className="font-bold sm:text-base text-sm ">AED {item.children[selectedChild]?.[selectedFrame].price - (item.children[selectedChild]?.[selectedFrame].price * item.children[selectedChild]?.[selectedFrame].discount / 100)}</span>
                                                        </>
                                                        :
                                                        <span className="font-bold sm:text-base text-sm ">AED {item.children[selectedChild]?.[selectedFrame].price}</span>
                                                    }
                                                </>
                                                :
                                                <>
                                                    <span className="font-bold sm:text-base text-sm ">AED {item.children[selectedChild]?.[selectedFrame].price}</span>
                                                </>
                                            }
                                        </>
                                    }
                                </>

                            }
                        </div>
                    }
                </div>

                <div className={`w-full flex items-center  mt-2`}>
                    <>
                        {selectedChild && item.children[selectedChild]?.map((frame: any, indexFrame: number) =>
                            <div onClick={() => { setSelectedFrame(indexFrame) }} key={indexFrame} className={`w-[25px] cursor-pointer h-[25px] flex justify-center items-center border rounded  text-sm ${indexFrame != 0 ? 'mx-1' : 'mr-1'} ${selectedFrame == indexFrame ? 'border-gr-300 text-gr-300' : 'text-gray-500 border-gray-500'}`} >{frame.frame}</div>
                        )}
                    </>
                </div>


                <div className={`w-full  overflow-hidden bg-gr-100 mt-[20px] rounded-[30px] flex flex-col px-[10px] transition-all  `}>
                    <div onClick={() => changeOpenCollaps(1)} className="w-full h-[30px] flex justify-between items-center px-[10px] cursor-pointer">
                        <span className="text-gr-300 text-sm">Product Detail</span>
                        <img src='/assets/svg/arrow-right.svg' alt="svg" className={` transition-all w-2 ${openCollaps == 1 ? 'rotate-90' : 'rotate-0'}`} />
                    </div>
                    <div id={`detail-collaps-${1}`} className={` transition-all  flex flex-col ${openCollaps == 1 ? `px-[10px] pb-[10px] max-h-[${maxHeightPx}]` : `max-h-0`}`}>
                        {!displaySkelton ?
                            <>
                                {Object.entries(item.feathers).map((itemIn: any, indexIn) =>
                                    <>
                                        {item.category == 'lens' ?
                                            <div key={indexIn} className="flex text-sm">
                                                <span className=" min-w-fit">{itemIn[0]} :</span>
                                                <span className=" text-gr-300 ml-[5px]">{itemIn[1] ? itemIn[1] : "----"}</span>
                                            </div>
                                            :
                                            <>
                                                {itemIn[0] != 'Contact Lens Type' &&
                                                    <div key={indexIn} className="flex text-sm">
                                                        <span className=" min-w-fit">{itemIn[0]} :</span>
                                                        <span className=" text-gr-300 ml-[5px]">{itemIn[1] ? itemIn[1] : "----"}</span>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </>
                                )}

                                <div className="flex text-sm">
                                    <span className=" min-w-fit">Lens Color :</span>
                                    {item.children[selectedChild]?.[selectedFrame].lens_color &&
                                        <span className=" text-gr-300 ml-[5px]">{item.children[selectedChild]?.[selectedFrame].lens_color}</span>
                                    }
                                </div>

                                <div className="flex text-sm">
                                    <span className=" min-w-fit">Lens Type :</span>
                                    {item.children[selectedChild]?.lens_type &&
                                        <span className=" text-gr-300 ml-[5px]">{item.children[selectedChild]?.lens_type}</span>
                                    }
                                </div>

                                {roleType == '1' &&
                                    <div className="flex text-sm">
                                        <span className=" min-w-fit">Color code :</span>
                                        {item.children[selectedChild]?.color_code &&
                                            <span className=" text-gr-300 ml-[5px]">{item.children[selectedChild]?.color_code}</span>
                                        }
                                    </div>
                                }

                            </>
                            :
                            <></>
                        }
                    </div>
                </div>

                <div className={`w-full  overflow-hidden bg-gr-100 mt-[20px] rounded-[30px] flex flex-col px-[10px] transition-all  `}>
                    <div onClick={() => changeOpenCollaps(2)} className="w-full h-[30px] flex justify-between items-center px-[10px] cursor-pointer">
                        <span className="text-gr-300 text-sm">Order Detail</span>
                        <img src='/assets/svg/arrow-right.svg' alt="svg" className={` transition-all w-2 ${openCollaps == 2 ? 'rotate-90' : 'rotate-0'}`} />
                    </div>
                    <div id={`detail-collaps-${2}`} className={` transition-all  flex flex-col ${openCollaps == 2 ? `px-[10px] pb-[10px] max-h-[${maxHeightPx}]` : `max-h-0`}`}>
                        {item.shop?.order && item.shop.order.map((orderItem: string, indexOrder: number) =>
                            <div key={indexOrder} className="flex text-sm">
                                <span className=" ">{orderItem}</span>
                            </div>
                        )}
                    </div>
                </div>

                {!displaySkelton &&
                    <>
                        {item.children[selectedChild][selectedFrame].stock != 0 ?
                            <CardCounterWithChild product={item} selectedChild={selectedChild} selectedFrame={selectedFrame} goToBasket={true} />
                            :
                            <div className=" flex justify-center items-center mt-[20px] h-[40px] rounded-[30px] w-full bg-gray-300 text-white cursor-not-allowed">
                                No Stock
                            </div>
                        }
                    </>
                } 
                {item?.children?.[selectedChild]?.[selectedFrame]?.text_stock != null &&
                    <span className="mt-2 text-center text-sm">{item.children[selectedChild][selectedFrame].text_stock}</span>
                }

            </div>

        </div>

    )
}

export default SingleProductDetail
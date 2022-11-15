import React, { useContext, useEffect, useState } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { SingleShopCartProps } from "../../types/type-props/SingleShopCartProps";
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { changeFavorite } from "../favorite/ManageFavorite";
import CImage from "../CImage";
import RatingComponent from "../widgets/Rating.component";
import CardCounterWithChild from "../cart/CardCounterWithChild";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";

const SingleShopCartAsShop = ({ title, sideView, rate, product }: SingleShopCartProps) => {
    const [selectedChild, setSelectedChild] = useState<any>(null)
    const [selectedFrame, setSelectedFrame] = useState<number>(0)
    const CtxFav = useContext(ContextFavorite);
    const [activeHeart, setActiveHeart] = useState<boolean>(false)

    const handelChangeVarity = (child: any, index: any) => {
        setSelectedChild(child[0]);
        setSelectedFrame(index); 
    }


    const AddProductToFavorite = (product: any) => {
        CtxFav.setFavorite(changeFavorite(product));
        setActiveHeart(!activeHeart)
    }

    const checkHeart = () => {
        if (CtxFav.favorite.length > 0) {
            for (let item of CtxFav.favorite) {
                if (item.id == product.id) {
                    setActiveHeart(true);
                    return;
                }
            }
        }
        setActiveHeart(false)
    }

    useEffect(() => {
        if (product) {
            checkHeart()
        }
    }, [product, CtxFav.favorite])

    useEffect(() => {
        if (product) {
            setSelectedChild(Object.keys(product.children)[0])
        }

    }, [product])

    return (
        <div key={product.id} className=" w-full md:w-[calc(33%-2rem)] lg:w-[calc(25%-2rem)] mx-4 p-[5px] mb-[10px] cursor-pointer flex flex-col">
            <div className="">
                <Link href={`${product.uri}`}>
                    <a className=" w-full relative ">
                        {product?.children[selectedChild] ?
                            <>
                                {sideView === 'top' &&
                                    <CImage src={product.children[selectedChild][selectedFrame].top} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                                {sideView === 'left' &&
                                    <CImage src={product.children[selectedChild][selectedFrame].right} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                                {sideView === 'right' &&
                                    <CImage src={product.children[selectedChild][selectedFrame].left} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                            </>
                            :
                            <img src="/assets/media/placeholder.png" className=" w-full h-full rounded-[10px] min-h-[140px] " />
                        }
                    </a>
                </Link>
                <div className=" w-full  flex flex-col">

                    <div className="w-full min-h-[40px] px-[10px] flex items-center justify-between">
                        <h3 className=" text-lg">{product.title}</h3>
                        {product.id && activeHeart == true ?
                            <img onClick={() => AddProductToFavorite(product)} className="h-5 cursor-pointer" src='/assets/logo/heart-full.png' alt="like" />
                            :
                            <img onClick={() => AddProductToFavorite(product)} className="h-5  cursor-pointer" src='/assets/logo/heart-empty.png' alt="like" />
                        }
                    </div>
                    <div className="w-full px-[10px] flex flex-col">
                        <div className=" text-xs sm:flex hidden">{product && product.description}</div>
                    </div>
                    <div className="flex justify-between items-end">
                        <RatingComponent rateNumber={rate} />
                    </div>
                    <div className=" w-full h-[133px] flex flex-col mt-2">
                        <div className=" w-full h-[30px]  flex items-center justify-between">
                            <div className='w-[25px] h-[25px]' />
                            <div className="min-w-[20px] h-[20px] px-1   flex justify-center items-center text-[11px] text-gray-500" >color code</div>
                            <div className="min-w-[20px] h-[20px]   flex justify-center items-center text-[11px] text-gray-500">frame size</div>
                            <span className='w-[47px]'></span>
                            <span className='w-[100px]'></span>
                        </div>
                        {product.children && Object.entries(product.children).map((child: any, index) =>
                            <>
                                {child[1]?.length > 0 && child[1]?.map((item: any, indexObj: any) =>
                                    <div key={indexObj} className=" w-full h-[30px]  flex items-center justify-between">
                                        <img src={item?.color?.image} onClick={() => handelChangeVarity(child, indexObj)} className={`  w-[25px] h-[25px] border rounded-full mr-1 cursor-pointer border-[3px] ${(selectedChild == child[0] && selectedFrame == indexObj) ? '  border-gr-300' : 'border-white'}`} />
                                        <div className="min-w-[20px] h-[20px] px-1 border rounded flex justify-center items-center text-[11px] text-gray-500" >{item.color_code}</div>
                                        <div className="w-[20px] h-[20px] border rounded flex justify-center items-center text-[11px] text-gray-500">{item.frame}</div>
                                        <div className=" flex items-center text-center ">
                                            {checkPermission(PricePermissions.view) &&
                                                <>
                                                    {item.price != null ?
                                                        <>
                                                            {item.discount !== 0 ?
                                                                <>
                                                                    <span className="sm:text-xs text-xs font-bold line-through text-gray-400 mr-1">AED {item.price}</span>
                                                                    <span className="font-bold sm:text-sm text-sm ">AED {item.price - (item.price * item.discount / 100)}</span>
                                                                </>
                                                                :
                                                                <span className="font-bold sm:text-sm text-sm ">AED {item.price - (item.price * item.discount / 100)}</span>
                                                            }
                                                        </>
                                                        :
                                                        <span className="font-bold sm:text-sm text-sm ">AED {item.price}</span>
                                                    }
                                                </>
                                            }
                                        </div>
                                        <div>
                                            <>
                                                {child[1].stock != 0 ?
                                                    <div className=" w-[100px] h-[30px] py-[1px] flex items-center">
                                                        <CardCounterWithChild product={product} selectedChild={child[0]} selectedFrame={indexObj} asShop={true} goToBasket={false} />
                                                    </div>
                                                    :
                                                    <div className=" flex justify-center items-center mb-[1px] w-[100px] h-[25px] rounded-[30px]  bg-gray-300 text-white text-[11px] cursor-not-allowed">
                                                        No Stock
                                                    </div>
                                                }
                                            </>

                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleShopCartAsShop;
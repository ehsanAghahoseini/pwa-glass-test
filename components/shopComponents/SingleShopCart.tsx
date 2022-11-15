import React, { useContext, useEffect, useState } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { SingleShopCartProps } from "../../types/type-props/SingleShopCartProps";
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { changeFavorite } from "../favorite/ManageFavorite";
import CImage from "../CImage";
import RatingComponent from "../widgets/Rating.component";


const SingleShopCart = ({ title, slug, sideView, rate, product }: SingleShopCartProps) => {
    const [selectedChild, setSelectedChild] = useState<number>(0)
    const [activeHeart, setActiveHeart] = useState<boolean>(false)
    const CtxFav = useContext(ContextFavorite);

    const AddProductToFavorite = (product: any) => {
        if(product.child){
            product.children = [product.child] ;
            product.title = product.name
        }
        CtxFav.setFavorite(changeFavorite(product));
        setActiveHeart(!activeHeart)
    }

    const checkHeart = () => {
        if (CtxFav.favorite.length > 0) {
            for (let item of CtxFav.favorite) {
                if (item.id == product.id) {
                    console.log('injaaaaaaaaaaaaS');
                    
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

    return (
        <div key={slug} className=" w-full md:w-[calc(33%-2rem)] lg:w-[calc(25%-2rem)] mx-4 p-[5px] mb-[10px] cursor-pointer flex flex-col">
            <div className="">
                <Link key={slug} href={`${product.uri}`}>
                    <a className=" w-full relative ">
                        {product ?
                            <>
                                {sideView === 'top' &&
                                    <CImage src={product.child.top} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                                {sideView === 'left' &&
                                    <CImage src={product.child.right} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                                {sideView === 'right' &&
                                    <CImage src={product.child.left} alt="card" placeholder_height="200px" className="w-full rounded-[10px] min-h-[140px] " />
                                }
                            </>
                            :
                            <img src="/assets/media/placeholder.png" className=" w-full h-full rounded-[10px] min-h-[140px]  " />
                        }

                    </a>
                </Link>
                <div className=" w-full  flex flex-col">

                    <div className="w-full min-h-[40px] px-[10px] flex items-center justify-between">
                        <h3 className=" text-lg">{title}</h3>
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
                        <div className=" flex flex-col ">
                            {product.child.price != null ?
                                <>
                                    {product.child.discount !== 0 ?
                                        <>
                                            <span className="sm:text-xs text-xs font-bold line-through text-gray-400">AED {product.child.price}</span>
                                            <span className="font-bold sm:text-sm text-sm ">AED {product.child.price - (product.child.price * product.child.discount / 100)}</span>
                                        </>
                                        :
                                        <span className="font-bold sm:text-sm text-sm ">AED {product.child.price - (product.child.price * product.child.discount / 100)}</span>
                                    }
                                </>
                                :
                                <>
                                    <span className="font-bold sm:text-sm text-sm ">AED {product.child.price}</span>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleShopCart;
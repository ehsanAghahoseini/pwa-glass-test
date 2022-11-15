import React, { useState, useContext, useEffect } from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { FilterCartProps } from "../../types/type-props/FilterCartProps";
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { changeFavorite } from "../favorite/ManageFavorite";
import { useRouter } from "next/router";
import RatingComponent from "../widgets/Rating.component";

const SingleProductCart = ({ title, slug, image_top, image_left, image_right, sideView, item, uri, children, id, isTargetBlank }: FilterCartProps) => {
    const router = useRouter()
    const [activeHeart, setActiveHeart] = useState<boolean>(false)
    const CtxFav = useContext(ContextFavorite);


    const AddProductToFavorite = () => {
        let product = {
            'title': title,
            'id': id,
            'children': [{ 'top': image_top }],
            'uri': uri
        }
        CtxFav.setFavorite(changeFavorite(product));
        setActiveHeart(!activeHeart)
    }

    const checkHeart = () => {
        if (CtxFav.favorite.length > 0) {
            for (let item of CtxFav.favorite) {
                if (item.id == id) {
                    setActiveHeart(true);
                    return;
                }
            }
        }
        setActiveHeart(false)
    }

    useEffect(() => {
        if (id) {
            checkHeart()
        }
    }, [CtxFav.favorite, id])

    return (
        <div className=" w-full md:w-3/12 sm:w-4/12  p-[5px] mb-[10px]">
            <div className=" w-full flex flex-col">
                <div className=" w-full  bg-gray-300">

                    {sideView == 'front' &&
                        <Link href={`${item.uri}`}>
                            {isTargetBlank ?
                                <a target={"_blank"} rel="noreferrer">
                                    <img src={image_top} alt="product" className=" w-full" />
                                </a> :
                                <img src={image_top} alt="product" className=" w-full" />
                            }
                        </Link>
                    }
                    {sideView == 'side' &&
                        <Link href={`${item.uri}`}>
                            {isTargetBlank ?
                                <a target={"_blank"} rel="noreferrer">
                                    <img src={image_left} alt="product" className=" w-full" />
                                </a> :
                                <img src={image_left} alt="product" className=" w-full" />
                            }
                        </Link>
                    }
                    {sideView == 'side2' &&
                        <Link href={`${item.uri}`}>
                            {isTargetBlank ?
                                <a target={"_blank"} rel="noreferrer">
                                    <img src={image_right} alt="product" className=" w-full" />
                                </a> :
                                <img src={image_right} alt="product" className=" w-full" />
                            }
                        </Link>
                    }
                </div>
                <div className=" w-full  flex flex-col">
                    <div className="w-full min-h-[40px] px-[10px] flex items-center justify-between">
                        <Link href={`${item.uri}`}>
                            {isTargetBlank ?
                                <a target={"_blank"} rel="noreferrer">
                                    <h3 className=" text-lg">{title}</h3>
                                </a> :
                                <h3 className=" text-lg">{title}</h3>
                            }
                        </Link>
                        {activeHeart == true ?
                            <img onClick={() => AddProductToFavorite()} className="  h-5   " src='/assets/logo/heart-full.png' alt="like" />
                            :
                            <img onClick={() => AddProductToFavorite()} className="  h-5   " src='/assets/logo/heart-empty.png' alt="like" />
                        }
                    </div>
                    <div className="w-full px-[10px] flex flex-col mb-2">
                        <span className=" text-xs">{item.description}</span>
                    </div>
                    <RatingComponent rateNumber={item.review} />
                </div>
            </div>
        </div>
    )
}

export default SingleProductCart;
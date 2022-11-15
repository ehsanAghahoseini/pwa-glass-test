import React, { useEffect, useState, useContext } from "react";
import Link from "next/link"
import { ListProductCartProps } from "../../types/type-props/ListProductCartProps";
import CImage from "../CImage";
import { ContextFavorite } from '../../components/context/ContextFavorite';
import { changeFavorite } from "../favorite/ManageFavorite";
import RatingComponent from "../widgets/Rating.component";
import ProductColor from "../widgets/ProductColor.component";
import CardCounterWithChild from "../cart/CardCounterWithChild";
import { checkPermission } from "../Permissions/checkPermissions";
import { PricePermissions } from "../Permissions/listPermissions";

export const ListProductCart = ({ product, sideView, glass }: any) => {
    const [selectedChild, setSelectedChild] = useState<any>(null)
    const [selectedFrame, setSelectedFrame] = useState<number>(0)
    const [activeHeart, setActiveHeart] = useState<boolean>(false)
    const CtxFav = useContext(ContextFavorite);

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
        checkHeart()
    }, [CtxFav.favorite])

    useEffect(() => {
        if (product) {
            setSelectedChild(Object.keys(product.children)[0])
        }
    }, [product])


    return (
        <a className="w-full lg:w-[calc(50%-1rem)] mx-2 p-[5px] mb-[10px] flex sm:flex-row flex-col relative ">
            <Link key={product.id} href={`${product.uri}`}>
                <a className=" w-full sm:w-6/12 relative">
                    {product?.children[selectedChild] ?
                        <>
                            {sideView === 'front' &&
                                <CImage src={product.children[selectedChild][selectedFrame].top} alt="card" placeholder_height="200px" className="w-full rounded-[10px] " />
                            }
                            {sideView === 'right' &&
                                <CImage src={product.children[selectedChild][selectedFrame].right} alt="card" placeholder_height="200px" className="w-full rounded-[10px] " />
                            }
                            {sideView === 'left' &&
                                <CImage src={product.children[selectedChild][selectedFrame].left} alt="card" placeholder_height="200px" className="w-full rounded-[10px] " />
                            }
                        </>
                        :
                        <img src="/assets/media/placeholder.png" className=" w-full h-full rounded-[10px]  " />
                    }
                </a>
            </Link>
            <div className=" w-full sm:w-6/12 flex sm:flex-row flex-col items-center ">
                <div className="  w-full sm:w-6/12 h-fit flex flex-row sm:flex-col sm:items-start items-center justify-between sm:justify-start sm:mt-0 mt-[7px] pl-[10px] overflow-hidden ">
                    <div className=" flex sm:flex-col flex-row sm:items-start items-center justify-center">
                        <Link href={`/s/${product.shop.slug}`}>
                            <a>
                                <img src={product.shop.logo} alt="logo" className=" w-[50px] h-[50px] sm:w-[50px] sm:h-[50px] mr-4 rounded-full my-2" />
                            </a>
                        </Link>
                        <h3 className=" sm:text-base text-[11px] my-[4px]">{product.shop.name}</h3>
                        <div className=" sm:flex hidden justify-center items-center">
                            {product.children && Object.entries(product.children).map((child: any, indexCild) =>
                                <>
                                    {child[1]?.length > 0 && child[1].map((frame: any, indexStock: number) =>
                                        <ProductColor index={child[0]} item={frame?.color.image} setSelectedColor={setSelectedChild} selectedChild={selectedChild} setSelectedFrame={setSelectedFrame} key={indexStock} />
                                    )}
                                </>)
                            }
                        </div>
                        <div className=" text-xs sm:flex hidden">{product.description}</div>
                    </div>
                    <div className={` sm:flex hidden items-center  mt-2`}>

                        {product.children && Object.entries(product.children).map((child: any, indexCild) =>
                            <>
                                {child[1].length && child[1]?.map((frame: any, indexStock: number) =>
                                    <>
                                        {child[0] == selectedChild &&
                                            <div onClick={() => { setSelectedFrame(indexStock) }} key={indexStock} className={`w-[25px] cursor-pointer h-[25px] flex justify-center items-center border rounded  text-sm ${indexStock != 0 ? 'mx-1' : 'mr-1'} ${selectedFrame == indexStock ? 'border-gr-300 text-gr-300' : 'text-gray-500 border-gray-500'}`} >{frame.frame}</div>
                                        }
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    <div className="flex flex-col items-end mt-2">
                        {activeHeart == true ?
                            <img onClick={() => AddProductToFavorite(product)} className="  w-5 mb-1 flex sm:hidden cursor-pointer" src='/assets/logo/heart-full.png' alt="like" />
                            :
                            <img onClick={() => AddProductToFavorite(product)} className="  w-5 mb-1 flex sm:hidden  cursor-pointer" src='/assets/logo/heart-empty.png' alt="like" />
                        }

                        <RatingComponent rateNumber={product.review} />
                    </div>
                </div>
                <div className=" w-full flex sm:hidden" >
                    <div className="">
                        <div className="flex justify-center items-center">
                            {product.children && Object.entries(product.children).map((child: any, indexCild) =>
                                <>
                                    {child[1]?.length > 0 && child[1].map((frame: any, indexStock: number) =>
                                        <ProductColor index={child[0]} item={frame?.color.image} setSelectedColor={setSelectedChild} selectedChild={selectedChild} setSelectedFrame={setSelectedFrame} key={indexStock} />
                                    )}
                                </>)
                            }
                        </div>
                        <div className="flex items-center mt-2">
                            {product.children && Object.entries(product.children).map((child: any, indexCild) =>
                                <>
                                    {child[1]?.length > 0 && child[1]?.map((frame: any, indexStock: number) =>
                                        <>
                                            {child[0] == selectedChild &&
                                                <div onClick={() => { setSelectedFrame(indexStock) }} key={indexStock} className={`w-[25px] cursor-pointer h-[25px] flex justify-center items-center border rounded  text-sm ${indexStock != 0 ? 'mx-1' : 'mr-1'} ${selectedFrame == indexStock ? 'border-gr-300 text-gr-300' : 'text-gray-500 border-gray-500'}`} >{frame.frame}</div>
                                            }
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className=" w-full sm:w-6/12 h-fit flex flex-row sm:flex-col sm:items-center items-center justify-between sm:justify-center sm:mt-0 mt-[12px] pl-[10px] overflow-hidden ">
                    <div className="flex flex-col">
                        {checkPermission(PricePermissions.view) &&
                            <>
                                {(product.children?.[selectedChild]?.[selectedFrame].price != null) ?
                                    <>
                                        {product.children[selectedChild][selectedFrame].discount != "0" ?
                                            <>
                                                <span className="sm:text-sm text-xs font-bold line-through">AED {product.children?.[selectedChild]?.[selectedFrame].price}</span>
                                                <span className="font-bold sm:text-base text-sm ">AED {product.children?.[selectedChild]?.[selectedFrame].price - (product.children?.[selectedChild]?.[selectedFrame].price * product.children?.[selectedChild]?.[selectedFrame].discount / 100)}</span>
                                            </>
                                            :
                                            <span className="font-bold sm:text-base text-sm ">AED {product.children?.[selectedChild]?.[selectedFrame].price}</span>
                                        }
                                    </>
                                    :
                                    <span className="font-bold sm:text-base text-sm ">AED {product.children?.[selectedChild]?.[selectedFrame].price}</span>
                                }
                            </>
                        }
                    </div>
                    <div className="w-full max-w-[150px]">
                        {product && selectedChild != null &&
                            <>
                                {product.children?.[selectedChild]?.[selectedFrame].stock != 0 ?
                                    <CardCounterWithChild product={product} selectedChild={selectedChild} selectedFrame={selectedFrame} goToBasket={true} />
                                    :
                                    <div className=" flex justify-center items-center mt-[20px] h-[40px] rounded-[30px] w-full bg-gray-300 text-white cursor-not-allowed">
                                        No Stock
                                    </div>
                                }
                            </>
                        }
                    </div>
                    {/* <button className=" w-full max-w-[150px] h-[30px] rounded-[30px] bg-gr-300 text-white flex justify-center items-center text-sm">Add to card</button> */}
                </div>
            </div>
            {activeHeart == true ?
                <img onClick={() => AddProductToFavorite(product)} className="  h-5 absolute top-[5px] right-[5px] sm:flex hidden  cursor-pointer" src='/assets/logo/heart-full.png' alt="like" />
                :
                <img onClick={() => AddProductToFavorite(product)} className="  h-5 absolute top-[5px] right-[5px] sm:flex hidden  cursor-pointer" src='/assets/logo/heart-empty.png' alt="like" />
            }

        </a >
    )
}
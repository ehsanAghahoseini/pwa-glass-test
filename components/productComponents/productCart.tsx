import React from "react";
import Link from "next/link"
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import { ProductsCartSkeleton } from "../skeletons";
import { json } from "stream/consumers";


export const ProductCartWithContainer = (props: any) => {

    function imagePosition(obj: any) {
        switch (props.postistionState) {
            case "top":
                return obj.top
            case "left":
                return obj.left
            case "right":
                return obj.right
            default:
                return "/assets/media/placeholder.png"
        }
    }

    function changeColor(productTitle: any, childId: any) {
        let lastProductsList = [...props.products];
        let updatedList: any = lastProductsList.map((item: any) => {
            if (item.title === productTitle) {
                let UpdatedChildren: any = item.children.map((child: any) => {
                    if (child.id === childId) return { ...child, choosed: true }
                    else return { ...child, choosed: false }
                })
                return { ...item, children: [...UpdatedChildren] }
            } else {
                return item
            }
        })
        props.setProducts(updatedList)
    }

    // -------------------- this function render the selected child
    function renderIniCart(item: any, index: number) {
        return (
            <div key={item.index} className=" w-full md:w-[calc(33%-1rem)] 2xl:w-[calc(25%-1rem)] md:mx-2">
                {item.children.filter((childItem: any) => {
                    if (childItem.choosed) return childItem
                }).map((childItem: any, index: number) =>
                    <>
                        <Link href={`/product/${item.slug}`}>
                            <a className=" wow_fade_in w-full transition-all duration-150 hover:shadow-md flex flex-col mt-6 mb-4 rounded-md overflow-hidden relative group">
                                <LazyLoadImage
                                    alt={`${imagePosition(childItem?.view)}`}
                                    placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                                    src={`${childItem.view ? `${imagePosition(childItem.view)}`
                                        : "/assets/media/placeholder.png"}`}
                                />
                                {/* <div className="flex justify-between w-full mt-2 px-[2px]">
                                        <p>{item.color}</p>
                                        <div title="add to favorite"
                                            className=" w-[15px] h-[15px] cursor-pointer group mt-1">
                                            <svg x="0px" y="0px" viewBox="0 0 471.701 471.701"
                                                className="hover:fill-ehbi-300 ">
                                                <use xlinkHref="/assets/svg/heart.svg#heartSVG" />
                                            </svg>
                                        </div>
                                    </div> */}
                                <div className="flex justify-between w-full mt-2 px-[8px] pt-2 pb-4">
                                    <p>{item.title}</p>
                                    <div className=" flex flex-col">
                                        {childItem.show_price.discount_AED ? <p>{childItem.show_price.discount_AED}</p> : ""}
                                        <p className={`${childItem.show_price.discount_AED ? "line-through text-xs" : ""}`}>{childItem.show_price.AED}</p>
                                    </div>
                                    <div className=" flex flex-col">
                                        {childItem.show_price.discount_USD ? <p>{childItem.show_price.discount_USD}</p> : ""}
                                        <p className={`${childItem.show_price.discount_USD ? "line-through text-xs" : ""}`}>{childItem.show_price.USD}</p>
                                    </div>
                                </div>

                                {/* <div className=" opacity-0 transition-all duration-700 ease-in-out absolute top-[-8rem] w-full flex justify-center items-center p-8 group-hover:top-0 group-hover:opacity-100 bg-slate-400/[0.2] backdrop-blur-sm cursor-pointer">
                                        <button className=" w-full h-10 text-ehbi-300 rounded  my-8">
                                            Show Product
                                        </button>
                                    </div> */}
                            </a>
                        </Link>
                    </>
                )}

                <div className=" flex justify-center items-center w-full">
                    {item.children.map((child: any) =>
                        <>
                            <img key={child.id} onClick={() => changeColor(item.title, child.id)}
                                className={` cursor-pointer mx-2 rounded-full max-w-[18px] border-[2px] border-white ${child.choosed ? " border-[2px] border-pink-300 " : ""}`}
                                src={`${child.color}`} alt={child.color} />
                        </>
                    )}
                </div>
            </div>
        )
    }


    return (
        <div className=" w-full px-4 flex flex-row py-8 flex-wrap justify-center lg:justify-start">
            {props.isSkeleton ?
                <>{new Array(6).fill(0).map((e, index) =>
                    <ProductsCartSkeleton key={index} />
                )}
                </> :
                <>
                    {props.products.length !== 0 ? props.products.map((item: any, index: number) =>
                        <>
                            {renderIniCart(item, index)}
                        </>
                    ) :
                        <div className="flex justify-center items-center p-10 w-full flex-col">
                            <img className="w-full mb-4 max-w-[50px] " src='/assets/no-res.png' alt="no-res" />
                            <p>No items found</p>
                        </div>
                    }
                </>
            }

        </div>
    )
}

export const ProductCart = (props: any) => {
    return (
        <>
            <Link key={props.key} href={`/product/${props.product.slug}`}>
                <a key={props.key}
                    className=" wow_fade_in w-full lg:w-[250px] flex flex-col mx-4 my-6 rounded-md overflow-hidden relative group h-[235px]">
                    <LazyLoadImage
                        alt={props.product.images[0].url}
                        placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                        src={`${props.product.images?.length > 0 ? `${props.product.images[0].url}` : "/assets/media/placeholder.png"}`}
                    />
                    {/* <div className="flex justify-between w-full mt-2 px-[2px]">
                        <p>{props.product.color}</p>
                        <div title="add to favorite"
                            className=" w-[15px] h-[15px] cursor-pointer group mt-1">
                            <svg x="0px" y="0px" viewBox="0 0 471.701 471.701"
                                className="hover:fill-red-400 ">
                                <use xlinkHref="/assets/svg/heart.svg#heartSVG" />
                            </svg>
                        </div>
                    </div> */}
                    <div className="flex justify-between w-full mt-2 px-[2px]">
                        <p>{props.product.name}</p>
                        <p>{props.product.price} $</p>
                    </div>

                    <div
                        className=" opacity-0 transition-all duration-700 ease-in-out absolute top-[-8rem] w-full flex justify-center items-center p-8 group-hover:top-0 group-hover:opacity-100 bg-slate-400/[0.2] backdrop-blur-sm cursor-pointer">
                        <button className=" w-full h-10 text-ehbi-300 rounded  my-8">
                            Show Product
                        </button>
                    </div>
                </a>
            </Link>
        </>
    )
}

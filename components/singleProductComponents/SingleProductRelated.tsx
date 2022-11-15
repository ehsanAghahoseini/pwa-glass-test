import React, { useState } from "react";
import SingleProductSlider from "./SingleProductSlider";
import SingleProductCart from "./SingleProductCart";
import dynamic from "next/dynamic";
import { ProductsCartSkeleton } from "../skeletons";

const Flickity: any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})

interface IProps {
    products: any[],
    isEmptyList: boolean,
    isTargetBlank?: boolean
}

export const SingleProductRelated: React.FunctionComponent<IProps> = ({ products, isEmptyList, isTargetBlank }) => {

    const flickityOptionMainSlider = {
        initialIndex: 3,
        pageDots: false,
        accessibility: true,
        contain: true,
        wrapAround: true,
        autoPlay: 5000,
        bgLazyLoad: true,
        prevNextButtons: true,
        adaptiveHeight: true
    }

    return (
        <div className=" w-full  mb-[20px] flex flex-col ">
            <div className=" w-full h-[50px] flex items-center px-2">
                <span className=" text-lg">Related Product</span>
            </div>
            <div className=" w-full">
                {isEmptyList ?
                    <div className=" w-full min-h-[150px] flex justify-center items-center text-lg text-gray-300">
                        Empty List
                    </div> :
                    <>
                        {products.length !== 0 ?
                            <Flickity
                                className={'carousel-main-slider'} // default ''
                                elementType={'div'} // default 'div'
                                options={flickityOptionMainSlider} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                static={true} // default false
                                key="asasas"
                            >
                                {products.map((item: any, index: number) =>
                                    <SingleProductCart
                                        isTargetBlank={isTargetBlank}
                                        id={item.id}
                                        uri={item.uri}
                                        key={index}
                                        title={item.name}
                                        name={item.name}
                                        slug={item.slug}
                                        image_top={item.child.top}
                                        image_left={item.child.left}
                                        image_right={item.child.right}
                                        item={item}
                                        sideView='front'
                                    />
                                )}
                            </Flickity>
                            :
                            <Flickity
                                className={'carousel-main-slider'} // default ''
                                elementType={'div'} // default 'div'
                                options={flickityOptionMainSlider} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                static={true} // default false
                                key="sheft"
                            >
                                {new Array(8).fill(0).map((item, index) =>
                                    <ProductsCartSkeleton key={index} />
                                )}
                            </Flickity>
                        }
                    </>
                }

            </div>
        </div>

    )
}

export default SingleProductRelated


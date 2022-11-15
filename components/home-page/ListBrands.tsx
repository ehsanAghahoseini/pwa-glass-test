import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { BrandsProps } from "../../types/type-props/BrandsProps";
import SkeltonBrandCart from "../CSkeleton/SkeltonBrandCart";
import SkeltonShopCart from "../CSkeleton/SkeltonShopCart";
import { ContextFilter } from "../context/ContextFilter";
import dynamic from "next/dynamic";

const Flickity: any = dynamic(() => import('react-flickity-component'), {
    ssr: false
})


const ListBrands = ({ brandData, categoryData, brandFailed }: BrandsProps) => {
    const [listData, setListData] = useState<any>([])
    const [roleType , setRoleType]=useState<any>(0)
    const CtxFiler = useContext(ContextFilter);

    const flickityOptionMainSlider = {
        initialIndex: 22,
        pageDots: false,
        accessibility: true,
        contain: true,
        wrapAround: true,
        autoPlay: 5000,
        bgLazyLoad: true,
        prevNextButtons: true,
        adaptiveHeight: false,
        freeScroll: true,
    }

    const sortData = async () => {
        let newList = [];
        let newObject: any = {};
        for (let i in brandData) {
            if (newObject['one'] == undefined) {
                newObject = await {}
                newObject['one'] = await brandData[i];
                if (brandData[+i + 1] == undefined) {
                    await newList.push(newObject);
                }
            }
            else {
                newObject['two'] = await brandData[i];
                await newList.push(newObject);
                newObject = await {}
            }
        }
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);
        newList.push.apply(newList, newList);
        setListData(newList)

    }

    useEffect(() => {
        if (brandData) {
            sortData()
        }
    }, [brandData])

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('role')) {
            setRoleType(localStorage.getItem('role'))
          } 
      }, [])

    return (
        <>
            {roleType != '1' && brandFailed == false &&
                <div className=" w-[100%] max-w-[1400px] m-auto md:mt-7 mt-0 mb-8 rounded-lg flex flex-col items-center justify-center">
                    <div className=' w-full   flex justify-center'>
                        <div className=' w-full lg:w-11/12 h-[50px] flex items-center justify-between pl-[20px] mb-[20px] '>
                            <div className=" flex items-center">
                                <img className=' md:w-[20px] w-[15px]' src="/assets/svg/search2.svg" alt="filter" />
                                <span className='ml-[10px] md:text-base text-xs'>Search By Brand</span>
                            </div>
                            {/* <button className="px-[20px] h-[40px] rounded-[30px] bg-[#E7F5ED]">Show All</button> */}
                        </div>
                    </div>
                    <div className=" w-full lg:w-11/12">
                        {listData.length != 0 &&
                            <Flickity
                                className={'carousel-main-slider'} // default ''
                                elementType={'div'} // default 'div'
                                options={flickityOptionMainSlider} // takes flickity options {}
                                disableImagesLoaded={false} // default false
                                reloadOnUpdate={true} // default false
                                static={true} // default false
                            >
                                {listData.map((item: any, index: number) =>
                                    <div key={index} className=" md:w-[120px] w-[80px] flex flex-col  mx-[15px]">
                                        <div className=" w-full  mb-[7px] flex flex-col">
                                            {item.one.name &&
                                                <Link href={`${item.one.uri}`}>
                                                    <img src={item.one.image} className=" w-[90px] h-[90px] rounded-[10px] cursor-pointer" />
                                                </Link>
                                            }
                                        </div>
                                        {item.two &&
                                            <div className=" w-full  mb-[7px] flex flex-col">
                                                {item.two.name &&
                                                    <Link href={`${item.two.uri}`}>
                                                        <img src={item.two.image} className="w-[90px] h-[90px] rounded-[10px] cursor-pointer" />
                                                    </Link>
                                                }
                                            </div>
                                        }
                                    </div>
                                )}
                            </Flickity>
                        }
                        {listData.length == 0 &&
                            <SkeltonBrandCart />
                        }
                    </div>
                </div>
            }
        </>
    )
}


export default ListBrands;

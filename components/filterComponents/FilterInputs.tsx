import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import MultiRangeSlider from "../MuliRangeSlider/MuliRangeSlider";
import { FilterInputsProps } from "../../types/type-props/FilterInputsProps";
import CSkeleton from "../CSkeleton/CSkeleton";
import CModal from "../CModal/CModal";


const FilterHead = ({ activeFilter, setActiveFilter, filterData, parmsFilter, setParmsFilter, title, priceRange, displaySkelton, isPrice, onFinishFilter, clearFilter, setIsSkeleton, visibleMoreFilter, setVisibleMoreFilter }: FilterInputsProps) => {

    const router = useRouter()
    const [routePath, setRoutePath] = useState('')
    const [priceDefulatRagne, setPriceDefulatRagne] = useState([0, 0])

    const changePrice = (min: number, max: number) => {
        if (max == priceDefulatRagne[1] && min == priceDefulatRagne[0]) {
            return
        }
        else {
            let parms: any = { ...parmsFilter };
            parms['price'] = [String(min), String(max)]
            setParmsFilter(parms)
        }
    }

    const selectSubCategory = (category: string, subCategory: string) => {
        const dataParms: any = { ...parmsFilter };
        if (dataParms[category]) {
            let index_of_value = dataParms[category].indexOf(subCategory);
            if (index_of_value != -1) {
                dataParms[category].splice(index_of_value, 1)
                if (dataParms[category].length == 0) {
                    delete dataParms[category];
                }
            }
            else {
                dataParms[category].push(subCategory)
            }
        }
        else {
            dataParms[category] = [subCategory];
        }
        setParmsFilter(dataParms)
    }

    const changeCategoryActive = (value: string, rangeSLider?: any) => {
        const data: any = { ...activeFilter };
        if (data['category'] == value) {
            data['category'] = null
        }
        else {
            data['category'] = value;
        }
        if (value == 'price') {
            setPriceDefulatRagne([rangeSLider.min, rangeSLider.max])
        }
        setActiveFilter(data);
    }

    return (

        <div id="filterInputs" className=" w-full flex  transition-all items-center justify-center relative ">
            {displaySkelton == false && filterData.base.length > 0 &&
                <>
                    {Object.keys(parmsFilter).length != 0 &&
                        <>
                            {visibleMoreFilter != undefined &&
                                <div onClick={() => { setVisibleMoreFilter?.(true) }} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px]  bg-gr-100 rounded-full  bg-gr-300 sm:mr-[5px] mr-[2px] flex md:hidden justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/more.svg" className="h-4 w-4 rotate-90" />
                                </div>
                            }
                        </>
                    }
                    <div className="max-w-[calc(100%-100px)] flex flex-col rounded-[30px] ">
                        <div className=" w-full md:h-[40px] h-[30px] flex items-center justify-center ">
                            {title &&
                                <span className="sm:mr-3 mr-1 sm:text-base text-xs md:flex hidden ">{title}</span>
                            }
                            {filterData.base.map((item: any, index: any) =>
                                <>
                                    {item.type == 'checkbox' &&
                                        <div key={index} className={` w-[100px] h-full flex flex-col justify-center items-center  cursor-pointer relative text-[11px] sm:text-xs bg-gr-100   ${index == 0 && 'rounded-l-[30px]'} ${index == 0 && activeFilter.category == item.key && 'rounded-bl-[0px] rounded-tl-[30px]'} ${index == 0 && 'price' == activeFilter.category && 'rounded-bl-[0px] rounded-tl-[15px]'} ${isPrice == false && filterData.base.length == index + 1 && 'rounded-br-[30px] rounded-tr-[30px]'} ${isPrice == false && filterData.base[filterData.base.length - 1].key == activeFilter.category && 'rounded-br-[0px!important]'} `} >
                                            <span onClick={() => changeCategoryActive(item.key)} className=" w-full h-full flex justify-center items-center text-center sm:text-[11px] text-[10px]">{item.display_name}</span>
                                            {activeFilter.category == item.key &&
                                                <div className={` absolute w-[150px] max-h-[250px] overflow-y-auto pb-[5px] rounded-b flex flex-col bg-gr-100 top-full left-[0px] z-50 ${isPrice == false && filterData.base[filterData.base.length - 1].key == activeFilter.category && index != 0 && 'left-[unset] right-0'} `}>
                                                    {item.options.map((val: any, indexVal: any) =>
                                                        <div onClick={() => selectSubCategory(item.key, val.id)} key={indexVal} className={` w-full min-h-[35px] text-center  flex items-center text-xs overflow-hidden`}>
                                                            {(parmsFilter[activeFilter.category] && parmsFilter[activeFilter.category].indexOf(val.id) != -1) ?
                                                                <div className=" w-[16px] h-[16px] rounded-[4px] border-2 border-gr-300 mx-1 flex justify-center items-center " >
                                                                    <span className="w-[8px] h-[8px] bg-gr-300 block rounded-[2px]" />
                                                                </div>
                                                                :
                                                                <div className=" w-[16px] h-[16px] rounded-[4px] border-2 border-gr-300 mx-1 " />
                                                            }
                                                            <span>{val.name}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            }
                                        </div>
                                    }
                                    {filterData.base.length > 0 && item.type == 'slider' &&
                                        <>
                                            <div onClick={() => changeCategoryActive('price', item.options)} className={` w-[100px] h-full flex flex-col justify-center items-center  cursor-pointer relative text-xs  bg-gr-100  ${filterData.base.length == index + 1 && 'rounded-br-[30px] rounded-tr-[30px]'}  `} >
                                                <span>Price</span>
                                            </div>
                                        </>
                                    }
                                </>
                            )}
                        </div>
                        {activeFilter.category == 'price' &&
                            <div className={` w-full md:h-[40px] h-[30px] bg-gr-100 rounded-b-[15px] relative transition-all ${'price' == activeFilter.category ? 'opacity-100 z-50 mt-[0] visible' : 'opacity-0 z-[-40px] mt-[-40px] invisible'}`}>
                                <MultiRangeSlider
                                    min={priceDefulatRagne[0]}
                                    max={priceDefulatRagne[1]}
                                    onChange={({ min, max }) => changePrice(min, max)}
                                />
                            </div>
                        }
                    </div>
                    {Object.keys(parmsFilter).length != 0 &&
                        <>
                            {visibleMoreFilter != undefined &&
                                <div onClick={() => { setVisibleMoreFilter?.(true) }} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px] md:mt-0 mt-[10px] bg-gr-100 rounded-full  bg-gr-300 sm:ml-[10px] ml-[2px] md:flex hidden justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/more.svg" className="h-4 w-4 rotate-90" />
                                </div>
                            }
                            <div onClick={onFinishFilter} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px]  rounded-full  bg-gr-300 md:ml-[10px] mx-[5px] flex justify-center items-center cursor-pointer">
                                <img src="/assets/svg/searchWhite.png" className="h-4 w-4" />
                            </div>
                            {(router.pathname == '/s/[slug]' || router.pathname == '/filter' || router.pathname == '/brand/[brandname]') &&
                                <div onClick={clearFilter} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px]  rounded-full  bg-red-500 flex justify-center items-center cursor-pointer">
                                    <img src="/assets/svg/clear.svg" className="w-5" />
                                </div>
                            }
                        </>
                    }
                </>
            }
            {displaySkelton == true && activeFilter.parent != null &&
                <div className="  flex md:flex-row flex-col transition-all items-center justify-center relative">
                    <div className="w-[200px] h-[30px] md:h-[40px] bg-gray-100 rounded-[30px] overflow-hidden">
                        <CSkeleton />
                    </div>
                    <div className="w-[120px] h-[30px] md:w-[40px] md:h-[40px] md:rounded-full rounded-[10px] bg-gray-100 ml-0 md:ml-[20px] md:mt-[0px] mt-[25px] overflow-hidden">
                        <CSkeleton />
                    </div>
                </div>
            }


            {visibleMoreFilter != undefined && setVisibleMoreFilter != undefined &&
                <CModal visible={visibleMoreFilter} setVisible={setVisibleMoreFilter} width={'600px'} radius={'30px'} uId="Mo-moreFilter" >
                    <div className="w-full flex flex-col">
                        <div className=" w-full flex items-center justify-between border-b h-[40px]">
                            <span>Advance search</span>
                            <span onClick={() => { setVisibleMoreFilter(false) }} className=" mr-2 cursor-pointer">X</span>
                        </div>
                        <div className="  flex md:flex-row flex-col justify-center pt-[10px] ">
                            <div className="  h-[35px] flex items-center justify-center  ">
                                {filterData.advance.map((item: any, index: any) =>
                                    <>
                                        {item.type == 'checkbox' &&
                                            <div key={index} className={` w-[100px] h-full flex flex-col justify-center items-center  cursor-pointer relative text-[11px] sm:text-xs    ${index == 0 && 'rounded-l-[30px]'}  ${index == 0 && 'price' == activeFilter.category && 'rounded-bl-[0px] rounded-tl-[15px]'} ${filterData.advance.length == index + 1 && 'rounded-br-[30px] rounded-tr-[30px]'} ${activeFilter.category == item.key ? 'bg-gr-300' : 'bg-gr-100'}  `} >
                                                <span onClick={() => changeCategoryActive(item.key)} className=" w-full h-full flex justify-center items-center text-center">{item.display_name}</span>
                                            </div>
                                        }
                                    </>
                                )}
                            </div>
                            <div className="flex items-center sm:w-auto w-full justify-center">
                                {Object.keys(parmsFilter).length != 0 &&
                                    <>
                                        <div onClick={onFinishFilter} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px] md:mt-0 mt-[10px] rounded-full  bg-gr-300 sm:ml-[20px] ml-[2px] flex justify-center items-center cursor-pointer">
                                            <img src="/assets/svg/searchWhite.png" className="h-4 w-4" />
                                        </div>
                                        {(router.pathname == '/s/[slug]' || router.pathname == '/filter' || router.pathname == '/brand/[brandname]') &&
                                            <div onClick={clearFilter} className="md:w-[40px] md:h-[40px] w-[28px] h-[28px] md:mt-0 mt-[10px] rounded-full  bg-red-500 sm:ml-[10px] ml-[2px] flex justify-center items-center cursor-pointer">
                                                <img src="/assets/svg/clear.svg" className="w-5" />
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className="w-full  mt-[20px] flex flex-wrap">
                            {filterData.advance.map((item: any, index: any) =>
                                <>
                                    {item.type == 'checkbox' &&
                                        <>
                                            {activeFilter.category == item.key &&
                                                <>
                                                    {item.options.map((val: any, indexVal: any) =>
                                                        <div key={indexVal} className="sm:w-[25%] w-[50%] p-[3px]">
                                                            <div onClick={() => selectSubCategory(item.key, val.id)} key={indexVal} className={` w-full min-h-[35px] text-center cursor-pointer bg-gr-100 rounded flex items-center text-xs overflow-hidden`}>
                                                                {(parmsFilter[activeFilter.category] && parmsFilter[activeFilter.category].indexOf(val.id) != -1) ?
                                                                    <div className=" w-[16px] h-[16px] rounded-[4px] border-2 border-gr-300 mx-1 flex justify-center items-center " >
                                                                        <span className="w-[8px] h-[8px] bg-gr-300 block rounded-[2px]" />
                                                                    </div>
                                                                    :
                                                                    <div className=" w-[16px] h-[16px] rounded-[4px] border-2 border-gr-300 mx-1 " />
                                                                }
                                                                <span className='w-[calc(100%-18px)] py-1'>{val.name}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </CModal>
            }


        </div>
    )
}

export default FilterHead;
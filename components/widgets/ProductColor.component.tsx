
import React, { useEffect } from "react";
import { ListProductCartChildren } from "../../types/type-props/ListProductCartProps";

interface IProductColor {
    // item: ListProductCartChildren,
    item: any,
    setSelectedColor: CallableFunction,
    setSelectedFrame?:CallableFunction ,
    index: number ,
    selectedChild : number ,
}



const ProductColor: React.FunctionComponent<IProductColor> = ({ item, setSelectedColor, selectedChild ,setSelectedFrame ,index }) => {

    const handelSelect=(index:any)=>{
        setSelectedFrame?.(0)
        setSelectedColor(index)
    }

    return (
        <>
            <img key={index}
                src={item} onClick={()=>handelSelect(index)} className={` sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] rounded-full mr-1 cursor-pointer border-[3px] ${selectedChild == index ? '  border-gr-300' : 'border-white'}`} />
        </>
    )
};

export default ProductColor
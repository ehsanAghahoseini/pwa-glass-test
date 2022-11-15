import { ProductFilterModel } from "../models/productFilter.types"

export declare type ListProductHeadProps = {
    setSideView:(text: string) => void; 
    sideView:string ,
    brandName: any,
    setPriceRange:({}:any)=>void
    getProductsOfGlassesData:({}:any)=>void
    pageState:number ,
    slug:string ,
    priceRange:any
}



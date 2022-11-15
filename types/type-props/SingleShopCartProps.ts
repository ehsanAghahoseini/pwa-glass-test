import { ProductFilterModel } from "../models/productFilter.types"

export declare type SingleShopCartProps = {
    sideView: string,
    title: string,
    slug: string,
    price?:number ,
    rate : number ,
    image_top?: string,
    image_left?: string,
    image_right?: string,
    product: any
}
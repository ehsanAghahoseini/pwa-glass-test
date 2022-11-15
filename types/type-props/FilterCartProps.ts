import { ProductFilterModel } from "../models/productFilter.types"

export declare type FilterCartProps = {
    sideView?: string,
    name?: string,
    description?: string,
    id:number ,
    slug: string,
    image_top: string,
    image_left: string,
    image_right: string,
    title?:string ,
    item?: any,
    children?: any[] ,
    uri:string ,
    isTargetBlank?: boolean
}
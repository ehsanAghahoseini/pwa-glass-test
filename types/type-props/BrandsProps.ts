import { BrandModel } from "../models/brand.types"
import { CategoryProps } from "./CategoryProps"

export declare type BrandsProps = {
    brandData: BrandModel[],
    categoryData:any ,
    brandFailed:boolean
}
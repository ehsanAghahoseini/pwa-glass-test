import { BannerModel } from "../models/banner.types"
import { singleBanner } from "../models/banner.types"

export declare type BannerProps = {
    slidersData: singleBanner[],
    title?: string ,
    bannerFailed:boolean ,
    children?: JSX.Element | JSX.Element[] ,
}
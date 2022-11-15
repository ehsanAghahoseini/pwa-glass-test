import { ProductFilterModel } from "../models/productFilter.types"

export declare type ListProductCartChildren = {
    color: {
        id: number,
        image?: string
    },
    discount: any,
    price: number
    slug: string
    stock: any ,
    frame_stock:any ,
    top?:string ,
    left?:string ,
    right?:string ,
}

export declare type ListProductCartProps = {
    product: {
        id: number,
        uri: string,
        description: string,
        price: number,
        discount: number,
        slug: string,
        review: number,
        view: {
            forn: string,
            left: string,
            right: string,
        },
        shop: {
            logo: string,
            name: string,
            slug: string ,
            id: number ,
        },
        children: ListProductCartChildren[]
    },
    glass: any,
    sideView: string,
}



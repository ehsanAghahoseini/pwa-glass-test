import { customApi, baseUrl } from ".."
import { PaginingModel } from "../../types/models/pagining.types"

export declare interface IProductsOfGlasses {
    slug: string,
    pageState: number
    min?: number,
    max?: number,
    brandData?: any
}

export declare interface IProductsOfGlassesAPi {
    slug: string,
    pageState: number,
    lat: number,
    lng: number,
    min?: number,
    max?: number
}


export const ProductsOfGlassesApi = async ({ slug, pageState, lat, lng, max , min }: IProductsOfGlassesAPi) => {    
    if (max || min) {        
        let min_str = `"${min}"`
        let max_str = `"${max}"`
        var data: PaginingModel = await customApi({ url: `${baseUrl}/glasses/${slug}/products?page=${pageState}&lat=${lat}&lng=${lng}&price=[${min_str},${max_str}]` }, { method: "GET" })
    }
    else {
        var data: PaginingModel = await customApi({ url: `${baseUrl}/glasses/${slug}/products?page=${pageState}&lat=${lat}&lng=${lng}` }, { method: "GET" })
    }
    return data;
}

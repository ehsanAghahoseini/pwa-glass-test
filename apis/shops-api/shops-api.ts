import { customApi , baseUrl } from ".."
import { PaginingModel } from "../../types/models/pagining.types";
import { ShopsModel} from "../../types/models/shops.types"


export interface IShopProductsApi {
    slug: string,
    pageState: number ,
    parms:any
}


export const ShopsApi = async () => {
    const data: ShopsModel[]= await customApi({ url: `${baseUrl}/shops/top` }, { method: "GET" })
    return data ;
}

export const ShopProductsApi = async ({ slug, pageState , parms }: IShopProductsApi) => {
    const data: PaginingModel= await customApi({ url: `${baseUrl}/shops/${slug}/products?${parms}` }, { method: "GET" })
    return data ;
}


export const RelatedProductsApi = async ({ slug, pageState , parms }: IShopProductsApi) => {
    const data: PaginingModel= await customApi({ url: `${baseUrl}/shops/${slug}/related_products?page=${pageState}&${parms}` }, { method: "GET" })
    return data ;
}



export const SingleShopApi = async (slug:string) => {
    const data: PaginingModel= await customApi({ url: `${baseUrl}/shops/${slug}` }, { method: "GET" })
    return data ;
}


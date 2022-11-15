import { customApi, baseUrl } from ".."
import { PaginingModel } from "../../types/models/pagining.types";


export declare interface IProductsOfGlasses {
    slug: string,
}

export declare interface IProductsDetailsCommentsApi {
    slug: string,
    pageState: number
}

export const ProductsDetailsApi = async ({ slug }: IProductsOfGlasses) => {
    const data = await customApi({ url: `${baseUrl}/products/${slug}` }, { method: "GET" })
    return data;
}

export const ProductsDetailsCommentsApi = async ({ slug, pageState }: IProductsDetailsCommentsApi) => {
    const data: PaginingModel = await customApi({ url: `${baseUrl}/products/${slug}/comments?page=${pageState}` }, { method: "GET" })
    return data;
}


export const ProductsAddCommentsApi = async (slug: string, body: { rate: number, content_text: string }) => {
    const data: PaginingModel = await customApi({ url: `${baseUrl}/products/${slug}/comments` }, { method: "POST", body: JSON.stringify(body), token: true })
    return data;
}

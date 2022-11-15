import { customApi, baseUrl } from ".."
import { PaginingModel } from "../../types/models/pagining.types"

export declare interface ISingleOfGlasses {
    slug: string
}


export const SingleOfGlassesApi = async ({ slug }: ISingleOfGlasses) => {
    const data: PaginingModel = await customApi({ url: `${baseUrl}/glasses/${slug}` }, { method: "GET" })
    return data;
}

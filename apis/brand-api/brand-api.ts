import { customApi , baseUrl } from ".."
import { BrandModel } from "../../types/models/brand.types";


export const BrandApi = async () => {
    const data: BrandModel[]= await customApi({ url: `${baseUrl}/brands` }, { method: "GET" })
    return data ;
}


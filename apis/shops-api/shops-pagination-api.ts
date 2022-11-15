import { customApi , baseUrl } from ".."
import { PaginingModel} from "../../types/models/pagining.types"


export const ShopsPaginationApi = async (pageState:number , lat:any , lng:any, searchKey?: string) => {
    const data: PaginingModel= await customApi({ url: `${baseUrl}/shops?page=${pageState}&lat=${lat}&lng=${lng}${searchKey ? `&search=${searchKey}` : ""}` }, { method: "GET" })
    return data ;
}


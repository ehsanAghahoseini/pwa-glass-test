import { customApi , baseUrl } from ".."
import { FilterSingleModel} from "../../types/models/filterItems.types"


export const FilterItemsApi = async (category_id:number , api_url?:string) => {
    let id = category_id == -1 ? 'undefined' : category_id ;
    let new_url = "" ;
    if(api_url == 'filter'){
        new_url = `${baseUrl}/categories/${id}/filter`
    }
    else if(api_url == 'brand') {
        new_url = `${baseUrl}/categories/${id}/filter/brand`
    }
    else if(api_url == 'shop') {
        new_url = `${baseUrl}/categories/${id}/filter/shop`
    }    
    const data: FilterSingleModel= await customApi({ url: new_url }, { method: "GET" })
    return data ;
}


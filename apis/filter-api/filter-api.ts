import { customApi , baseUrl } from ".."
import { PaginingModel} from "../../types/models/pagining.types"


export const FilterApi = async (parms:any ) => {       
    const data:PaginingModel= await customApi({ url: `${baseUrl}/glasses?${parms}` }, { method: "GET" })
    return data ;
}


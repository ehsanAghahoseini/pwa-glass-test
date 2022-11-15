import { customApi , baseUrl } from ".."
import { CategoryModel} from "../../types/models/category.types"


export const CategoryApi = async () => {
    const data: CategoryModel[]= await customApi({ url: `${baseUrl}/categories` }, { method: "GET" })
    return data ;
}


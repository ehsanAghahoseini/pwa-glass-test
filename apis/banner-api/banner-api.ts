import { customApi , baseUrl } from ".."
import { BannerModel} from "../../types/models/banner.types"


export const BannersApi = async () => {
    const data: BannerModel= await customApi({ url: `${baseUrl}/banners` }, { method: 'GET', token: true  }) ;
    return data ;
}

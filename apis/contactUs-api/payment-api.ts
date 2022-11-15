import { customApi, baseUrl } from ".."
import { BannerModel } from "../../types/models/banner.types"


export const PayMethodApi = async () => {
    const data = await customApi({ url: `${baseUrl}/orders/services` }, { method: 'GET', token: true });
    return data;
}


export const ContactUsApi = async (formRef:any ) => {
    let postData = {
        'name': formRef.current['name'].value,
        'email': formRef.current['email'].value,
        'message': formRef.current['message'].value,
    }
    const data = await customApi({ url: `${baseUrl}/contacts` }, { method: 'POST', body: JSON.stringify(postData), token: true });
    return data;
}

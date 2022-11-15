import { customApi, baseUrl, ExternalApi } from ".."
import CheckUserAuth from "../../components/checkUserAuth/CheckUserAuth";



export const LoginAPi = async (e: any) => {
    let postData = JSON.stringify({
        'email': e.target[0].value,
        'password': e.target[1].value,
        'client': "app"
    })
    const data = await customApi({ url: `${baseUrl}/auth/login` }, { method: "POST", body: postData })
    return data;
}



export const RegisterAPi = async (e: any, selectLocation: any) => {
    let postData: any = JSON.stringify({
        "email": e.target[0].value,
        "password": e.target[3].value,
        "phone": e.target[2].value,
        "name": e.target[1].value,
        "address": selectLocation.address,
        "city": selectLocation.city,
        "state": selectLocation.state,
        "postcodez": selectLocation.postcodez,
        "lat": selectLocation.lat,
        "lng": selectLocation.lng,

    })
    const data = await customApi({ url: `${baseUrl}/auth/register` }, { method: "POST", body: postData })
    return data;
}

export const ResendCodeAPi = async (email: string) => {
    let postData = JSON.stringify({
        "email": email,
    })
    const data = await customApi({ url: `${baseUrl}/auth/resend` }, { method: "POST", body: postData })
    return data;
}


export const ConfirmAPi = async (email: string, code: string) => {
    let postData = JSON.stringify({
        "email": email,
        "code": code,
    })
    const data = await customApi({ url: `${baseUrl}/auth/verify` }, { method: "POST", body: postData })
    return data;
}

export const ForgetPasswordAPi = async (email: string) => {
    let postData = JSON.stringify({
        "email": email,
    })
    const data = await customApi({ url: `${baseUrl}/auth/forget` }, { method: "POST", body: postData })
    return data;
}


export const SellerRegisterApi = async (formRef: any, listFile: any, businessType: string) => {
    let postData: any = {};

    if (CheckUserAuth()) {
        postData = {
            "business_name": formRef.current['name'].value,
            "business_address": formRef.current['address'].value,
            "business_type": businessType,
            "auth_files": [],
        }
    }
    else {
        postData = {
            "business_name": formRef.current['name'].value,
            "business_address": formRef.current['address'].value,
            "owner_email": formRef.current['owner_email'].value,
            "owner_name": formRef.current['owner_name'].value,
            "owner_phone": formRef.current['owner_phone'].value,
            "password": formRef.current['password'].value,
            "business_type": businessType,
            "auth_files": [],
        }
    }

    for (let i in listFile) {
        postData[`auth_files`].push(listFile[i].path)
    }

    if (CheckUserAuth()) {
        const data = await customApi({ url: `${baseUrl}/auth/register_shop` }, { method: "POST", body: JSON.stringify(postData), token: true })
        return data;
    }
    else {
        const data = await customApi({ url: `${baseUrl}/auth/register_shop` }, { method: "POST", body: JSON.stringify(postData) })
        return data;
    }

}



export const UpdatePassword = async (password:any) => {
    let postData = JSON.stringify({
        "password": password,
    })
    const data = await customApi({ url: `${baseUrl}/profile/update_password` }, { method: "POST", body: postData })
    return data;
}






import { customApi, baseUrl, ExternalApi } from ".."



export const ChangePasswordAPi = async (e: any) => {
    let postData = JSON.stringify({
        'old_password': e.target[0].value,
        'new_password': e.target[1].value,
    })
    const data = await customApi({ url: `${baseUrl}/profile/change_password` }, { method: "POST", token: true, body: postData })
    return data;
}


export const UpdateProfileAPi = async (e: any, imagePath?: string) => {
    let reqBody = new FormData()
    reqBody.append('name', e.target[1].value);
    reqBody.append('phone', e.target[2].value);
    // reqBody.append('email', e.target[0].value);
    imagePath && reqBody.append('avatar', imagePath);
    const data = await customApi({ url: `${baseUrl}/profile` }, {
        method: "POST",
        body: reqBody,
        formData: true,
        token: true
    })
    return data;
}


export const GetProfileAPi = async () => {
    const data = await customApi({ url: `${baseUrl}/profile` }, { method: "GET", token: true })
    return data;
}


export const UploadAvatarAPi = async (imageFile: any) => {
    let reqBody = new FormData()
    reqBody.append('image', imageFile);
    const data = await customApi({ url: `${baseUrl}/profile/image` }, {
        method: "POST",
        body: reqBody,
        formData: true,
        token: true
    })
    return data;
}


import {toast} from "react-toastify";
import {ApiInputOptional, ApiInputRequired} from "../types/api.types";
import {ServerError, ServerUnexpectedError} from "../exceptions/server";

//export const baseUrl = `http://192.168.1.140:8000/api/application/v2`
export const baseUrl = `https://api.optics4less.com/api/application/v2`
//export const baseUrl = `https://dev.optics4less.com/public/api/application/v2`
export const hyperPayUrl = `https://api.optics4less.com/api`


export async function getToken(): Promise<string | null> {
    return `Bearer ${localStorage.getItem("token")}`;
}


export async function customApi(required: Required<ApiInputRequired>, optional: Partial<ApiInputOptional>) {
    const init: RequestInit = {}
    const headers: HeadersInit = {}
    // if (optional.token)
    headers['Authorization'] = await getToken() ?? ""
    if (optional.method !== "GET") init.body = optional.body
    if (optional.formData) {
        // headers['Content-Type'] = "multipart/form-data"
    } else {
        headers['Content-Type'] = "application/json"
        headers['Accept'] = "application/json"
    }
    init.headers = headers
    init.method = optional.method ?? "GET"
    if (!navigator.onLine) {
        // toast("Internet Connection Lost", {type: "error"})
        // setTimeout(() => {
        //     return alert("Internet Connection Lost")
        // }, 1000)
    }
    const request = await fetch(required.url, init)
    const response = request.json();
    /* todo res convert to type response that always is :
    {
    "data" : any,
    "status" : boolean,
    "message" : string
    }
     */
    return response.then((res) => {
        const location = window.location
        //todo toast must be show message from server
        if (res.status) {
            return res.data
        } else {
            if (res.message == 'Unauthenticated') {
                localStorage.removeItem("token")
                localStorage.removeItem("email")
                localStorage.removeItem("role")
                localStorage.removeItem("id")
                localStorage.removeItem("shopChat")
                sessionStorage.clear()
                if (location.pathname !== "/") location.href = '/'
            }
            throw new ServerError(res.message);


        }
    })
    // .catch((err) => {            
    //     toast("Unexpected Error Accrued", { type: "error" })
    //     throw new ServerUnexpectedError(err.message, err.statusCode)
    // })
}


export async function filterGlasses(body: any, reqType: "shop" | "category" | "sponsor" | "search") {
    let params = ""
    const bodyKeys = Object.keys(body)
    const bodyValue: any = Object.values(body)
    if (reqType === "category" || reqType === "search") {
        for (let i = 0; i < bodyKeys.length; i++) {
            params += `${bodyKeys[i]}=${bodyValue[i]}${i !== bodyKeys.length - 1 ? "&" : ""}`;
        }
    } else if (reqType === "shop") {
        for (let i = 0; i < bodyKeys.length; i++) {
            if (bodyKeys[i] !== "user_id") {
                params += `${bodyKeys[i]}=${JSON.stringify(bodyValue[i])}${i !== bodyKeys.length - 1 ? "&" : ""}`;
            }
        }
    } else {
        for (let i = 0; i < bodyKeys.length; i++) {
            params += `${bodyKeys[i]}=${JSON.stringify(bodyValue[i])}${i !== bodyKeys.length - 1 ? "&" : ""}`;
        }
    }
    if (reqType === "sponsor") return await customApi({url: `${baseUrl}/products/sponsors?${params}`}, {method: "GET"})
    else if (reqType === "category") return await customApi({url: `${baseUrl}/products/category?${params}`}, {method: "GET"})
    else if (reqType === "shop") return await customApi({url: `${baseUrl}/shops/${body.user_id}/products?${params}`}, {method: "GET"})
    else if (reqType === "search") return await customApi({url: `${baseUrl}/products/search?${params}`}, {method: "GET"})
}


export async function ExternalApi(url: string) {
    const init: RequestInit = {}
    const headers: HeadersInit = {}
    headers['Content-Type'] = "application/json"
    headers['Accept'] = "application/json"
    init.headers = headers
    init.method = "GET"
    const request = await fetch(url, init)
    const response = request.json();
    return response.then((res) => {
        return res
    })
        .catch((err) => {
            toast("Unexpected Error Accrued", {type: "error"})
            throw new ServerUnexpectedError(err.message, err.statusCode)
        })
}


function DownloadInvoiceApi(id: any) {
    return fetch(`${baseUrl}/orders/${id}/dl_invoice`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(res => res.blob())
        .then((res) => {
            return URL.createObjectURL(res);
        })
        .catch((er) => {
            return er;
        })
}

export {DownloadInvoiceApi};

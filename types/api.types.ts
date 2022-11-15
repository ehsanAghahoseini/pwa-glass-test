import {ToastContent, ToastOptions} from "react-toastify/dist/types";

export declare type FetchMethode = "GET" | "POST" | "PUT" | "DELETE" | "UPDATE";
export declare type ApiInputRequired = {
    url: string,
}
export declare type ApiInputOptional = {
    body: any,
    token: boolean,
    formData?: boolean,
    method?: FetchMethode,
    successMes?: ToastContent,
    errorMes?: ToastContent,
    messageConfig?: ToastOptions<{}>,
    unexpectedMess?: ToastContent
}



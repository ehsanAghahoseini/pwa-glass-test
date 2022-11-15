import { customApi, baseUrl, ExternalApi } from ".."
import { AddressModel } from "../../types/models/address.types"
import { PaginingModel } from "../../types/models/pagining.types";


export const OrdersListApi = async (active: number) => {
    const data: PaginingModel = await customApi({ url: `${baseUrl}/orders${active === 2 ? "?order=received" : ""}` }, { method: "GET", token: true })
    return data;
}

export const GetInvoiceApi = async (orderId: any) => {
    const data: any = await customApi({ url: `${baseUrl}/orders/${orderId}/invoice` }, { method: "GET", token: true })
    return data;
}
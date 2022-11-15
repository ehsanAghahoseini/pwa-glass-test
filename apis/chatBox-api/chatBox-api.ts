import localforage from "localforage";
import { customApi, baseUrl } from ".."
import { v4 as uuidv4 } from 'uuid';


export const GetChatContentApi = async (chatID: string) => {
    const data = await customApi({ url: `${baseUrl}/chats/${chatID}/messages` }, { method: "GET" })
    return data;
}


export const NewConversationApi = async (props: { shopData: any , currentChatToken:any}) => {
    async function uniqChatIdGenerator() {
        const userIp: any = await localforage.getItem("userIp")
        let l = userIp.split('.').join("")
        return l + uuidv4()
    }

    const userIp: any = await localforage.getItem("userIp")
    // const uniqChatIDLocal = localStorage.getItem("uniqChatID")
    // if (uniqChatIDLocal) return
    const body = {
        unique_id: await uniqChatIdGenerator(),
        shop: props.shopData.id,
        user_ip: userIp,
        token: props.currentChatToken
    }
    const data = await customApi({ url: `${baseUrl}/chats` }, { method: "POST", body: JSON.stringify(body) })
    return data;
}

export const SendPictureApi = async (props: { file: any, chatId: string }) => {
    let reqBody = new FormData()
    reqBody.append('type', 'file');
    reqBody.append('file', props.file);
    const data = await customApi({ url: `${baseUrl}/chats/${props.chatId}/messages` }, {
        method: "POST",
        body: reqBody,
        formData: true
    })
    return data;
}

export const SendProductApi = async (props: { product: any, chatId:any }) => {
    let reqBody = new FormData()
    reqBody.append('type', 'product');
    reqBody.append('product_id', props.product.children[0].id);
    reqBody.append('product', JSON.stringify(props.product));
    const data = await customApi({ url: `${baseUrl}/chats/${props.chatId}/messages` }, {
        method: "POST",
        body: reqBody,
        formData: true
    })
    return data;
}

export const SendMessageApi = async (props: { textBody: any, chatId:any }) => {
    let reqBody = new FormData()
    reqBody.append('type', 'message');
    reqBody.append('content', props.textBody);
    const data = await customApi({ url: `${baseUrl}/chats/${props.chatId}/messages` }, {
        method: "POST",
        body: reqBody,
        formData: true
    })
    return data;
}



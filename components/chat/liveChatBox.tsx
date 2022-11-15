import React, { useContext, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import localforage from "localforage";
import moment from "moment";
import { GetChatContentApi, NewConversationApi, SendMessageApi, SendPictureApi, SendProductApi } from "../../apis/chatBox-api/chatBox-api";
import { ContextChat } from "../context/ContextChat"
import { toast } from "react-toastify";
import AllowNotificationLayer from "./AllowNotifComponent";

interface ILiveChatBoxProps {
    shopData: {
        id: string,
        logo?: string,
        name: string,
    },
    productData?: any[],
    setIsVis: CallableFunction,
    isVis: boolean
}


const LiveChatBox: React.FunctionComponent<ILiveChatBoxProps> = ({ isVis, setIsVis, shopData, productData }) => {
    const [isReq, setIsReq] = React.useState<boolean>(false)
    const [isNewConversation, setIsNewConversation] = React.useState<boolean>(false)
    const [isImageUpReq, setIsImageUpReq] = React.useState<boolean>(false)
    const [isTexBoxFull, setIsTexBoxFull] = React.useState<boolean>(false)
    const [isVisProduct, setIsVisProduct] = React.useState<boolean>(false)
    const [isNewMessBG, setIsNewMessBG] = React.useState<boolean>(false)
    const [isAllowToCreateChat, setIsAllowToCreateChat] = React.useState<boolean>(false)
    const [isAllowChatLayerVis, setIsAllowChatLayerVis] = React.useState<boolean>(false)
    const [textBody, setTextBody] = React.useState<string>("")
    const [chatContent, setChatContent] = React.useState<any[]>([])
    const [userProfile, setUserProfile] = React.useState<any>({})
    const [currentChat, setCurrentChat] = React.useState<any>({})

    const Ctx = useContext(ContextChat);

    useEffect(() => {
        getUserProfile().then()
    }, [])

    function getChatInBg(currentChat: any) {
        document.addEventListener("visibilitychange", (event) => {
            if (document.visibilityState == "visible") {
                getChatContent(currentChat)
            }
        })
    }

    useEffect(() => {
        getChatContent(currentChat.chatId)
        setIsNewMessBG(true)
    }, [Ctx.updateChatListBool])

    useEffect(() => {
        setIsNewMessBG(false)
    }, [isVis])

    useEffect(() => {
        if (isAllowToCreateChat) {
            Ctx.currentChatToken && newConversation()
        }
    }, [Ctx.currentChatToken])

    async function getUserProfile() {
        const userIp = await localforage.getItem("userIp")
        const userCountry = await localforage.getItem("userCountry")
        setUserProfile({
            userIp: userIp,
            userCountry: userCountry
        })
    }

    async function sendMessage() {
        if (!textBody.trim()) return
        if (isReq) return
        setIsReq(true)
        const textAreaId: any = document.getElementById("textAreaId")
        const cF: any = document.getElementById("chatForm")
        try {
            const res: any = await SendMessageApi({ textBody: textBody, chatId: currentChat.chatId })
            if (res) {
                await getChatContent(currentChat.chatId)
            }
        }
        catch {

        }
        setTextBody("")
        cF.reset()
        textAreaId?.select();
        setIsReq(false)
    }

    async function sendProduct(val: any) {
        const boxView = document.getElementById("chat_box_div")
        try {
            const res: any = await SendProductApi({ product: JSON.stringify(val), chatId: currentChat.chatId })
            if (res) {
                await getChatContent(currentChat.chatId)
            }
        }
        catch {

        }
        boxView?.scrollTo({ top: boxView.scrollHeight })
    }

    async function sendPicture(file: any) {
        if (!file) return
        if (isImageUpReq) return
        setIsImageUpReq(true)
        // const fileUrl = URL.createObjectURL(file)
        try {
            const res: any = await SendPictureApi({ file: file, chatId: currentChat.chatId })
            if (res) {
                await getChatContent(currentChat.chatId)
            }
        }
        catch {

        }
        setIsImageUpReq(false)
    }
    //

    async function newConversation() {
        if (isReq) return
        setIsReq(true)
        try {
            if (!Ctx.currentChatToken) {
                Ctx.setIsNotSupport(true)
                return toast("Must Be Sure Your country is not limited by Google FireBase", { type: "warning" })
            }
            const res: any = await NewConversationApi({ shopData: shopData, currentChatToken: Ctx.currentChatToken })
            if (res) {
                setIsReq(false)
                setIsNewConversation(false)
                const newShopChat = {
                    chatId: res.id,
                    shopName: shopData?.name,
                    uniqueChatId: res.unique_id,
                    token: Ctx.currentChatToken
                }
                setCurrentChat(newShopChat)
                const iniSC: any = localStorage.getItem("shopChat")
                let shopsChatList = JSON.parse(iniSC)

                if (shopsChatList) {
                    shopsChatList.push(newShopChat)
                    localStorage.setItem("shopChat", JSON.stringify(shopsChatList))
                } else {
                    let SCL = []
                    SCL.push(newShopChat)
                    localStorage.setItem("shopChat", JSON.stringify(SCL))
                }
            }
        }
        catch {
            setIsReq(false)
        }
    }

    async function getChatContent(chatID: any) {
        const boxView = document.getElementById("chat_box_div")
        try {
            const res: any = await GetChatContentApi(chatID)
            setChatContent(res.data.reverse())
            setTimeout(() => boxView?.scrollTo({ top: boxView.scrollHeight, behavior: "smooth" }), 1000)
        }
        catch {

        }
    }

    useEffect(() => {
        shopData?.name && checkChat()
    }, [shopData?.name])



    function checkChat() {
        const iniSC: any = localStorage.getItem("shopChat")
        let shopsChatList = JSON.parse(iniSC)
        function ch() {
            for (let i in shopsChatList) {
                if (shopsChatList[i].shopName === shopData.name) {
                    return true
                }
            }
        }
        if (!shopsChatList) {
            return setIsNewConversation(true)
        } else {
            if (ch()) {
                for (let i in shopsChatList) {
                    if (shopsChatList[i].shopName === shopData.name) {
                        getChatInBg(shopsChatList[i].chatId)
                        getChatContent(shopsChatList[i].chatId)
                        return setCurrentChat(shopsChatList[i])
                    }
                }
            } else {
                return setIsNewConversation(true)
            }
        }
    }

    async function CheckFirebaseNotificationAllow() {
        if (Notification.permission === 'denied') {
            console.log("Your browser block the nitification, Please reset the notification setting");
            return Ctx.setIsNotDenied(true)
        }
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            setIsAllowToCreateChat(false)
            alert("Your browser does not support ChatBox Feature")
            console.log("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            setIsAllowToCreateChat(true)
            Ctx.setUpdateChatListBool(!Ctx.updateChatListBool)
            newConversation()
            setIsAllowChatLayerVis(false)
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission === 'default') {
            setIsAllowChatLayerVis(true)
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    Ctx.setUpdateChatListBool(!Ctx.updateChatListBool)
                    setIsAllowToCreateChat(true)
                    setIsAllowChatLayerVis(false)
                }
            });
        }
    }


    return (
        <>
            <div
                className={` transition-all duration-500 flex flex-col w-full sm:max-w-[380px] h-[80vh] fixed ${isVis ? "bottom-0" : "bottom-[calc(-80vh+50px)]"} right-0 md:right-4 rounded-lg overflow-auto shadow_custom z-50 bg-white`}>
                <AllowNotificationLayer seiVist={setIsAllowChatLayerVis} isVis={isAllowChatLayerVis} />
                {isNewConversation ?
                    <div onClick={async () => {
                        await CheckFirebaseNotificationAllow()
                    }} className=" w-full flex justify-center items-center pt-3">
                        {Ctx.isNotSupport ?
                            <p className=" text-sm cursor-default">
                                Notification not support
                            </p>
                            :
                            <>
                                {Ctx.isNotDenied ?
                                    <p className=" text-sm cursor-default">
                                        Browser Notification is Blocked.
                                        <a className=" ml-1 text-xs text-blue-600" href="https://support.google.com/chrome/answer/3220216?hl=en&co=GENIE.Platform%3DDesktop&oco=1" target={"_blank"} rel="noreferrer">
                                            (Click here)
                                        </a>
                                    </p>
                                    :
                                    <p className=" cursor-pointer">  {isReq ? "Create Connection ..." : "Click To Start Chat"} </p>
                                }
                            </>
                        }


                    </div>
                    :
                    <>
                        {/* --------------- header of components --------------- */}
                        <div className=" w-full flex justify-between py-3 px-4 border-b-2 h-[50px] items-center">
                            <div className="flex items-center justify-center relative">
                                <img className="w-[35px] h-[35px] shadow-md rounded-full mr-2 border"
                                    src={`${shopData?.logo ? `${shopData.logo}` : "/assets/media/shop.jpg"}`} />
                                <p className="text-sm">{shopData?.name}</p>
                                {!isVis && isNewMessBG &&
                                    <span className=" rounded-full w-[10px] h-[10px] px-1 py-1 bg-emerald-500 flex justify-center items-center left-[-3px] top-[-3px] absolute"></span>
                                }
                            </div>
                            {isVis ? <span onClick={() => setIsVis(false)} className="cursor-pointer">
                                <img src="/assets/svg/chat/down.svg" />
                            </span> :
                                <span onClick={() => {
                                    setIsVis(true)
                                    const boxView = document.getElementById("chat_box_div")
                                    boxView?.scrollTo({ top: boxView.scrollHeight })
                                }} className="cursor-pointer">
                                    <img src="/assets/svg/chat/up.svg" />
                                </span>
                            }
                        </div>

                        {/* --------------- body of components --------------- */}
                        <div className="flex flex-col w-full h-[calc(100%-50px)]">

                            {/* --------------- transferd messages components --------------- */}
                            <div id="chat_box_div"
                                className={`transition-all duration-500 w-full  ${isTexBoxFull ? "h-[0]" : "h-[calc(100%-150px)]"} overflow-auto`}>

                                {/* --------------- text items --------------- */}
                                {chatContent.map((item: any, index: number) =>
                                    <>
                                        {
                                            item.type === "message" &&
                                            <>
                                                <div
                                                    className={` flex flex-col w-full p-2 mt-2 ${index !== chatContent.length - 1 && "border-b-[1px]"}`}
                                                    key={item.id}>
                                                    <div className="flex items-center">
                                                        <img className="w-6 h-6 rounded-full mr-2 "
                                                            src={`${item.is_admin ? shopData.logo : "/assets/svg/person.svg"}`} />
                                                        <p className="text-sm mr-2">{`${item.is_admin ? shopData.name : userProfile.userIp}`}</p>
                                                        <small
                                                            className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-lg">{moment(item.content.created_at).format("MM/DD HH:mm")}</small>
                                                    </div>
                                                    <pre
                                                        className=" mt-2 ml-8 min-h-10 bg-gray-100 rounded-lg text-xs p-2 w-full max-w-[300px] text-justify whitespace-pre-line ">{item.content}</pre>
                                                </div>
                                            </>
                                        }

                                        {
                                            item.type === "product" &&
                                            <>
                                                <div key={item.id}
                                                    className={` flex flex-col w-full p-2 mt-2 ${index !== chatContent.length - 1 && "border-b-[1px]"}`}>
                                                    <div className="flex items-center">
                                                        <img className="w-6 h-6 rounded-full mr-2 "
                                                            src={`${item.is_admin ? shopData.logo : "/assets/svg/person.svg"}`} />
                                                        <p className="text-sm mr-2">{`${item.is_admin ? shopData.name : userProfile.userIp}`}</p>
                                                        <small
                                                            className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-lg">{moment(item.content.created_at).format("MM/DD HH:mm")}</small>
                                                    </div>
                                                    <div
                                                        className={` mt-2 ml-8 min-h-10 bg-gray-100 rounded-lg text-xs p-2 relative flex items-center mb-2 ${index !== productData?.length - 1 && "border-b"} py-2`}>
                                                        <LazyLoadImage
                                                            className="max-w-[50px] rounded-md border"
                                                            alt={JSON.parse(item.content).children[0].name}
                                                            placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                                                            src={`${JSON.parse(item.content).children[0].view.top}`} />
                                                        <p className="text-xs">
                                                            <span
                                                                className=" mr-2 bg-gray-200 px-2 py-[2px] rounded-lg ml-4">model: {JSON.parse(item.content).title}</span>
                                                        </p>
                                                        <small
                                                            className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-lg">p-code: {JSON.parse(item.content).children[0].id}</small>

                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {
                                            item.type === "file" &&
                                            <>
                                                <div key={item.id}
                                                    className={` flex flex-col w-full p-2 mt-2 ${index !== chatContent.length - 1 && "border-b-[1px]"}`}>
                                                    <div className="flex items-center">
                                                        <img className="w-6 h-6 rounded-full mr-2 "
                                                            src={`${item.is_admin ? shopData.logo : "/assets/svg/person.svg"}`} />
                                                        <p className="text-sm mr-2">{`${item.is_admin ? shopData.name : userProfile.userIp}`}</p>
                                                        <small
                                                            className="text-[10px] bg-gray-200 px-2 py-[2px] rounded-lg">{moment(item.content.created_at).format("MM/DD HH:mm")}</small>
                                                    </div>
                                                    <div className="ml-8 mt-2 bg-gray-200 p-2 rounded-lg w-fit">
                                                        <img className="max-w-[150px] w-full rounded-ls"
                                                            src={`${item.content}`} />
                                                    </div>

                                                </div>
                                            </>
                                        }

                                    </>
                                )}
                                {isImageUpReq ? <div className={" w-full p-6"}><Skeleton style={{ width: "80%", margin: "auto" }}
                                    height={120} /></div> : ""}
                            </div>

                            {/* --------------- send message components --------------- */}
                            <div
                                className={` relative transition-all duration-500 w-full border-t bottom-0  ${isTexBoxFull ? "h-[100%]" : "h-[150px]"}  flex flex-col`}>
                                <div className={`flex justify-between px-2`}>
                                    <div className="w-[calc(100%-30px)] items-center">
                                        <form className=" flex flex-col w-full" id="chatForm">
                                            <textarea onKeyDown={(val: any) => {
                                                val.key === "Enter" && sendMessage()
                                            }}
                                                id="textAreaId" onChange={(val) => {
                                                    setTextBody(val.target.value)
                                                }}
                                                placeholder="Write a message"
                                                className={` p-2 rounded-lg w-full ${isTexBoxFull ? "h-[450px]" : "h-[85px]"} border border-gray-300 pl-1 text-sm focus:outline-none mt-3`}
                                                required />
                                        </form>
                                    </div>
                                    <div className="w-[40px] flex justify-center items-center ">
                                        {isTexBoxFull ?
                                            <span onClick={() => setIsTexBoxFull(false)}
                                                className="cursor-pointer bg-gray-200 rounded-full p-2">
                                                <img src="/assets/svg/chat/down.svg" />
                                            </span>
                                            :
                                            <span onClick={() => { setIsTexBoxFull(true) }}
                                                className="cursor-pointer bg-gray-200 rounded-full  p-2">
                                                <img src="/assets/svg/chat/up.svg" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center p-2">
                                    <button onClick={() => {
                                        sendMessage()
                                    }}
                                        className={` ${textBody.trim() ? "bg-ehbi-100" : "bg-gray-200"} px-4 py-2 border-0 text-xs rounded-2xl mr-2 flex items-center`}>
                                        {isReq ? "wait..." : "send"} <img className=" ml-2 w-[10px]"
                                            src="/assets/svg/chat/send.svg" />
                                    </button>
                                    {/* <button onClick={() => {
                                setIsVisProduct(!isVisProduct)
                            }} className="px-4 py-2 border-0 text-xs rounded-2xl mr-1 bg-neutral-300">
                                products
                            </button> */}
                                    <label>
                                        <input className="hidden" type={"file"} onChange={(val: any) => {
                                            sendPicture(val.target.files[0])
                                        }} accept="image/png, image/gif, image/jpeg" />
                                        <div className=" p-2 border-0 cursor-pointer hover:bg-neutral-300 rounded-full">
                                            <img className="w-[18px]" src="/assets/svg/chat/picture.svg" />
                                        </div>
                                    </label>
                                    {/* <div className=" ml-4 bg-gray-100 rounded-full flex justify-center items-center w-8 h-8 hover:bg-neutral-300 cursor-pointer ">
                                <img src="/assets/svg/dots-3.svg" className=" w-[20px] "/>
                            </div> */}
                                </div>

                                {/* --------------- product to send components --------------- */}
                                <div
                                    className={` max-h-[200px] overflow-auto pt-6 transition-all duration-200 ${isVisProduct ? "bottom-[60px] opacity-100 visible" : "bottom-[50px] opacity-0 invisible"} absolute  left-2 right-2 bg-white rounded-xl shadow_custom flex flex-col p-3`}>
                                    <span onClick={() => {
                                        setIsVisProduct(false)
                                    }} className="absolute right-4 top-2 cursor-pointer">x</span>
                                    {productData && productData.length > 0 ? productData.map((val: any, index: number) =>
                                        <>
                                            <div
                                                className={` relative cursor-pointer flex items-center mb-2 ${productData && index !== productData?.length - 1 && "border-b"} py-2`}>
                                                <LazyLoadImage
                                                    className="max-w-[40px] rounded-md"
                                                    alt={val?.children[0]?.id}
                                                    placeholder={<Skeleton style={{ width: "100%" }} height={120} />}
                                                    src={val?.children[0]?.view.top} />
                                                <p className="text-xs ml-4">model:
                                                    <span
                                                        className=" bg-gray-200 px-2 py-[2px] rounded-lg ml-4">{val.title}</span>
                                                </p>
                                                <button onClick={() => {
                                                    sendProduct(val);
                                                    setIsVisProduct(!isVisProduct)
                                                }}
                                                    className="absolute bg-blue-200 px-2 py-[2px] rounded-lg ml-4 text-xs right-1">
                                                    send
                                                </button>
                                            </div>
                                        </>
                                    ) : <div className={" w-full flex items-center justify-center"}> no product found </div>}
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
};

export default LiveChatBox;


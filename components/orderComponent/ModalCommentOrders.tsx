import { useState } from "react";
import { toast } from "react-toastify";
import { ProductsAddCommentsApi } from "../../apis/products-api/products-api";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";


const ModalCommentOrders = ({ setVisible, visible, selectedOrder, isReq, setIsReq }: any) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [rateNumber, setRateNumber] = useState<number>(0)
    const [contentText, setContentText] = useState<string>("")

    async function onSubmit() {
        if (displayBtn) return
        setIsReq(true)
        setDisplayBtn(true)
        const body = {
            rate: rateNumber,
            content_text: contentText
        }
        try {
            const res: any = await ProductsAddCommentsApi(selectedOrder.glass_slug, body)            
            toast(res.message, {type:"success"})
            setIsReq(false)
            setContentText("")
            setRateNumber(0)
            setVisible(false)
            setDisplayBtn(false)
        }
        catch {
            setIsReq(false)
            setDisplayBtn(false)
        }
    }


    return (
        <>
            <CModal visible={visible} setVisible={setVisible} uId="comment-order" radius={'30px'} >
                <div className="flex flex-col p-3 px-4 md:px-8">
                    <div className=" w-full  p-3 flex items-center justify-end">
                        <div onClick={() => { setVisible(false) }} className="  text-gray-500 rounded cursor-pointer flex items-center justify-center"><img className=" w-[20px]" src="/assets/svg/exit.svg" /></div>
                    </div>
                    <input onChange={(e) => setContentText(e.target.value)} value={contentText} type="text" placeholder="type..." className=" w-full h-9 border-b-2 border-gr-300 bg-inherit pl-1 text-sm focus:outline-none" required />
                    <div className=" flex items-center mt-[30px]">
                        < div title={`rate of review ${rateNumber}`} className=" flex ">
                            {[0, 0, 0, 0, 0].map((item: any, index: any) =>
                                <>
                                    {index + 1 <= rateNumber ?
                                        <img onClick={() => { setRateNumber(index + 1) }} key={index} src="/assets/svg/star.svg" alt="icon" className=" sm:w-[20px] w-[15px] mr-1 cursor-pointer" />
                                        :
                                        <img onClick={() => { setRateNumber(index + 1) }} key={index} src="/assets/svg/star-empty.svg" alt="icon" className=" sm:w-[20px] w-[15px] mr-1 cursor-pointer" />
                                    }
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-around mt-[20px]">
                        {displayBtn == true && visible == true ?
                            <button type={'button'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white " disabled>
                                <BtnLoader />
                            </button>
                            :
                            <button onClick={() => onSubmit()}  type={'submit'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                <span>Ok</span>
                            </button>
                        }
                        <button type={'button'} onClick={() => setVisible(false)} className=" w-[120px] h-10 border border-gr-300 flex items-center justify-center rounded-[30px] text-gr-300">
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </CModal>
        </>
    )
}

export default ModalCommentOrders;
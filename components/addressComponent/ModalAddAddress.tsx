import { useEffect, useState } from "react";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";
import dynamic from "next/dynamic";
import { ModalAddAddressProps } from "../../types/type-props/ModalAddAddressProps";
import { customApi, baseUrl } from "../../apis";
import { toast } from "react-toastify";
import { AddressAddApi } from "../../apis/address-api/address-api";


const MapCont:any = dynamic(() => import('../map/MapCont'), {
    ssr: false
})

const ModalAddAddress = ({ visible, setVisible, reload }: ModalAddAddressProps) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [position, setPosition] = useState<any>([24.0937676, 53.4281644]);
    const [textError, setTextError] = useState('');
    const [displayFormError, setDisplayFormError] = useState(false);

    const clearData = () => {
        setPosition([24.0937676, 53.4281644]);
        const formAdd: any = document.getElementById("add-address-form");
        formAdd?.reset()
    }

    const handelFormError = (textError: string) => {
        setDisplayFormError(true)
        setTextError(textError)
        toast(textError, { type: "error" })
        return
    }

    const addNewAddress = async (e: any) => {
        e.preventDefault();
        setDisplayFormError(false)
        if (e.target[1].value.length < 10) { return handelFormError("The receive phone must be at least 10 characters.") }
        if (e.target[3].value.length < 10) { return handelFormError("The address must be at least 10 characters.") }
        setDisplayBtn(true)
        try {
            const res = await AddressAddApi(e, position)
            setDisplayBtn(false)
            setVisible(false)
            reload()
            const form: any = document.getElementById("add-address-form")
            form?.reset()
        }
        catch (err: any) {            
            handelFormError(err?.message)
            setDisplayBtn(false)
        }
    }

    return (
        <>
            <CModal onScap={clearData} visible={visible} setVisible={setVisible} radius={'30px'} uId={'Mo-add-Address'} >
                <form onSubmit={addNewAddress} id="add-address-form" className=" w-full  flex flex-col p-4">
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">Name </span>
                        <input type="text" className=" h-9  border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required />
                    </div>
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">phone </span>
                        <input type="number" className=" h-9 border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required />
                    </div>
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">Postal Code </span>
                        <input type="number" className=" h-9 border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required/>
                    </div>
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">Address </span>
                        <textarea className=" h-9 border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required />
                    </div>
                    <div className=" w-full flex flex-col mt-[50px]">
                        <span className="text-gray-600 ml-[10px] mb-[10px]">Location </span>
                        <div className=" w-full h-[200px] rounded-[30px] overflow-hidden">
                            <MapCont enableChangeMarker={true} position={position} setPosition={setPosition} />
                        </div>
                    </div>
                    <div className={` w-full border border-red-500 rounded-[10px] mt-[20px] flex items-center transition-all overflow-hidden ${displayFormError ? 'visible opacity-100 p-3 h-auto' : 'invisible opacity-0 p-0 h-0'}`}>
                        <li className="text-sm text-red-500 ml-[20px]">{textError}</li>
                    </div>
                    <div className=" w-full flex flex-col mt-4">
                        {displayBtn == true && visible == true ?
                            <button type={'button'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white " disabled>
                                <BtnLoader />
                            </button>
                            :
                            <button type={'submit'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                <span>Add</span>
                            </button>
                        }
                    </div>
                </form>
            </CModal>
        </>
    )
}

export default ModalAddAddress;
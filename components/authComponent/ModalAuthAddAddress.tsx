import { useEffect, useState , useRef } from "react";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";
import dynamic from "next/dynamic";
import { ModalAuthAddAddressProps } from "../../types/type-props/ModalAuthAddAddressProps";
import { customApi, baseUrl } from "../../apis";
import { toast } from "react-toastify";
import { AddressAddApi } from "../../apis/address-api/address-api";


const MapCont:any = dynamic(() => import('../map/MapCont'), {
    ssr: false
})

const ModalAuthAddAddress = ({ visible, setVisible , setSelectLocation , selectLocation}: ModalAuthAddAddressProps) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [position, setPosition] = useState<any>([24.0937676, 53.4281644]);
    const formRef:any = useRef(null)

    const clearData = () => {
        setPosition([24.0937676, 53.4281644]);
        const formAdd: any = document.getElementById("add-address-form");
        formAdd?.reset()
    }

    const addNewAddress = async (e: any) => {
        e.preventDefault();
        setSelectLocation({
            'postcodez':formRef.current['postcodez'].value,
            'address':formRef.current['address'].value,
            'lat':position[0],
            'lng':position[1],
        })
        setVisible(false)
        const form: any = document.getElementById("add-address-form")
        form?.reset()
    }

    useEffect(()=>{
        if(selectLocation && selectLocation.lat != null){
            setPosition([selectLocation.lat , selectLocation.lng])
        }
    },[selectLocation.lat])

    return (
        <>
            <CModal onScap={clearData} visible={visible} setVisible={setVisible} radius={'30px'} uId={'Mo-auth-add-Address'} >
                <form ref={formRef} onSubmit={addNewAddress} id="add-address-form" className=" w-full  flex flex-col p-4">
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">Postal Code </span>
                        <input name='postcodez' className=" h-9 border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required />
                    </div>
                    <div className=" w-full flex flex-col">
                        <span className="text-gray-600">Address </span>
                        <input name='address' className=" h-9 border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 focus:outline-none" required />
                    </div>
                    <div className=" w-full flex flex-col mt-[20px]">
                        <span className="text-gray-600 ml-[10px] mb-[10px]">Location </span>
                        <div className=" w-full h-[200px] rounded-[30px] overflow-hidden">
                            <MapCont enableChangeMarker={true} position={position} setPosition={setPosition} />
                        </div>
                    </div>
                    <div className=" w-full flex flex-col mt-4">
                        {displayBtn == true && visible == true ?
                            <button type={'button'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white " disabled>
                                <BtnLoader />
                            </button>
                            :
                            <button type={'submit'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                <span>Ok</span>
                            </button>
                        }
                    </div>
                </form>
            </CModal>
        </>
    )
}

export default ModalAuthAddAddress;
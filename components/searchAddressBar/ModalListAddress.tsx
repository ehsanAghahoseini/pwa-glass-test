import { useEffect, useState, useContext } from "react";
import CModal from "../CModal/CModal";
import { toast } from "react-toastify";
import CheckUserAuth from "../checkUserAuth/CheckUserAuth";
import { ModalListAddressProps } from "../../types/type-props/ModalListAddressProps";
import AddressLoader from "../layout/AddressLoader";
import dynamic from "next/dynamic";
import { GetAddreessFromLatLng } from "../../apis/address-api/address-api";
import BtnLoader from "../layout/BtnLoader";
import { ContextAddress } from "../context/ContextAddress";

const MapCont:any = dynamic(() => import('../map/MapCont'), {
    ssr: false
})


const ModalListAddress = ({ visible, display, setDisplay, setVisible, setVisibleAddAddress, listAddress }: ModalListAddressProps) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false);
    const [position, setPosition] = useState<any>([24.0937676, 53.4281644]);
    const CtxAddress = useContext(ContextAddress);

    const localAddAddress = async () => {
        setDisplayBtn(true)
        try {
            const res = await GetAddreessFromLatLng(position)
            setDisplayBtn(false)
            if (res.address && res.display_name) {
                let data = {
                    'state': res.address?.state,
                    'city': res.address?.town,
                    'address': res.display_name,
                    "location": {
                        "lat": position[0],
                        "lng": position[1]
                    },
                }
                CtxAddress.setSelectedAddress(data)
                localStorage.setItem('selectedAddress', JSON.stringify(data));
                setVisible(false)
            }
        }
        catch {
            setDisplayBtn(false)
        }
    }

    const onFinishAddress = (address: any) => {
        CtxAddress.setSelectedAddress(address)
        localStorage.setItem('selectedAddress', JSON.stringify(address));
    }

    const handelCloseModal = () => {
        if (CtxAddress.selectedAddress != null) {
            setVisible(false)
        }
        else {
            toast("Please select address or add a new address", { type: "info" })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('selectedAddress')) {
            let address = JSON.parse(String(localStorage.getItem('selectedAddress')))
            // CtxAddress.setSelectedAddress(address)
            if (localStorage.getItem('selectedAddress') != '0') {                
                setPosition([address.location.lat, address.location.lng])
            }
        }
    }, [localStorage.getItem('selectedAddress')])

    return (
        <CModal visible={visible} setVisible={setVisible} accessClose={true} radius={'30px'} width="450px" uId="Mo-listAddress-select" >
            <>
                {CheckUserAuth() == true &&
                    <div className="w-full flex flex-col p-[20px]">
                        <div className=" w-full h-[40] md:h-[50px] flex justify-between pl-[20px] mb-[10px] md:mb-0">
                            <span className=" text-sm md:text-lg">Select Location</span>
                            {localStorage.getItem('selectedAddress') && String(localStorage.getItem('selectedAddress')) != '0' &&
                                <span className="cursor-pointer mr-1" onClick={() => { setVisible(false) }}>X</span>
                            }
                        </div>
                        <div className=" w-full flex flex-col">
                            {display == false &&
                                <>
                                    {listAddress.map((item: any, index: any) =>
                                        <div key={index} onClick={() => onFinishAddress(item)} className=" w-full min-h-[40px] border-b pb-[8px] cursor-pointer flex items-center">
                                            <div className=" w-[15px] h-[15px] border border-gr-300 rounded-full flex justify-center items-center">
                                                {CtxAddress.selectedAddress?.id == item.id &&
                                                    <div className=" w-[8px] h-[8px] bg-gr-300 rounded-full" />
                                                }
                                            </div>
                                            <svg x="0px" y="0px" viewBox="0 0 124 124" className="fill-gr-300 ml-[10px] h-4 w-4 " >
                                                <use xlinkHref="/assets/svg/location-color.svg#location-color" />
                                            </svg>
                                            <pre className=" ml-[10px] text-gray-500 w-[calc(100%-25px)] p-3 flex flex-wrap text-justify overflow-hidden">{item.address}</pre>
                                        </div>
                                    )}
                                    <span onClick={() => { setVisibleAddAddress(true) }} className="text-gr-300 mt-[10px] cursor-pointer"> + Add new address</span>
                                </>
                            }
                            {display == true &&
                                <AddressLoader />
                            }
                        </div>
                        <div className=" w-full flex justify-center">
                            <button onClick={handelCloseModal} className=" h-[35px] w-[200px] mt-[20px] bg-gr-300 text-white cursor-pointer rounded-[30px]">Confirm</button>
                        </div>
                    </div>
                }

                {CheckUserAuth() == false &&
                    <div className="w-full flex flex-col p-[20px]">
                        <div className=" w-full h-[40] md:h-[50px] flex justify-between pl-[20px] mb-[10px] md:mb-0">
                            <span className=" text-sm md:text-lg">Please Select Location</span>
                            {localStorage.getItem('selectedAddress') && String(localStorage.getItem('selectedAddress')) != '0' &&
                                <span className="cursor-pointer mr-1" onClick={() => { setVisible(false) }}>X</span>
                            }
                        </div>
                        <div className=" w-full h-[300px] bg-gray-400 rounded-[30px] overflow-hidden">
                            {visible &&
                                <MapCont position={position} setPosition={setPosition} enableChangeMarker={true} />
                            }
                        </div>
                        <div className=" w-full flex justify-center">
                            {displayBtn == false ?
                                <button onClick={localAddAddress} className=" h-[35px] w-[200px] mt-[20px] bg-gr-300 text-white cursor-pointer rounded-[30px]">Confirm</button>
                                :
                                <button className=" h-[35px] w-[200px] mt-[20px] bg-gr-300 text-white  rounded-[30px] relative flex justify-center items-center"><BtnLoader /></button>
                            }
                        </div>
                    </div>
                }
            </>
        </CModal>
    )
}

export default ModalListAddress;
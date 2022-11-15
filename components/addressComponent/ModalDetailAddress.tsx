import { useEffect, useState } from "react";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";
import dynamic from "next/dynamic";
import { ModalDetailAddressProps } from "../../types/type-props/ModalDetailAddressProps";
import { customApi, baseUrl } from "../../apis";
import { toast } from "react-toastify";
import { AddressAddApi } from "../../apis/address-api/address-api";

const MapCont:any = dynamic(() => import('../map/MapCont'), {
    ssr: false
})

const ModalDetailAddress = ({ visible, setVisible, addressSelect }: ModalDetailAddressProps) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const [position, setPosition] = useState<any>([24.0937676, 53.4281644]);



    return (
        <>
            <CModal visible={visible} setVisible={setVisible} radius={'30px'} uId="Mo-detailaddress" >
                <div className=" w-full  flex flex-col p-4">
                    {addressSelect != null &&
                        <>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">Name </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.name}</div>
                            </div>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">Phone </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.mobile}</div>
                            </div>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">State </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.state}</div>
                            </div>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">City </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.city}</div>
                            </div>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">Postal Code </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.postcodez}</div>
                            </div>
                            <div className=" w-full flex flex-col">
                                <span className="text-gray-600">Address </span>
                                <div className=" h-9   border-b-2 border-gr-300 text-gray-600 mt-1 mb-4 px-1 flex items-center " >{addressSelect.address}</div>
                            </div>
                            <div className=" w-full flex flex-col mt-[50px]">
                                <span className="text-gray-600 ml-[10px] mb-[10px]">Location </span>
                                <div className=" w-full h-[200px] rounded-[30px] overflow-hidden">
                                    {visible == true &&
                                        <MapCont enableChangeMarker={false} position={[addressSelect.location.lat, addressSelect.location.lng]} setPosition={setPosition} />
                                    }
                                </div>
                            </div>
                            <div className=" w-full flex flex-col mt-4">
                                <button onClick={()=>setVisible(false)} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                    <span>Ok</span>
                                </button>
                            </div>
                        </>
                    }
                </div>
            </CModal>
        </>
    )
}

export default ModalDetailAddress;
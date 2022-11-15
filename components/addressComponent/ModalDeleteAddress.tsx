import { useEffect, useState, useContext } from "react";
import CModal from "../CModal/CModal";
import BtnLoader from "../layout/BtnLoader";
import dynamic from "next/dynamic";
import { customApi, baseUrl } from "../../apis";
import { toast } from "react-toastify";
import { AddressDeleteApi } from "../../apis/address-api/address-api";
import { ModalDeleteAddressProps } from "../../types/type-props/ModalDeleteAddressProps";
import { ContextAddress } from "../../components/context/ContextAddress";


const ModalDeleteAddress = ({ visible, setVisible, addressSelect, setAddressSelect, reload, listAddress, setActiveAddress, activeAddress }: ModalDeleteAddressProps) => {
    const [displayBtn, setDisplayBtn] = useState<boolean>(false)
    const CtxAddress = useContext(ContextAddress);

    const deleteAddress = async () => {
        setDisplayBtn(true)
        try {
            const res = await AddressDeleteApi(addressSelect.id)
            toast("delete success", { type: "success" })
            setVisible(false);
            setAddressSelect(null)
            await reload()
            if (activeAddress == addressSelect.id) {
                let data = [...listAddress] ;
                for(let i in data){
                    if(data[i].id == addressSelect.id){
                        data.splice(+i , 1)
                    }
                }
                localStorage.setItem('selectedAddress', JSON.stringify(data[0]));
                CtxAddress.setSelectedAddress(data[0])
                setActiveAddress(data[0].id)
            }
        }
        catch {
            setDisplayBtn(false)
        }


        setDisplayBtn(true)
        const res = await customApi({ url: `${baseUrl}/profile/addresses/${addressSelect.id}` }, { method: 'DELETE', token: true })
        setDisplayBtn(false)
        if (res.status == true) {
            toast("delete success", { type: "success" })
            setVisible(false);
            setAddressSelect(null)
            reload()
        }
    }


    return (
        <>
            <CModal visible={visible} setVisible={setVisible} radius={'30px'} uId="Mo-deleteaddress" >
                <div className=" w-full flex flex-col p-4">
                    <span className="text-gray-600">{`Are you sure delete address ${addressSelect?.name} ?`}</span>
                    <div className="flex justify-around mt-[20px]">
                        {displayBtn == true && visible == true ?
                            <button type={'button'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white " disabled>
                                <BtnLoader />
                            </button>
                            :
                            <button onClick={deleteAddress} type={'submit'} className=" w-[120px] h-10 bg-gr-300 flex items-center justify-center rounded-[30px] text-white">
                                <span>Ok</span>
                            </button>
                        }
                        <button type={'button'} onClick={() => { setVisible(false) }} className=" w-[120px] h-10 border border-gr-300 flex items-center justify-center rounded-[30px] text-gr-300">
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </CModal>
        </>
    )
}

export default ModalDeleteAddress;
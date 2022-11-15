
export declare type ModalDeleteAddressProps = {
    visible: boolean,
    listAddress:any,
    setVisible: (text: boolean) => void;
    setAddressSelect: (text: any) => void;
    setActiveAddress: (text: any) => void;
    reload: () => void;
    activeAddress:number ,
    addressSelect: {
        id:number ;
        name: string;
        address: string;
        mobile: string;
        city: string;
        state: string;
        postcodez: string;
        location: {
            lat: string,
            lng: string
        }
    }
}
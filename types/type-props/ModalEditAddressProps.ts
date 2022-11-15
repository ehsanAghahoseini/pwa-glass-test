
export declare type ModalEditAddressProps = {
    visible: boolean,
    setVisible: (text: boolean) => void;
    setAddressSelect: (text: any) => void;
    reload: () => void;
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
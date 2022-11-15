
export declare type ModalDetailAddressProps = {
    visible: boolean,
    setVisible: (text: boolean) => void;
    addressSelect: {
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
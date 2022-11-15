import { AddressModel } from "../models/address.types";

export declare type ModalListAddressProps = {
    visible: boolean,
    display: boolean,
    setVisible: (text: boolean) => void;
    setVisibleAddAddress: (text: boolean) => void;
    setDisplay: (text: boolean) => void;
    listAddress : AddressModel[] ,
}
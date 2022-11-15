
export declare type ModalProps = {
    title?: string,
    visible: boolean,
    setVisible: (text: boolean) => void;
    onScap?: () => void;
    children?: JSX.Element | JSX.Element[] ,
    accessClose? : boolean ,
    width? : string ,
    radius? : string ,
    uId:string ,
    className?: string
}
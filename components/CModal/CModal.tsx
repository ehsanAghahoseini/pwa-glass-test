import React, { useEffect } from "react";
import { ModalProps } from "../../types/type-props/ModalProps";

function CModal({ title, visible, setVisible, onScap, children, accessClose = false , width = '500px' , radius="5px" , uId, className }: ModalProps) {


    useEffect(() => {
        toggle(visible)
    }, [visible])

    function toggle(val: any) {
        const body = document.getElementsByTagName("body")[0];
        if (val) {
            body.style.touchAction = "none";
            body.style.width = "100%";
            body.style.overflow = "hidden";
        } else {
            body.style.touchAction = "unset";
            body.style.width = "unset";
            body.style.overflow = "auto";
        }
    }


    const handelClose = () => {
        if (accessClose == false) {            
            const Modal = document.getElementById(`CModal-${uId}`);
            const contModal = document.getElementById(`CModal-cont-${uId}`);
            window.addEventListener('click', function (e: any) {
                if (Modal!.contains(e.target)) {
                    if (!contModal!.contains(e.target)) {
                        // Modal.classList.remove('CModal-active')
                        setVisible(false)
                        if (onScap) {
                            onScap()
                        }
                    }
                }
            });
        }
    }


    useEffect(() => {
        handelClose()
    }, [])



    return (
        <div id={`CModal-${uId}`} className={`CModal ${visible && 'CModal-active'}`}>

            <div id={`CModal-cont-${uId}`} className={`CModal-cont ${className}`} style={{width:width , borderRadius:radius}}>
                {title &&
                    <div className="CModel-head">
                        <h4>{title}</h4>
                    </div>
                }
                {children}
            </div>
        </div>
    )
}

export default CModal;
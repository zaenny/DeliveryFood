import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

//className이 외부로부터 설정되지않으면 빈칸으로 넣기 
export default function Modal({children, open, onClose, className = ''}){
    const dialog = useRef();    

    useEffect(() => {
        const modal = dialog.current;
        if(open){
            modal.showModal();
        }

        return () => modal.close();
    },[open]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>
        , document.getElementById('modal')
    );    

}
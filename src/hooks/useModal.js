import { useState } from "react";
import { createPortal } from "react-dom";

function useModal(ModalComponent){
    const [isShowing,setIsShowing] = useState(false)
    const modalShowing = ()=>{
        setIsShowing(true)
    }

    function modalHide(){
        setIsShowing(false);
    }

    const ModalExport = ({data})=>{
        return isShowing && createPortal(<ModalComponent data = {data}  modalHide = {modalHide} />,document.body)
    }
    
    return  [ModalExport,modalShowing,isShowing,modalHide]
       
    
}

export default useModal;
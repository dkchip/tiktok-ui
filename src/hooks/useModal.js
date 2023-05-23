import { useState } from "react";
import { createPortal } from "react-dom";

function useModal(ModalComponent){
    const [isShowing,setIsShowing] = useState(false)
    const [confirm,setConfirm] = useState(false)
    const modalShowing = ()=>{
        setIsShowing(true)
    }

    function modalHide(){
        setIsShowing(false);
    }

    const handleConfirm = () => {
        setConfirm(!confirm);
        modalHide()
        
    }

    const ModalExport = ({data})=>{
        return isShowing && createPortal(<ModalComponent data = {data}  modalHide = {modalHide} handleConfirm = {handleConfirm}/>,document.body)
    }
    
    return  [ModalExport,modalShowing,isShowing,modalHide,confirm]
       
    
}

export default useModal;
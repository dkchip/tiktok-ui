import { useState } from "react";
import { createPortal } from "react-dom";

function useToast(Component) {
    const [isShowing,setIsShowing] = useState(false)
    const [content,setContent] = useState("")

    const handleToastShowing = (textValue) => {
        setContent(textValue)
        setIsShowing(true);
    }

    const handleToastHide = () => {
        setIsShowing(false);
    }

    const ToastExport = () => {
        return isShowing && createPortal(
            <Component handleHide = {handleToastHide} content = {content}  /> 
        ,document.body)
    }
    return [ToastExport,handleToastShowing];
}

export default useToast
;
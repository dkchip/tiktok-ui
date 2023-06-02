import classNames from "classnames/bind";

import {useTimeout} from "../../hooks/useTimeout"
import styles from "./ToastMessage.module.scss"

const cx = classNames.bind(styles)
function ToastMessage({handleHide,content}) {
    useTimeout(handleHide,3000)

    return ( 
        <div className={cx("wrapper")}>
            <span className={cx("text")}>
                {content}
            </span>
        </div>
     );
}

export default ToastMessage;
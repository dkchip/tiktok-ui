import styles from "./ModalLoading.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles)
function ModalLoading() {
    return ( <div className={cx("wrapper")}>
        <div className={cx("content")}>
            <div className={cx('loadingio-spinner-dual-ball-lwjvw2p7xft')}>
                <div className={cx('ldio-ol68y82xof9')}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>  
        </div>
    </div> );
}

export default ModalLoading;
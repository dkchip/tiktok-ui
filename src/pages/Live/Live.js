import styles from './Live.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Live() {
    document.title = "Tiktok - Make your day"
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("bgr-image")}></div>
                <div className = {cx("content")}>
                    <h1 className={cx("heading")}>
                        SẮP <br/> RA MẮT
                    </h1>
                    <span className={cx("title")}>
                        Thằng làm web còn non nên cứ từ từ !
                    </span>
                </div>
            </div>
        </div>
     );
}

export default Live;
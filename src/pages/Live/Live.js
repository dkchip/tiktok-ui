import styles from './Live.modeule,.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
function Live() {
    return ( 
        <div classNames={cx("wrapper")}>
            <div classNames={cx("container")}>
                <div classNames={cx("bgr-image")}></div>
                <div></div>
            </div>
        </div>
     );
}

export default Live;
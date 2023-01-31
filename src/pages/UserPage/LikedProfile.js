import classNames from 'classnames/bind';
import { LockLargeIcon } from '../../components/Icon';
import styles from './UserPage.module.scss';

const cx = classNames.bind(styles);
function LikedProfile({data}) {
    return ( 
        <div className={cx("container")}>
            <div className={cx("wrapper")}>
                <LockLargeIcon />
                <h2 className={cx("title")}>Video đã thích của người dùng này ở trạng thái riêng tư</h2>
                <span className={cx("desc")}>
                  Các video được thích bởi {data.nickname} hiện đang ẩn
                </span>
            </div>
        </div>
     );
}

export default LikedProfile;
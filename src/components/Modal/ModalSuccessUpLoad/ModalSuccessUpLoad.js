import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import Button from '../../Button';
import styles from './ModalSuccessUpLoad.module.scss';

const cx = classNames.bind(styles);

function ModalSuccessUpLoad({modalHide}) {
    const currentUser = useSelector(state => state.user.currentUser)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx("heading")}>
                    <h2 >Your videos are being uploaded to TikTok!</h2>
                   
                </div>
                <div className={cx("btn-container")}>
                        <Button primary onclick={modalHide}> Your videos are being uploaded to TikTok!</Button>
                        <Button outline href ={`/@${currentUser.nickname}`} onclick={modalHide}>View Profile</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalSuccessUpLoad;

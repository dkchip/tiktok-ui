import classNames from 'classnames/bind';

import Button from '../../Button';
import styles from './ModalDeleteVideo.module.scss';

const cx = classNames.bind(styles);

function ModalConfirm({modalHide,handleConfirm}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx("heading")}>
                    <h2 >Are you sure you want to delete this video?</h2>
                </div>
                <div className={cx("btn-container")}>
                        <Button outline onclick={() => {
                            handleConfirm(modalHide)
                     
                        }}> Delete</Button>
                        <Button outline onclick={modalHide}>Cannel</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;

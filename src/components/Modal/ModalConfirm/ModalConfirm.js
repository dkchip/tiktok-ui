import classNames from 'classnames/bind';

import Button from '../../Button';
import styles from './ModalConfirm.module.scss';

const cx = classNames.bind(styles);

function ModalConfirm({modalHide,handleConfirm}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx("heading")}>
                    <h2 >Replace this video?</h2>
                    <span>Caption and video settings will still be saved.</span>
                </div>
                <div className={cx("btn-container")}>
                        <Button primary onclick={() => {
                            handleConfirm()
                     
                        }}> Replace</Button>
                        <Button outline onclick={modalHide}>Continue editting</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;

import classNames from 'classnames/bind';

import Button from '../../Button';
import styles from './ModalDiscard.module.scss';

const cx = classNames.bind(styles);

function ModalDiscard({modalHide,handleConfirm}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx("heading")}>
                    <h2 > Discard this post?</h2>
                    <span>The video and all edits will be discarded.</span>
                </div>
                <div className={cx("btn-container")}>
                        <Button primary onclick={() => {
                            handleConfirm()
                     
                        }}> Discard</Button>
                        <Button outline onclick={modalHide}>Continue editting</Button>
                </div>
            </div>
        </div>
    );
}

export default ModalDiscard;

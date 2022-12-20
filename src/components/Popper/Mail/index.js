import { Wrapper } from '..';
import Tippy from '@tippyjs/react';
import style from './Mail.module.scss';
import classnames from 'classnames/bind';


const cx = classnames.bind(style);
function Mail({ children }) {
    return (
        <Tippy
            visible = {false}
            content="Hộp thư"
            placement="bottom"
            interactive = {true}
            render={ attrs => (
                <div className={cx('mail-result')} tabIndex = '-1' {...attrs}>
                    <Wrapper>
                        Áá
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Mail;

import Tippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import { useState } from 'react';

import style from './Mail.module.scss';
import { Wrapper } from '..';
import HeaderMail from './HeaderMail';

const cx = classnames.bind(style);
const MENU_MAIL = [
    {
        id: 1,
        title: 'Tất cả hoạt động',
        content: '1',
    },
    {
        id: 2,
        title: 'Thích',
        content: '2',
    },
    {
        id: 3,
        title: 'Bình luận',
        content: '3',
    },
    {
        id: 4,
        title: 'Lượt nhắc đến và lượt gắn thẻ',
        content: '4',
    },
    {
        id: 5,
        title: 'Follower',
        content: '5',
    },
];
function Mail({ children, onHide, visible }) {
    const [curent, setCurent] = useState('1');

    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={onHide}
            render={(attrs) => (
                <div className={cx('mail-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <HeaderMail items={MENU_MAIL} curent={curent} setCurent={setCurent} />
                        <div className={cx('container')}>
                            <span className={cx('time-mail')}>Trước đây</span>
                            {MENU_MAIL.map((item, index) => {   
                            return (
                                <div key={index} className={cx('mail-item')}>
                                    {curent === `${item.id}` && item.title}
                                </div>
                            );
                        })}
                        </div>
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Mail;

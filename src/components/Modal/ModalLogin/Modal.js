import {  useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { MENU_LOGIN, MENU_REGISTER } from '../../../data/dataModal';
import { CloseIcon, ArrowLeftIcon,ArrowDownIcon } from '../../Icon';
import Button from '../../Button';

const cx = classNames.bind(styles);

function Modal({ modalHide }) {
    const [tabList, setTabList] = useState([MENU_LOGIN]);
    const [quantity, setQuantity] = useState(3);
    const [isRegister, setIsRegister] = useState(false);

    const curent = tabList[tabList.length - 1];
    
    const hideModal = () => {
        modalHide();
    };

    const handleBack = () => {
        setTabList((prev) => prev.slice(0, 1));
    };

    const changeModal = (e)=>{
        e.preventDefault();
        if(!isRegister){
            setTabList([MENU_REGISTER]);
            setIsRegister(true);
        }else{
            setTabList([MENU_LOGIN]);
            setIsRegister(false);
            setQuantity(3)
        }
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <header className={cx('header')}>
                    <i className={cx('icon-back')} onClick={handleBack}>
                        {tabList.length > 1 ? <ArrowLeftIcon /> : ''}
                    </i>
                    <i className={cx('icon-close')} onClick={hideModal}>
                        <CloseIcon />
                    </i>
                </header>
                {/* Body */}
                <div className={cx('body')}>
                    {curent && (
                        <div className={cx('container')}>
                            <h1 className={cx('title')}>{curent.title}</h1>
                            <div className={cx('content-sub')}>
                                <div className={cx('list')}>
                                    {curent.type === 'children' ? (
                                        <curent.data />
                                    ) : (
                                        curent.data.slice(0, isRegister === true ? quantity : curent.length ).map((item, index) => {
                                            return (
                                                <div key={index} className={cx('btn')}>
                                                    <Button
                                                        disabled={item.disabled}
                                                        onclick={() => {
                                                            setTabList((prev) => [...prev, item.children]);
                                                        }}
                                                        to={item.path}
                                                        outline
                                                        iconLeft={item.icon}
                                                    >
                                                        {item.title}
                                                    </Button>
                                                </div>
                                            );
                                        })
                                    )}

                                    {isRegister && curent.type !== 'children' ? (
                                        <div>
                                            <i
                                                className={cx(
                                                    'icon',
                                                    `${quantity === curent.length ? 'hide' : ''}`,
                                                )}
                                                onClick={() => {
                                                    setQuantity(curent.length);
                                                }}
                                            >
                                                <ArrowDownIcon />
                                            </i>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={cx('footer')}>
                    <span className={cx('text')}>
                        {!isRegister  ? 'Bạn không có tài khoản ?' : 'Bạn đã có tài khoản ?'}
                    </span>
                    <a href="" className={cx('link')} onClick={(e)=>{changeModal(e)}}>
                        {!isRegister  ? 'Đăng ký' : 'Đăng nhập'}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Modal;

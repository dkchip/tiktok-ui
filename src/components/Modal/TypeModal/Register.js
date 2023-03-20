import classNames from 'classnames/bind';
import { useState } from 'react';
import { ArrowDownIcon } from '../../Icon';
import styles from './TypeModal.module.scss';
import Button from '../../Button';

import {
   
} from '../../Icon';
const cx = classNames.bind(styles);

function Register() {
    const [quantity , setQuantity] = useState(3)
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Đăng ký Tiktok</h1>
            <div className={cx('content')}>
                <div className={cx('list')}>
                    {MENU_REGISTER.slice(0,quantity).map((item, index) => {
                        return (
                            <div key={index} className={cx('btn')}>
                                <Button  outline iconLeft={item.icon}>
                                    {item.title}
                                </Button>
                            </div>
                        );
                    })}
                    <div >
                        <i className={cx('icon',`${quantity === MENU_REGISTER.length ?"hide" :""}`)}
                         onClick={()=>{
                            setQuantity(MENU_REGISTER.length)
                        }}>
                            <ArrowDownIcon />
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

import { useState } from "react";
import { ScrollTopIcon } from "../Icon";
import classNames from 'classnames/bind';
import styles from './ButtonBottom.module.scss'

const cx = classNames.bind(styles);
function ButtonBottom() {
    const [show,setShow] = useState(false);

    const scrollToTop = ()=>{
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        })
    }

    window.addEventListener('scroll',()=>{
        const scroller = document.documentElement.scrollTop
        if(scroller > 200){
            setShow(true)
        }else{
            setShow(false)
        }
    })
    return (
        <div className={cx('bottom-container', `${show ? 'bottom-30' : ''}`)}>
            <button className={cx('btn-dowload')}>Tải ứng dụng</button>
            <button onClick={scrollToTop} className={cx('btn-scroll-top')}>
                <ScrollTopIcon />
            </button>
        </div>
    );
}

export default ButtonBottom;

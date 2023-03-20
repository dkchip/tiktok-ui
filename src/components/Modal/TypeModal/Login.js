import classNames from 'classnames/bind';
import styles from './TypeModal.module.scss';
import { EyeHideIcon,EyeShowIcon } from '../../Icon';
import { useState } from 'react';
import store from '../../../redux/store';
import { loginUser } from '../../../services/userServices';
import { setUser } from '../../../redux/actions';
import {useNavigate} from "react-router-dom"
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
function Login() {
    const history = useNavigate();
    const [show,setShow] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState("");

    const onChangeType =  ()=>{
        setShow(!show);
    }

    const goToHomePage = ()=>{
        history("/");
    }

    const handleLogin = (e)=>{
        e.preventDefault();
        loginUser(email,password)
        .then((res)=>{
            store.dispatch(setUser(res.data));
            Cookies.remove("tokenAuth")
            Cookies.set("tokenAuth",res.meta.token);
            window.location.reload();
            goToHomePage();
        })
        .catch((e)=>{
            
        })
    }


    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <span>Email</span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('account')}>
                            <input type="text" placeholder="Nhập email"  onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div className={cx('password')}>
                            <input type={!show ? "password" : "text"} placeholder="Mật khẩu" onChange={(e)=>{setPassword(e.target.value)}} />
                            <i className={cx('showhide')} onClick = {onChangeType}>
                                {!show ? <EyeHideIcon /> : <EyeShowIcon/>}
                            </i>
                        </div>
                    </div>
                    <a className={cx('link')}>Quên mật khẩu?</a>
                </div>
                <div className={cx('submit')}>
                    <button className={cx('btn-submit')} onClick={(e)=>{handleLogin(e)}}>Đăng nhập</button>
                </div>
            </form>
        </div>
    );
}

export default Login;

import classNames from 'classnames/bind';
import styles from './TypeModal.module.scss';
import { EyeHideIcon, EyeShowIcon } from '../../Icon';
import { useState, useContext } from 'react';
import { loginUser } from '../../../services/userServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';
import { ModalLoadingContextKeys } from '../../../contexts/ModalLoadingContext';

const cx = classNames.bind(styles);
function Login() {
    const history = useNavigate();
    const { isShowingModalLoad, isHideModalLoad } = useContext(ModalLoadingContextKeys);

    const [show, setShow] = useState(false);
    const [account,setAccount] = useState({
        email : "",
        password : ""
    })

    const [booleanMessage,setBooleanMessage] = useState({
        email : false,
        password : false
    })

    const [booleanValue,setBooleanValue] = useState({
        email : false,
        password : false
    });

    const [errorLogin,setErrorLogin] = useState(false);

    const dispatch = useDispatch();
    const onChangeType = () => {
        setShow(!show);
    };

    const goToHomePage = () => {
        history('/');
    };

    
    function ValidateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        }
        return false;
    }


    const onChangeValue = (e)=>{
        setAccount({
            ...account,
            [e.target.name] : e.target.value
        })

        handleCheckValue(e)
        setErrorLogin(false);

    }

    const handleCheckValue = (e)=>{
        switch(e.target.name){
            case "email" :
                if(ValidateEmail(e.target.value)){ 
                    setBooleanMessage({
                        ...booleanMessage,
                        email : false
                    })
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : true
                    })
                }else{
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : true
                    })
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : false
                    })
                }
            break;
            case "password" :
                if(e.target.value.length > 5 ){
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : false,
                    })
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : true
                    })
                }else{

                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : true
                    })
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : false
                    })
                }
            break;
           
        }
    }


    const handleLogin = (e) => {
        e.preventDefault();
        if(booleanValue.email && booleanValue.password){
            isShowingModalLoad();
            setTimeout(() => {
                loginUser(account.email, account.password)
                    .then((res) => {
                        dispatch(setUser(res.data));
                        Cookies.remove('tokenAuth');
                        Cookies.set('tokenAuth', res.meta.token);
                        window.location.reload();
                        goToHomePage();
                        isHideModalLoad();
                    })
                    .catch((e) => {
                        setErrorLogin(true);
                        isHideModalLoad();
                    });
            }, 500);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('form')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <span>Email</span>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('account')}>
                            <input
                                className={cx(`${booleanMessage.email ? "error-input" : null}`)}
                                type="text"
                                value={account.email}
                                placeholder="Nhập email"
                                name='email'
                                onChange={(e) => {
                                    onChangeValue(e)
                                }}
                            />
                            {booleanMessage.email && (
                                <span className={cx('error-message')}>Tài khoản phải là email !</span>
                            )}
                        </div>
                        <div className={cx('password')}>
                            <input
                                className={cx(`${booleanMessage.password ? "error-input" : null}`)}
                                type={!show ? 'password' : 'text'}
                                value={account.password}
                                placeholder="Mật khẩu"
                                name='password'
                                onChange={(e) => {
                                    onChangeValue(e)
                                }}
                            />
                            <i className={cx('showhide')} onClick={onChangeType}>
                                {!show ? <EyeHideIcon /> : <EyeShowIcon />}
                            </i>
                            {booleanMessage.password && (
                                <span className={cx('error-message')}>Mật khẩu phải lớn hơn 5 kí tự</span>
                            )}
                        </div>
                    </div>
                    <a className={cx('link')}>Quên mật khẩu?</a>
                    {
                        errorLogin ? <span className={cx("error-register")}>Tài khoản hoặc mật khẩu không chính xác</span> : null
                    }
                </div>
                <div className={cx('submit')}>
                    <button
                        className={cx('btn-submit')}
                        onClick={(e) => {
                            handleLogin(e);
                        }}
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;

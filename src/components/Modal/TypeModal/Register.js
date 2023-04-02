import classNames from 'classnames/bind';
import styles from './TypeModal.module.scss';
import { EyeHideIcon, EyeShowIcon } from '../../Icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';
import { registerUser } from '../../../services/userServices';
import { useContext } from 'react';
import { ModalLoadingContextKeys } from '../../../contexts/ModalLoadingContext';


const cx = classNames.bind(styles);
function Register() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const {isShowingModalLoad,isHideModalLoad} = useContext(ModalLoadingContextKeys);
    const [show, setShow] = useState(false);
    const [errorRegister,setErrorRegister] = useState(false);
    const [account,setAccount] = useState({
        email :"",
        password :"",
        repassword :""
    })

    const [booleanValue,setBooleanValue] = useState({
        email : false,
        password : false,
        repassword : false
    })

    const [booleanMessage,setBooleanMessage] = useState({
        email : false,
        password : false,
        repassword : false
    })

    const onChangeValue = (e)=>{
        setAccount({
            ...account,
            [e.target.name] : e.target.value
        })

        handleCheckValue(e)
        setErrorRegister(false);

    }

    const handleCheckValue = (e)=>{
        switch(e.target.name){
            case "email" :
                if(ValidateEmail(e.target.value)){ 
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : true
                    })
                    setBooleanMessage({
                        ...booleanMessage,
                        email : false
                    })
                }else{
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : false
                    })
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : true
                    })
                }
            break;
            case "password" :
                if(e.target.value.length > 5 ){
                    if(e.target.value === account.repassword){
                        setBooleanValue({
                            ...booleanValue,
                          [e.target.name] : true,
                            repassword : true
                        })
                        setBooleanMessage({
                            ...booleanMessage,
                          [e.target.name] : true,
                          [e.target.name] : false,

                            repassword : false
                        })
                    }else{
                        setBooleanValue({
                            ...booleanValue,
                          [e.target.name] : true,
                            repassword : false
                        })
                        setBooleanMessage({
                            ...booleanMessage,
                          [e.target.name] : false,
                            repassword : true
                        })
                    }
                }else{
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : false
                    })
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : true
                    })
                }
            break;
            case "repassword" :
                if(e.target.value === account.password){
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : true
                    })
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : false
                    })
                }else{
                    setBooleanValue({
                        ...booleanValue,
                        [e.target.name] : false
                    })
                    setBooleanMessage({
                        ...booleanMessage,
                        [e.target.name] : true
                    })
                }
        }
    }


    function ValidateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(booleanValue.email && booleanValue.password && booleanValue.repassword){
            isShowingModalLoad();
            setTimeout(()=>{
                    registerUser(account.email,account.repassword,"email")
                    .then((res)=>{
                        Cookies.set("tokenAuth",res.meta.token)
                        dispatch(setUser(res.data))
                        window.location.reload();
                        goToHomePage();
                        isHideModalLoad();
                    })
                    .catch((err)=>{
                        if(err.message){
                            setErrorRegister(true);
                            isHideModalLoad();
                        }
                    })
            },600)
        }else{
            alert("error")
        }
    }
    const onChangeType = () => {
        setShow(!show);
    };

    const goToHomePage = () => {
        history('/');
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
                                name="email"
                                onChange={(e)=>{
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
                                name="password"
                                onChange={(e)=>{
                                    onChangeValue(e)
                                }}
                            />
                            {booleanMessage.password && (
                                <span className={cx('error-message')}>Mật khẩu phải lớn hơn 5 kí tự ! </span>
                            )}
                            <i className={cx('showhide')} onClick={onChangeType}>
                                {!show ? <EyeHideIcon /> : <EyeShowIcon />}
                            </i>
                        </div>
                        <div className={cx('password')}>
                            <input
                                className={cx(`${booleanMessage.repassword ? "error-input" : null}`)}
                                type={!show ? 'password' : 'text'}
                                value={account.repassword}
                                placeholder="Nhập lại mật khẩu"
                                name="repassword"
                                onChange={(e)=>{
                                    onChangeValue(e)
                                }}
                            />
                            {booleanMessage.repassword && (
                                <span className={cx('error-message')}>Mật khẩu không trùng khớp !</span>
                            )}
                        </div>
                    </div>
                    <a className={cx('link')}>Quên mật khẩu?</a>
                </div>
                {errorRegister && <span className={cx("error-register")}>Tài khoản này đã tồn tại !!</span>}
                <div className={cx('submit')}>
                    <button
                        className={cx('btn-submit')}
                        onClick={(e) => {
                            handleSubmit(e);
                        }}
                    >
                        Đăng ký
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Register;

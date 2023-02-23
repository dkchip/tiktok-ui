import classNames from 'classnames/bind';
import styles from './TypeModal.module.scss';
import Button from '../../Button';

import {
    QrIcon,
    UserIcon,
    FacebookIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    KakaoTalkIcon,
    AppleIcon,
    InstargramIcon,
} from '../../Icon';

const cx = classNames.bind(styles);

function Login({onclick}) {
    const MENU_LOGIN = [
        {
            title: 'Sử dụng mã QR',
            icon: <QrIcon />,
            name : "qrcode",
            click : onclick
        },
        {
            title: 'Số điện thoại / Email / Tiktok Id',
            icon: <UserIcon />,
            disabled :"disabled"
        },
        {
            title: 'Tiếp tục với Facebook',
            icon: <FacebookIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với Google',
            icon: <GoogleIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với Twitter',
            icon: <TwitterIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với Line',
            icon: <LineIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với KakaoTalk',
            icon: <KakaoTalkIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với Apple',
            icon: <AppleIcon />,
            disabled :"disabled"

        },
        {
            title: 'Tiếp tục với Instargram',
            icon: <InstargramIcon />,
            disabled :"disabled"

        },
    ];
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Đăng nhập vào Tiktok</h1>
            <div className={cx('content')}>
                <div className={cx('list')}>
                    {MENU_LOGIN.map((item, index) => {
                        return (
                            <div key={index} className={cx('btn')}>
                                <Button disabled={item.disabled} 
                                        onclick={item.click ? ()=>{item.click(item.name)} : null} 
                                        to={item.path} 
                                        outline 
                                        iconLeft={item.icon}
                                >
                                    {item.title}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Login;

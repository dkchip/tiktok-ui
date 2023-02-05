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
const MENU_LOGIN = [
    {
        title: 'Sử dụng mã QR',
        icon: <QrIcon />,
        path: '/',
    },
    {
        title: 'Số điện thoại / Email / Tiktok Id',
        icon: <UserIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Facebook',
        icon: <FacebookIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Google',
        icon: <GoogleIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Twitter',
        icon: <TwitterIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Line',
        icon: <LineIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với KakaoTalk',
        icon: <KakaoTalkIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Apple',
        icon: <AppleIcon />,
        path: '/',
    },
    {
        title: 'Tiếp tục với Instargram',
        icon: <InstargramIcon />,
        path: '/',
    },
];
function Login() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Đăng nhập vào Tiktok</h1>
            <div className={cx('content')}>
                <div className={cx('list')}>
                    {MENU_LOGIN.map((item, index) => {
                        return (
                            <div key={index} className={cx('btn')}>
                                <Button to={item.path} outline iconLeft={item.icon}>
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

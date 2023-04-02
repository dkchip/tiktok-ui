import QrCode from "../components/Modal/TypeModal/Qrcode";
import Login from "../components/Modal/TypeModal/Login";
import Register from "../components/Modal/TypeModal/Register";
import {
    QrIcon,
    UserIcon,
    GoogleIcon,
    TwitterIcon,
    LineIcon,
    KakaoTalkIcon,
    AppleIcon,
    InstargramIcon,
    FacebookIcon,
} from '../components/Icon';


export  const MENU_LOGIN = {
    title : "Đăng nhập vào Tiktok",
    data :[
        {
            title: 'Sử dụng mã QR',
            icon: <QrIcon />,
            name : "qrcode",
            children : {
                title : "Đăng nhập bằng mã QR",
                type : "children",
                data : QrCode
            }
        },
        {
            title: 'Số điện thoại / Email / Tiktok Id',
            icon: <UserIcon />,
            name : "login",
            children : {
                title : "Đăng nhập",
                type : "children",
                data : Login
            }

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
    ]
}

export const MENU_REGISTER = {
    title : "Đăng ký Tiktok",
    data : [
        {
            title: 'Sử dụng số điện thoại hoặc email',
            icon: <UserIcon />,
            children :{
                title : "Đăng Ký",
                type : "children",
                data : Register
            }
            
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
    ]
}
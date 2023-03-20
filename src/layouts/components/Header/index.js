import { useState ,useContext, useEffect} from 'react';
import { ModalContextKeys } from '../../../contexts/ModalContext';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
        faPlus,
        faEllipsisVertical,
        faEarthAsia,
        faQuestion,
        faKeyboard,
        faSignOut,
        faUser,
        faCoins,
        faGear
      } from '@fortawesome/free-solid-svg-icons';

import Cookies from 'js-cookie';
import { logoutUser } from '../../../services/userServices';
import store from '../../../redux/store';
import routesConfig from '../../../config/routes';
import { MessageIcon,InboxIcon } from '../../../components/Icon';
import style from './Header.module.scss';
import images from '../../../asset/img';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import Mail from '../../../components/Popper/Mail';
import { Link } from 'react-router-dom';



const cx = classnames.bind(style);
const MENU_ITEM = [
    {
        icon : <FontAwesomeIcon icon = {faEarthAsia} />,
        title : 'Tiếng Việt',
        children:{
            title: 'Language',
            data :[
                {
                    title : 'Tiếng Việt',
                    code : 'vi'
                },
                {
                    title : 'English',
                    code : 'en'
                } 
            ]
        }
    },
    {
        icon : <FontAwesomeIcon icon = {faQuestion} />,
        title : 'Phản hòi và trợ giúp',
        path:'/feedback'
    },
    {
        icon : <FontAwesomeIcon icon = {faKeyboard} />,
        title : 'Phím tắt trên bàn phím'
    }
]

const userMenu =[
    {
        icon : <FontAwesomeIcon icon = {faUser} />,
        title : 'Xem hồ sơ ',
        path : '/profile'
    },
    {
        icon : <FontAwesomeIcon icon = {faCoins} />,
        title : 'Nhận xu',
        path : '/getcoin'
    },
    {
        icon : <FontAwesomeIcon icon = {faGear} />,
        title : 'Cài đặt',
        path : '/setting'

    },
    ...MENU_ITEM,
    {
        icon : <FontAwesomeIcon icon = {faSignOut} />,
        title : 'Đăng xuất',
        path : '/',
        onClick : ()=>{

            logoutUser(Cookies.get("tokenAuth"))
            .then(()=>{
                Cookies.remove("tokenAuth")     
                window.location.reload();
            })

                
        },
        separate : true,
    }
]



function Header({wider}) {
    const authData = store.getState();
    const [visible,setVisible] = useState(false)
    const {isShowingLogin} = useContext(ModalContextKeys)

    const show = () =>{
        setVisible(true)
    }
    const hide = () =>{
        setVisible(false)
    }


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')} style = {{width : wider ? '100%' : '1150px'}}>
                <div className={cx('logo')}>
                    <Link className={cx('logo-link')} to={routesConfig.home} onClick="refresh">
                        <img src={images.logo} alt="logo tiktok"></img>
                    </Link>
                </div>

                <Search />

                <div className={cx('section')}>
                    {authData.auth ? (
                           <>
                                <Button outline   iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button> 
                                <Tippy content='Tin nhắn' placement='bottom' >
                                    <button className={cx('section-btn')}>
                                        <MessageIcon />
                                    </button> 
                                </Tippy>

                                <Mail visible = {visible} onHide = {hide} >
                                    <button onClick={show} className={cx('section-btn')} >
                                       <InboxIcon />
                                    </button>
                                </Mail>
                            
                           </> 
                    ) 
                    : 
                    (
                        <>
                            <Button outline  iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button>
                            <Button  onClick ={isShowingLogin} primary >Đăng nhập</Button>
                            
                        </>
                    )}
                    <Menu items = {authData.auth ? userMenu : MENU_ITEM}>
                        {
                            authData.auth ?(

                                <Image 
                                alt ='AVT'
                                className={cx('menu-user-avt')} 
                                src={authData.currentUser.avatar} />
                            ):(
                                
                                <button>
                                        <FontAwesomeIcon className={cx('menu-icon')} icon={faEllipsisVertical}></FontAwesomeIcon>
                                </button>
                                
                            )
                        }
                                
                    </Menu>
                </div>
            </div>  
        </div>
    );
}

export default Header;

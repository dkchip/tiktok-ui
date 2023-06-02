import { useState ,useContext} from 'react';
import { ModalContextKeys } from '../../../contexts/ModalContext';
import classnames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { ModalLoadingContextKeys } from '../../../contexts/ModalLoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from 'js-cookie';
import {
        faPlus,
        faEllipsisVertical,
        faSignOut,
        faUser,
        faCoins,
        faGear
      } from '@fortawesome/free-solid-svg-icons';

import { logoutUser } from '../../../services/userServices';
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
import { useSelector } from 'react-redux';
import { MENU_ITEM } from '../../../data/dataMenu';

const cx = classnames.bind(style);




function Header({wider}) {
        
 const { isShowingModalLoad, isHideModalLoad } = useContext(ModalLoadingContextKeys);

 const authData = useSelector((state)=>state.user);
 
 const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Xem hồ sơ ',
        path: `/@${authData.currentUser.nickname}`,
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Nhận xu',
        path: '/getcoin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Cài đặt',
        path: '/setting',
    },
    ...MENU_ITEM,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Đăng xuất',
        path: '/',
        onClick: () => {

            isShowingModalLoad();
            setTimeout(() => {
                logoutUser(Cookies.get('tokenAuth'))
                    .then(() => {
                        Cookies.remove('tokenAuth');
                        window.location.reload();
                        isHideModalLoad();
                    });
            }, 500);
        },  
        separate: true,
    },
];
    const [visible,setVisible] = useState(false)
    const {isShowingLogin} = useContext(ModalContextKeys)


    const show = () =>{
        setVisible(true)
    }
    const hide = () =>{
        setVisible(false)
    }


    return (
        <div className={cx('wrapper')} >
            <div className={cx('inner')} style = {{width : wider ? '100%' : '1150px'}}>
                <div className={cx('logo')}  >
                    <Link className={cx('logo-link')} to={routesConfig.home} onClick="refresh">
                        <img src={images.logo} alt="logo tiktok"></img>
                    </Link>
                </div>

                <Search />

                <div className={cx('section')}>
                    {authData.auth ? (
                           <>
                                <Button outline to={"/upload" } onclick={()=>{}} iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button> 
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

                              <div className={cx("img-avatar")}>
                                    <Image 
                                        alt ='AVT'
                                        src={authData.currentUser.avatar} 
                                    />
                              </div>
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

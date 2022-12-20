import style from './Header.module.scss';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
        faPlus,
        faEllipsisVertical,
        faEarthAsia,
        faQuestion,
        faKeyboard,
        faPaperPlane,
        faEnvelope,
        faSignOut,
        faUser,
        faCoins,
        faGear
      } from '@fortawesome/free-solid-svg-icons';


import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'
import images from '../../../asset/img';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import Mail from '../../../components/Popper/Mail';

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
        path : '/logout',
        separate : true,
    }
]

const curentUser = true;


function Header() {


    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo tiktok"></img>
                </div>

                <Search />

                <div className={cx('section')}>
                    {curentUser ? (
                           <>
                                <Button outline  iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button> 
                                <Tippy content='Tin nhắn' placement='bottom' >
                                    <button className={cx('section-btn')}>
                                        <FontAwesomeIcon icon ={faPaperPlane}></FontAwesomeIcon>
                                    </button> 
                                </Tippy>


                               <Mail>
                                    <button className={cx('section-btn')}>
                                        <FontAwesomeIcon icon ={faEnvelope}></FontAwesomeIcon>
                                    </button>
                               </Mail>
                           </> 
                    ) 
                    : 
                    (
                        <>
                            <Button outline  iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button>
                            <Button primary >Đăng nhập</Button>

                        </>
                    )}
                    <Menu items = {curentUser ? userMenu: MENU_ITEM}>
                        {
                            curentUser ?(

                                <Image 
                                alt ='AVT'
                                className={cx('menu-user-avt')} 
                                src='https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/e23fde803839cd77bef71e4318e59203.jpeg?x-expires=1671530400&x-signature=Rnui1x8%2BSLZm3oq%2FUmJu8gOVEKY%3D' />
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

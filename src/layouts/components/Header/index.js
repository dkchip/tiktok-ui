import style from './Header.module.scss';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, 
        // faSpinner, 
        faMagnifyingGlass,
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

import { useState } from 'react';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import AccountItem from '../../../components/AccountItem';
import { Wrapper } from '../../../components/Popper';
import images from '../../../asset/img';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
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
        to:'/feedback'
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
    const[visible,setVisible] = useState(false)
    const show = ()=>{
        setVisible(true);
    }
    const hide = ()=>{
        setVisible(false);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo tiktok"></img>
                </div>

                <HeadlessTippy 
                    interactive = {true}
                    onClickOutside={hide}
                    visible = {visible} 
                    render ={attrs =>(
                                    <div className={cx('search-result')} tabIndex = '-1' {...attrs}>
                                        <Wrapper>
                                            <h4 className={cx('search-account')}>Tai Khoan</h4>
                                            <AccountItem></AccountItem>
                                            <AccountItem></AccountItem>
                                            <AccountItem></AccountItem>
                                            <AccountItem></AccountItem>
                                        </Wrapper>
                                      
                                    </div>
                                    )   
                            }
                >
                    <div className={cx('search')}>
                        <input onMouseDown={show} type="text" placeholder="Tìm kiếm tài khoản và video" />
                        <button className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* <button  className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button> */}
                        <span className={cx('line')}></span>
                        <button className={cx('search-btn')} type="button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

                <div className={cx('section')}>
                    {curentUser ? (
                           <>
                            <Button outline  iconLeft={<FontAwesomeIcon icon={faPlus}/>} >Tải lên</Button> 
                            <Tippy content='Tin nhắn' placement='bottom' >
                                <button className={cx('section-btn')}>
                                    <FontAwesomeIcon icon ={faPaperPlane}></FontAwesomeIcon>
                                </button> 
                            </Tippy>

                            <Tippy content='Hộp thư'  placement='bottom'> 
                                <button className={cx('section-btn')}>
                                    <FontAwesomeIcon icon ={faEnvelope}></FontAwesomeIcon>
                                </button>
                            </Tippy>
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
                                <img alt ='' className={cx('menu-user-avt')} src='https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/e23fde803839cd77bef71e4318e59203.jpeg?x-expires=1671530400&x-signature=Rnui1x8%2BSLZm3oq%2FUmJu8gOVEKY%3D'></img>
                                
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

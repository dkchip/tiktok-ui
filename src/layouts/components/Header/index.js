import style from './Header.module.scss';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, 
        // faSpinner, 
        faMagnifyingGlass
      } from '@fortawesome/free-solid-svg-icons';

import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';

import { Wrapper } from '../../../components/Popper';
import images from '../../../asset/img';
const cx = classnames.bind(style);

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

                <Tippy 
                    interactive = {true}
                    onClickOutside={hide}
                    visible = {visible} 
                    render ={attrs =>(
                                    <div className={cx('search-result')} tabIndex = '-1' {...attrs}>
                                        <Wrapper>
                                            <h4 className={cx('search-account')}>Tai Khoan</h4>
                                            
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
                </Tippy>

                <div className={cx('section')}></div>
            </div>
        </div>
    );
}

export default Header;

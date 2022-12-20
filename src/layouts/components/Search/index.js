import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleXmark, 
    faSpinner, 
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';



import AccountItem from '../../../components/AccountItem';
import { Wrapper } from '../../../components/Popper';
import style from './Search.module.scss';
const cx = classnames.bind(style);

function Search() {
    const[visible,setVisible] = useState(false)
    const show = ()=>{
        setVisible(true);
    }
    const hide = ()=>{
        setVisible(false);
    }
    return ( 

            <HeadlessTippy 
                    interactive = {true}
                    onClickOutside={hide}
                    visible = {visible} 
                    render ={attrs =>(
                                    <div className={cx('search-result')} tabIndex = '-1' {...attrs}>
                                        <Wrapper>
                                            <h4 className={cx('search-account')}>Tai Khoan</h4>
                                            <AccountItem />
                                            <AccountItem />
                                            <AccountItem />
                                            <AccountItem />
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
                        <button  className={cx('input-icon')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>

                        <span className={cx('line')}></span>

                        <button className={cx('search-btn')} type="button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>

     );
}

export default Search;
import classNames from "classnames/bind";
import {NavLink} from 'react-router-dom'

import style from './Menu.module.scss'

const cx = classNames.bind(style)
function MenuItem({to , title, icon , activeIcon}) {
    return ( 
        <NavLink className={(nav)=>cx('item',{active : nav.isActive})} to = {to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('active-icon')}>{activeIcon}</span>
            <h2 className={cx('title')}>{title}</h2>
        </NavLink>
     );
}

export default MenuItem;
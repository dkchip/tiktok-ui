
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import style from './Menu.module.scss';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'


const cx = classnames.bind(style);

function HeaderMenu({title,onBack}) {

    return (
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cx('header-title')}>
                {title}
            </h4>
        </header>
    )
}

export default HeaderMenu;

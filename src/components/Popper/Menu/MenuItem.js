import Button from '../../Button';

import classnames from 'classnames/bind';
import style from './Menu.module.scss';
const cx = classnames.bind(style);

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item')} 
                to = {data.to}
                iconLeft={data.icon}>
            {data.title}
        </Button>
    );
}

export default MenuItem;

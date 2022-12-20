import Button from '../../Button';

import classnames from 'classnames/bind';
import style from './Menu.module.scss';
const cx = classnames.bind(style);

function MenuItem({ data,onClick }) {
    const classes = cx('menu-item',{
        separate : data.separate

    })
    return (
        <Button className={classes} 
                to = {data.path}
                iconLeft={data.icon}
                onClick = {onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;

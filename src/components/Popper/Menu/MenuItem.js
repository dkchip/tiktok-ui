import Button from '../../Button';

import classnames from 'classnames/bind';
import style from './Menu.module.scss';
const cx = classnames.bind(style);

function MenuItem({ data,onClick }) {
    const classes = cx('menu-item',{
        separate : data.separate

    })
    console.log(classes)
    return (
        <Button className={classes} 
                to = {data.to}
                iconLeft={data.icon}
                onClick = {onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;

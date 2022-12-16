import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import style from './Button.module.scss';

const cx = classNames.bind(style);

function Button({ 
     children,
     to,
     href,
     iconLeft,
     iconRight,
     outline = false,
     primary = false,
     small = false,
     large = false,
     ...passProps 
    }) {


    let Comp = 'button';
    const props = {
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classname = cx('wrapper', {
        primary,
        small,
        large,
        outline,
    });

    return (
        <Comp className={classname} {...props}>
            {iconLeft && <span className={cx('icon')}>{iconLeft}</span>}
            <span className={cx('title')}>{children}</span>
            {iconRight && <span className={cx('icon')}>{iconRight}</span>}

        </Comp>
    );
}

export default Button;

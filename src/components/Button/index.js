import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

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
    primaryChange = false,
    outlinePrimary = false,
    small = false,
    large = false,
    onclick,
    disabled,
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

    if(disabled){
        Object.keys(props).forEach((key) =>{
            if(key.startsWith('on') && typeof props[key] === 'function'){
                delete props[key];
                this.preventDefault();
            }

        })
    }

    const disabledEvent = (e)=>{
        e.preventDefault();
    }
    const classname = cx('wrapper', {
        primary,
        small,
        large,
        outline,
        outlinePrimary,
        primaryChange,
        disabled
    });

    return (
        <Comp className={classname} onClick = {onclick ? onclick : disabledEvent} {...props}>
            {iconLeft && <i className={cx('icon')}>{iconLeft}</i>}
            <span className={cx('title')}>{children}</span>
            {iconRight && <i className={cx('icon')}>{iconRight}</i>}
        </Comp>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    iconLeft: PropTypes.node,
    iconRight: PropTypes.node,
    outline: PropTypes.bool,
    primary: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    onclick: PropTypes.func,
};

export default Button;

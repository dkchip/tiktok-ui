import Tippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import style from './Menu.module.scss';

import MenuItem from './MenuItem';
import Wrapper from '../Wrapper';
const cx = classnames.bind(style);

function Menu({ children, items = [] }) {
    const renderItem = () => {
        return items.map((item, index) => {
            return <MenuItem  key={index} data={item}></MenuItem>;
        });
    };
    return (
        <Tippy
            placement="bottom-end"
            interactive
            delay={[0,800]}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {renderItem()}
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;

import Tippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import style from './Menu.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';
import Wrapper from '../Wrapper';
import HeaderMenu from './HeaderMenu';
const cx = classnames.bind(style);

function Menu({ hideOnClick = false,children, items = [] }) {
    const [history, setHistory] = useState([{ data: items }]);
    const curent = history[history.length - 1];

    const renderItem = () => {
        return curent.data.map((item, index) => {
            const isParent = !!item.children;
            return <MenuItem 
                        key={index} 
                        data={item} 
                        onClick = {()=>{
                            if(isParent){
                                setHistory((prev) => [...prev,item.children])
                            }else{

                            }
                        }}
                    />;
        });
    };

    return (
        <Tippy
            placement="bottom-end"
            interactive
            hideOnClick ={hideOnClick}
            delay={[0, 800]}
            onHide = {()=>{setHistory(prev => prev.slice(0,1))}}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {history.length >1 && <HeaderMenu title={curent.title} 
                                                           onBack = {()=>{
                                                            setHistory(prev => prev.slice(0,prev.length-1))
                                                            }}/> }
                        <div className={cx('language-list')}>
                            {renderItem()}
                        </div>
                    </Wrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    hideOnClick : PropTypes.bool,
    children : PropTypes.node.isRequired,
    items : PropTypes.array
}

export default Menu;

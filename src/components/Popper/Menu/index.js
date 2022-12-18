import Tippy from '@tippyjs/react/headless';
import classnames from 'classnames/bind';
import style from './Menu.module.scss';
import { useState } from 'react';

import MenuItem from './MenuItem';
import Wrapper from '../Wrapper';
import HeaderMenu from './HeaderMenu';
const cx = classnames.bind(style);

function Menu({ children, items = [] }) {
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
            delay={[0, 800]}
            onHide = {()=>{setHistory(prev => prev.slice(0,1))}}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {history.length >1 && <HeaderMenu title="Language" 
                                                           onBack = {()=>{
                                                            setHistory(prev => prev.slice(0,prev.length-1))
                                                            }}/> }
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

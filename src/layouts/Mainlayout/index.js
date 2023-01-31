// import { Link } from 'react-router-dom';
import classnames  from 'classnames/bind';
import PropTypes from 'prop-types';

import style from './Mainlayout.module.scss'
import Header from '../components/Header';
import Sidebar from '../components/SIdebar';

const cx = classnames.bind(style)
function Mainlayout({ children }) {
    return (
        <div className={cx('Wrapper')}>
            <Header></Header>
            <div className={cx('body')}>
                <Sidebar></Sidebar>
                <div className={cx('container')}>
                    {children}
                </div>
            </div>
            
        </div>
    );
}

Mainlayout.protoTypes = {
    children : PropTypes.node.isRequired
}

export default Mainlayout;

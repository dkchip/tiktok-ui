// import { Link } from 'react-router-dom';
import classnames  from 'classnames/bind';

import style from './Mainlayout.module.scss'
import Header from '../components/Header';
import Sidebar from '../components/SIdebar';

const cx = classnames.bind(style)
function Mainlayout({ children }) {
    return (
        <div className='app'>
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

export default Mainlayout;

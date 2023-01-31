// import { Link } from 'react-router-dom';
import classnames  from 'classnames/bind';
// import PropTypes from 'prop-types';
import styles from './UserLayout.module.scss'
import Header from '../components/Header';
import Sidebar from '../components/SIdebar';
const cx = classnames.bind(styles)
function UserLayout({ children }) {
    return (
        <div className={cx('Wrapper')}>
            <Header wider={true}/>

            <div className={cx('body')}>
                <Sidebar wider ={true} />
                <div className={cx('container')}>
                    {children}
                </div>
            </div>
            
        </div>
    );
}



export default UserLayout;

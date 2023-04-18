
import classnames  from 'classnames/bind';
import PropTypes from 'prop-types';

import style from './UpLoadPage.module.scss'
import Header from '../components/Header';


const cx = classnames.bind(style)
function UpLoadLayout({ children ,toggleModal,isShowing}) {
    return (
        <div className={cx('Wrapper')}>
            <Header toggleModal = {toggleModal} isShowing = {isShowing}></Header>
            <div className={cx('body')}>
                <div className={cx('container')}>
                    {children}
                </div>
            </div>
            
        </div>
    );
}

UpLoadLayout.protoTypes = {
    children : PropTypes.node.isRequired
}

export default UpLoadLayout;

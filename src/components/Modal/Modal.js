import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import Qrcode from './TypeModal/Qrcode';
import { CloseIcon, ArrowLeftIcon } from '../Icon';
import Login from './TypeModal/Login';
import Register from './TypeModal/Register';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

const Modal = ({ isShowing, hide }) => {
    const [nameModal, setNameModal] = useState('login');

    const handleSetNameModal = (e) => {
        setNameModal(e);
    };
    const [TypeModal, setTypeModal] = useState(<Login onclick={handleSetNameModal} />);
    const [showIconBack, setShowIconBack] = useState(false);

    useEffect(() => {
        switch (nameModal) {
            case 'login':
                setShowIconBack(false);
                setTypeModal(<Login onclick={handleSetNameModal} />);
                break;
            case 'register':
                setShowIconBack(false);
                setTypeModal(<Register />);
                break;
            case 'qrcode':
                setShowIconBack(true);
                setTypeModal(<Qrcode />);
                break;
            default:
                setTypeModal(<Login />);
        }
    }, [nameModal]);

    const hideModal = () => {
        setNameModal('login');
        hide();
    };

    const changeTypeModal = (e) => {
        e.preventDefault();
        if (nameModal === 'login') {
            setNameModal('register');
        } else {
            setNameModal('login');
        }
    };

    const handleBack = ()=>{
        switch (nameModal) {
            case 'qrcode':
                setTypeModal(<Login onclick={handleSetNameModal} />);
                setNameModal('login');
                break;
            case 'login':
                setShowIconBack(false);
                setTypeModal(<Login onclick={handleSetNameModal} />);
                break;
            
            default:
                setTypeModal(<Login onclick={handleSetNameModal} />);
        }
    }
    return isShowing
        ? ReactDOM.createPortal(
              <div className={cx('wrapper')}>
                  <div className={cx('overlay')}></div>
                  <div className={cx('content')}>
                      <header className={cx('header')}>
                          <i className={cx('icon-back')} onClick = {handleBack}>{showIconBack ? <ArrowLeftIcon /> : ''}</i>
                          <i className={cx('icon-close')} onClick={hideModal}>
                              <CloseIcon />
                          </i>
                      </header>
                      <div className={cx('body')}>{TypeModal}</div>
                      <div className={cx('footer')}>
                          <span className={cx('text')}>
                              {nameModal === 'login' ? 'Bạn không có tài khoản ?' : 'Bạn đã có tài khoản ?'}
                          </span>
                          <Link
                              to={`/${nameModal === 'login' ? 'register' : 'login'}`}
                              className={cx('link')}
                              onClick={changeTypeModal}
                          >
                              {nameModal === 'login' ? 'Đăng ký' : 'Đăng nhập'}
                          </Link>
                      </div>
                  </div>
              </div>,

              document.body,
          )
        : null;
};

export default Modal;

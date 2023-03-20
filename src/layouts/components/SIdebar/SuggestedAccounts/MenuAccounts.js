import classNames from 'classnames/bind';
import styles from './MenuAccounts.module.scss';

const cx = classNames.bind(styles);
function MenuAccount({ children ,title}) {
    
    return <div className={cx('account-list')}>
                <p className={cx('title')}>{title}</p>
                {children}
            </div>;
}

export default MenuAccount;

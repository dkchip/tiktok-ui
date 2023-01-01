import classNames from 'classnames/bind';
import styles from './MenuAccounts.module.scss';

const cx = classNames.bind(styles);
function MenuAccount({ children ,title}) {
    return <div className={cx('account-list')}>
                <span className={cx('title')}>{title}</span>
                {children}
            </div>;
}

export default MenuAccount;

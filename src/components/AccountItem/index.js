import classNames from 'classnames/bind';

import style from './AccountItem.module.scss';

const cx = classNames.bind(style);
function AccountItem() {
    return <div className={cx('account-result')}>
                <img src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/9c1763d086163fc41c05a6d731057f7f~c5_300x300.webp?x-expires=1671264000&x-signature=XBDA%2Br2HyZfiZqUbDzuCcUa%2F7tQ%3D' alt = ''></img>
                <div className={cx('name')}>
                    <h4>hoa_2309</h4>
                    <span className={cx('nick-name')}>Ngô Ngọc Hoa</span>
                </div>
           </div>;
}

export default AccountItem;

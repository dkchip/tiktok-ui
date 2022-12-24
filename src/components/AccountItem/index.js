import classNames from 'classnames/bind';
import Image from '../Image';
import style from './AccountItem.module.scss';

const cx = classNames.bind(style);
function AccountItem({data}) {
    return <div className={cx('account-result')}>
                <Image src={data.avatar} alt = '' />
                <div className={cx('name')}>
                    <h4 className={cx('nick-name')} >{data.nickname}</h4>
                    <span className={cx('full-name')} >{data.full_name}</span>
                </div>
           </div>;
}

export default AccountItem;

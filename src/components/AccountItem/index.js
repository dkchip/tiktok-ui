import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import {Link} from 'react-router-dom'

import Image from '../Image';
import style from './AccountItem.module.scss';

const cx = classNames.bind(style);
function AccountItem({data}) {
    return <Link  to ={`@${data.nickname}`} className={cx('account-result')}>
                <Image src={data.avatar} alt = '' />
                <div className={cx('name')}>
                    <h4 className={cx('nick-name')} >{data.nickname}</h4>
                    <span className={cx('full-name')} >{data.full_name}</span>
                </div>
           </Link>;
}

AccountItem.propTypes = {
    data : PropTypes.object.isRequired
}

export default AccountItem;

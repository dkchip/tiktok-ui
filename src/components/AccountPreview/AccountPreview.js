import classNames from 'classnames/bind';
import styles from './AccountPreview.module.scss';
import Image from '../Image';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { Ticker } from '../Icon';
const cx = classNames.bind(styles);
function AccountPreview({ data, outline = false, primary = false, outlinePrimary = false ,nameBtn,onClick}) {
    const props = {
        outline,
        primary,
        outlinePrimary,
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <Link to={`/@${data.nickname}`}>
                    <Image className={cx('avatar')} alt="" src={data.avatar} />
                </Link>
                <div className={cx("btn")}>
                    <Button {...props} onClick = {onClick}>{nameBtn}</Button>
                </div>
            </div>

            <Link className={cx('link')} to={`@${data.nickname}`}>
                {data.nickname}
            </Link>
            {data.tick ? <Ticker /> : ''}

            <p className={cx('full-name')}>{data.first_name + ' ' + data.last_name}</p>
            <div className={cx('user-stat')}>
                <p className={cx('follower')}>
                    <b>
                        {data.followers_count} {data.followers_count > 1000000 ? 'M' : ''}
                    </b>
                    <span>Follower</span>
                </p>
                <p className={cx('likes')}>
                    <b>
                        {data.likes_count} {data.likes_count > 1000000 ? 'M' : ''}
                    </b>
                    <span>Thích</span>
                </p>
            </div>
        </div>
    );
}

export default AccountPreview;

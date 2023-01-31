import styles from './Following.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { getSuggestedUsers } from '../../services/userServices';
import CardPlayerItem from './CardPlayerItem';
const cx = classNames.bind(styles);
function Following() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getSuggestedUsers(1, 12)
            .then((res) => setData(res.data));
    }, []);

    return data ? (
        <div className={cx('container')}>
            <div className={cx('list-card')}>
                {data.map((item, index) => {
                    return (

                            <CardPlayerItem key={index} data={item} />

                    );
                })}
            </div>
        </div>
    ) : (
        <></>
    );
}

export default Following;

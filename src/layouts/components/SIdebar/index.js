import { useEffect, useState } from 'react';
import classnames from 'classnames/bind';
import style from './Siderbar.module.scss';
import { Link } from 'react-router-dom';

import MenuAccounts from './SuggestedAccounts/MenuAccounts';
import AcountItem from './SuggestedAccounts/AcountItem';
import Menu from './Menu';
import MenuItem from './Menu/MenuItem';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '../../../components/Icon';
import request from '../../../utils/request';
import { TagIcon, MusicIcon } from '../../../components/Icon';

const cx = classnames.bind(style);
const LIST_DISCOVER = [
    {
        icon: <TagIcon />,
        path: '/',
        title: 'suthatla',
    },
    {
        icon: <TagIcon />,
        path: '/',
        title: 'mackedoi',
    },
    {
        icon: <TagIcon />,
        path: '/',
        title: 'sấnngthaydoi',
    },
    {
        icon: <MusicIcon />,
        path: '/',
        title: 'Yêu-Đơn-Phương-Là-Gì-MEE-Remix',
    },
    {
        icon: <MusicIcon />,
        path: '/',
        title: 'Về Nghe Mẹ Ru - NSND Bach Tuyet & Hứa Kim Tuyền & 14 Casper & Hoàng Dũng',
    },
    {
        icon: <MusicIcon />,
        path: '/',
        title: 'Thiên Thần Tình Yêu - RICKY STAR',
    },
];
function Sidebar() {
    const [data, setData] = useState([]);
    let [quantity, setQuantity] = useState(5);
    let [accFollowings, setAccFollowing] = useState([]);
    useEffect(() => {
        request
            .get('users/suggested', {
                params: {
                    page: 1,
                    per_page: quantity,
                },
            })
            .then((res) => {
                setData(res.data.data);
            });
    }, [quantity]);

    // useEffect(()=>{
    //     request.get('me/followings',{
    //         params : {
    //             page :1
    //         }
    //     })
    //     .then((res)=>{
    //         setAccFollowing(res)
    //     })
    //     .catch(()=>{
    //         console.log('loi!')
    //     })
    // })

    const handleSeeMore = () => {
        if (quantity === 5) {
            setQuantity(20);
        } else {
            setQuantity(5);
        }
    };

    return (
        <div className={cx('sidebar')}>
            <div className={cx('side-container')}>
                <div className={cx('wrapper')}>
                    <div className={cx('menu-wrapper')}>
                        <Menu>
                            <MenuItem to="/" title="Dành Cho Bạn" icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                            <MenuItem
                                to="/following"
                                title="Đang Follow"
                                icon={<UserGroupIcon />}
                                activeIcon={<UserGroupActiveIcon />}
                            />
                            <MenuItem to="/live" title="LIVE" icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                        </Menu>
                    </div>

                    <div className={cx('user-suggest-container', 'line-top')}>
                        <MenuAccounts title="Tài khoản được đề xuất">
                            {data.map((item) => {
                                return <AcountItem key={item.id} data={item} />;
                            })}
                        </MenuAccounts>
                        <button className={cx('btn')} type="button" onClick={handleSeeMore}>
                            {quantity === 5 ? 'Xem tất cả' : 'Ẩn bớt'}
                        </button>
                    </div>
                    <div className={cx('following-account', 'line-top')}>
                        {/* Account-following */}
                        <MenuAccounts title="Tài khoản đang followings">
                            {accFollowings > 0 ? (
                                accFollowings.map((accFollowing) => {
                                    return <AcountItem key={accFollowing.id} accFollowing={accFollowing} />;
                                })
                            ) : (
                                <p className={cx('des-following')}>
                                    Những tài khoản bạn đang follow sẽ xuất hiện ở đây
                                </p>
                            )}
                        </MenuAccounts>

                        {accFollowings > 0 ? (
                            <button className={cx('btn')} type="button" onClick={handleSeeMore}>
                                {quantity === 5 ? 'Xem tất cả' : 'Ẩn bớt'}
                            </button>
                        ) : undefined}
                    </div>

                    <div className={cx('discover-list','line-top')}>
                        {LIST_DISCOVER.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={cx('discover-item')}
                                    onClick={() => {
                                        alert('Comming soon !');
                                    }}
                                >
                                    <i>{item.icon}</i>
                                    <span>{item.title}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

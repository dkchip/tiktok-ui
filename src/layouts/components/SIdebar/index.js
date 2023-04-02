import { useEffect, useState ,useContext} from 'react';
import classnames from 'classnames/bind';
import style from './Siderbar.module.scss';
import { Link } from 'react-router-dom';

import { ModalContextKeys } from '../../../contexts/ModalContext';
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
    TagIcon,
    MusicIcon,
} from '../../../components/Icon';
import { getSuggestedUsers, getFollowingdUsers, getSuggestedUsersAuth } from '../../../services/userServices';
import Button from '../../../components/Button';
import Cookies from 'js-cookie';
import { useSelector,useDispatch } from 'react-redux';
import { setAccount,updateAccount } from '../../../store/slices/accountSlice';

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

const LIST_ITEM_FOOTER = [
    {
        title: 'Giới thiệu',
        path: '/',
    },
    {
        title: 'Bảng tin',
        path: '/',
    },
    {
        title: 'Liên hệ',
        path: '/',
    },
    {
        title: 'Sự nghiệp',
        path: '/',
    },
    {
        title: 'ByteDance',
        path: '/',
    },
    {
        title: 'Trợ giúp',
        path: '/',
    },
    {
        title: 'An toàn',
        path: '/',
    },
    {
        title: 'Điều khoản',
        path: '/',
    },
    {
        title: 'Quyền riêng tư',
        path: '/',
    },
    {
        title: 'Creator Portal',
        path: '/',
    },
    {
        title: 'Hướng dẫn Cộng đồng',
        path: '/',
    },
];

function Sidebar({ wider }) {
    const dispatch = useDispatch();
    const token = Cookies.get('tokenAuth');
    const authData = useSelector((state)=>state.user);

    const data = useSelector((state)=>state.accounts).dataAccounts;
    let [quantity, setQuantity] = useState(5);
    const [page, setPage] = useState(1);
    const [accFollowings, setAccFollowing] = useState([]);
    const [metaFollowings, setMetaFollowings] = useState();
    const {isShowingLogin} = useContext(ModalContextKeys);

    useEffect(() => {
       if(authData.auth){
           getSuggestedUsersAuth(1,quantity,token)
            .then((res) => {
                dispatch(updateAccount(res.data))

            })
       }else{
            getSuggestedUsers(1, quantity).then((res) => {
                dispatch(updateAccount(res.data))
        });
       }
       // eslint-disable-next-line
    }, [quantity]);

    useEffect(() => {
        if (authData.auth) {
            getFollowingdUsers(page, token).then((res) => {
                setAccFollowing((prev) => [...prev,...res.data]);
                setMetaFollowings(res.meta)
            });
        }
        // eslint-disable-next-line
    }, [page]);


    const handleSeeMore = () => {
        if (quantity === 5) {
            setQuantity(20);
        } else {
            setQuantity(5);
        }
    };
    const handleSeeMoreFollowing = () => {
        if(page !== metaFollowings.pagination.total_pages ){
            setPage(page + 1)
        }else{
            setPage(1);
            setAccFollowing([])
        }
    };

    return (
        <div className={cx('sidebar')} style={{ width: wider ? '240px' : '356px' }}>
            <div className={cx('side-container')} style={{ width: wider ? '240px' : '356px' }}>
                <div className={cx('abc')} style={{ width: wider ? '240px' : '356px' }}>
                    <div className={cx('wrapper')} style={{ width: wider ? '240px' : '356px' }}>
                        <div className={cx('menu-wrapper')}>
                            <Menu>
                                <MenuItem
                                    to="/"
                                    title="Dành Cho Bạn"
                                    icon={<HomeIcon />}
                                    activeIcon={<HomeActiveIcon />}
                                />
                                <MenuItem
                                    to="/following"
                                    title="Đang Follow"
                                    icon={<UserGroupIcon />}
                                    activeIcon={<UserGroupActiveIcon />}
                                />
                                <MenuItem to="/live" title="LIVE" icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
                            </Menu>
                        </div>

                        {authData.auth ? null : (
                            <div className={cx('log-in', 'line-top')}>
                                <div className={cx('btn-wrap')}>
                                    <span className={cx('title')}>
                                        Đăng nhập để follow các tác giả, thích video và xem bình luận.
                                    </span>
                                    <Button onClick={isShowingLogin} large>
                                        Đăng nhập
                                    </Button>
                                    {/* <Modal isShowing={isShowing} hide ={toggle}></Modal>    */}
                                </div>
                            </div>
                        )}

                        <div className={cx('user-suggest-container', 'line-top')}>
                            <MenuAccounts title={'Tài khoản được đề xuất'}>
                                {data && data.map((item) => {
                                    return <AcountItem key={item.id} data={item} />;
                                })}
                            </MenuAccounts>

                            <button className={cx('btn')} type="button" onClick={handleSeeMore}>
                                {quantity === 5 ? 'Xem tất cả' : 'Ẩn bớt'}
                            </button>
                        </div>
                        {authData.auth === true && metaFollowings ? (
                            <div className={cx('following-account', 'line-top')}>
                                {/* Account-following */}

                                <MenuAccounts title="Tài khoản đang followings">
                                    {accFollowings.length > 0 ? (
                                        accFollowings.map((item,index) => {
                                            return <AcountItem key={index} data={item} following />;
                                        })

                                    ) : (
                                        <p className={cx('des-following')}>
                                            Những tài khoản bạn đang follow sẽ xuất hiện ở đây
                                        </p>
                                    )}

                                    {/* Button */}

                                    {
                                        metaFollowings.pagination.total_pages  > 1 
                                        ? (
                                            <button
                                                    className={cx('btn')}
                                                    type="button"
                                                    onClick={handleSeeMoreFollowing}
                                                >
                                                    {page !== metaFollowings.pagination.total_pages ? 'Xem thêm' : 'Ẩn bớt'}
                                                </button>
                                           )
                                        :undefined
                                    }
                                </MenuAccounts>
                            </div>
                        ) : undefined}

                        <div className={cx('discover-list', 'line-top')}>
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

                        <div className={cx('footer', 'line-top')}>
                            {LIST_ITEM_FOOTER.map((item, index) => {
                                return (
                                    <Link className={cx('footer-link')} key={index}>
                                        {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;

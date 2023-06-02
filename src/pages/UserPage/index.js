import { useParams } from 'react-router-dom';
import {useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import {
    LinkIcon,
    MenuIcon,
    ShareIcon,
    Ticker,
    DipIcon,
    WhatsAppIcon,
    TwitterIcon,
    LinkedIcon,
    RedditIcon,
    TelegramIcon,
    FacebookIcon,
    LockIcon,
    EditProfileIcon,
    FollowedIcon
} from '../../components/Icon';
import { setVideosUser } from '../../store/slices/videosSlice';
import styles from './UserPage.module.scss';
import {getProfileUser,followUser,unfollowUser} from "../../services/userServices"
import Button from '../../components/Button';
import Menu from '../../components/Popper/Menu';
import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import VideosProfile from './VideosProfile';
import LikedProfile from './LikedProfile';
import { ModalContextKeys } from '../../contexts/ModalContext';
import { setOtherUser } from '../../store/slices/userSlice';


const cx = classNames.bind(styles);
const MENU_SHARE = {
    items: [
        {
            title: 'Nhúng',
            icon: <DipIcon />,
            path : '/'
        },
        {
            title: 'Chia sẻ Facebook',
            icon: <FacebookIcon />,
            path : '/'

        },
        {
            title: 'Chia sẻ với WhatsApp',
            icon: <WhatsAppIcon />,
            path : '/'

        },
        {
            title: 'Chia sẻ với Twitter',
            icon: <TwitterIcon />,
            path : '/'

        },
        {
            title: 'Sao chép liên kết',
            icon: <LinkIcon />,
            path : '/'

        },
        {
            title: 'Chia sẻ với LikedIn',
            icon: <LinkedIcon />,
            path : '/'

        },
        {
            title: 'Chia sẻ với Reddit',
            icon: <RedditIcon />,
            path : '/'

        },
        {
            title: 'Chia sẻ với Telegram',
            icon: <TelegramIcon />,
            path : '/'

        },
    ],
};

const MENU_REPORTS = [
    {
        title: 'Gửi tin nhắn',
        icon: '',
        path : '/'

    },
    {
        title: 'Báo cáo',
        icon: '',
        path : '/'

    },
    {
        title: 'Chặn',
        icon: '',
        path : '/'

    },
];
function UserPage() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.user.auth)
    const currentUser = useSelector(state => state.user.currentUser)
    const {isShowingLogin,isShowing,handleShowingModalUpdate} = useContext(ModalContextKeys)
    const token = Cookies.get("tokenAuth")
    const dataAllVideoUser = useSelector(state => state.videos.dataAllVideosUser);

    const [isActive, setIsActive] = useState('video');
    const user = useParams();
    const data = useSelector((state) => state.user.otherUser)
    const dataVideo = useSelector((state)=> state.videos.dataAllVideosUser);

    const [loading,setLoading] = useState(false);

    useEffect(() => {
        setLoading(false)
        getProfileUser(user.nickname,token)
            .then((res)=>{
                dispatch(setVideosUser(res.data.videos))
                dispatch(setOtherUser(res.data))
                dispatch(setVideosUser(res.data.videos))
                setLoading(true)
            })
    }, [user.nickname]);

    

    useEffect(() => {
        if(isShowing === false){
            window.history.replaceState({},"", `/@${user.nickname}`);
        }
    },[isShowing])

    const fullName = data ? (`${(data.first_name ? data.first_name : "") + ' '+ (data.last_name ? data.last_name : '')}`) : null
    
    document.title = data ? (`${fullName} (@${data.nickname}) | TikTok`) : "Tiktok - Make your day"

    const setActiveTab = (value) => {
        setIsActive(value);
    };

    const updateUserVideo = (data,dataAll)=>{
        const tempDataAllVideos = [...dataAll]
        const newDataAllVideos = tempDataAllVideos.map((item)=>{
            return {...item, user : data}
        })
        dispatch(setVideosUser(newDataAllVideos))
    }

    const handleUnfollow = ()=>{
        unfollowUser(data.id,token)
            .then((res)=>{
                dispatch(setOtherUser(res.data))
                updateUserVideo(res.data,dataAllVideoUser)
            })
    }

    const handleFollow = ()=>{
        followUser(data.id,token)
        .then((res)=>{
            dispatch(setOtherUser(res.data))
            updateUserVideo(res.data,dataAllVideoUser)


        })
    }

    return loading && data  ? (
        <div className={cx('wraper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('share-info')}>
                        <img className={cx('image')} src={data.avatar} alt = '' />
                        <div className={cx('title-container')}>
                            <h2 className={cx('nick-name')}>
                                {data.nickname} <Ticker />
                            </h2>
                            <h3 className={cx('full-name')}>{data.first_name + ' ' + data.last_name}</h3>
                            <div className={cx("btn")}>
                                {
                                    auth ? 
                                    (
                                        currentUser.id === data.id ? 
                                        (
                                            <Button  iconLeft={<EditProfileIcon />} onclick={handleShowingModalUpdate} outline>Sửa hồ sơ</Button>
                                        ) : (
                                            data.is_followed ? 
                                            (
                                                <>
                                                    <Button outlinePrimary>Nhắn tin</Button>
                                                    <button onClick={handleUnfollow} className={cx("btn-unfollow")}> 
                                                        <FollowedIcon />
                                                    </button>
                                                </>
                                            ) : (
                                                <Button onclick={handleFollow} primary>Follow</Button>
                                            )
                                        )
                                    ) : (
                                        <Button onclick={isShowingLogin} primary>Follow</Button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <h2 className={cx('count-info')}>
                        <div className={cx('number')}>
                            <span className={cx('following-count')}>{data.followings_count}</span>
                            <span className={cx('sub-title')}>Đang follow</span>
                        </div>
                        <div className={cx('number')}>
                            <span className={cx('follower-count')}>{data.followers_count}</span>
                            <span className={cx('sub-title')}>Follower</span>
                        </div>
                        <div className={cx('number')}>
                            <span className={cx('likes-count')}>{data.likes_count}</span>
                            <span className={cx('sub-title')}>Thích</span>
                        </div>
                    </h2>
                    <span className={cx('desc')}>{data.bio}</span>
                    <a className={cx('link-info')} href={data.website_url}>
                        <LinkIcon />
                        <h4>{data.website_url}</h4>
                    </a>
                </div>

                <div className={cx('action')}>
                    <div>
                        <Menu items={MENU_SHARE.items}>
                            <span className={cx('share-icon')}>
                                <ShareIcon />
                            </span>
                        </Menu>
                    </div>

                    <div>
                        <Menu items={MENU_REPORTS}>
                            <span className={cx('share-icon')}>
                                <MenuIcon />
                            </span>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className={cx('body')}>
                <div className={cx('video-tab')}>
                    <div
                        className={cx('tab')}
                        onClick={() => {
                            setActiveTab('video');
                        }}
                    >
                        <span>Video</span>
                    </div>
                    <div
                        className={cx('tab')}
                        onClick={() => {
                            setActiveTab('like');
                        }}
                    >
                        <LockIcon></LockIcon>
                        <span>Đã thích</span>
                    </div>
                    <div className={cx('scroll-tab', `${isActive === 'like' ? 'translate-x' : undefined}`)}></div>
                </div>
     
                <div className={cx('video-wraper')}>
                    <div style={{width : "100%"}}>
                        {isActive === "video" ? <VideosProfile data={dataVideo} id ={data.id}></VideosProfile> : ""}
                    </div>
                    <div>
                        {isActive === "like" ? <LikedProfile data={dataVideo} /> : ""}
                    </div>
                </div>
            </div>
            <ButtonBottom></ButtonBottom>
        </div>
    ) : (
        <div className={cx('')}></div>
    );
}

export default UserPage;

import { useParams } from 'react-router-dom';
import request from '../../utils/request';
import { useEffect } from 'react';

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
    // LikeIcon,
} from '../../components/Icon';
import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import Image from '../../components/Image';
import Button from '../../components/Button';
import Menu from '../../components/Popper/Menu';
import { useState } from 'react';
// import { Link } from 'react-router-dom';
import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import VideosProfile from './VideosProfile';
import LikedProfile from './LikedProfile';

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


    const [data, setData] = useState(null);
    const [isActive, setIsActive] = useState('video');
    const user = useParams();
    const fullName = data ? (`${(data.first_name ? data.first_name : "") + ' '+ (data.last_name ? data.last_name : '')}`) : null
   
    useEffect(() => {
        request
            .get(`users/@${user.nickname}`)
            .then((res) => {
                setData(res.data.data)
            });
        
        
        
    
    }, [user.nickname]);

    document.title = data ? (`${fullName} (@${data.nickname}) | TikTok`) : "Tiktok - Make your day"

    const setActiveTab = (value) => {
        setIsActive(value);
    };
    return data ? (
        <div className={cx('wraper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <div className={cx('share-info')}>
                        <Image className={cx('image')} src={data.avatar} />
                        <div className={cx('title-container')}>
                            <h2 className={cx('nick-name')}>
                                {data.nickname} <Ticker />
                            </h2>
                            <h3 className={cx('full-name')}>{data.first_name + ' ' + data.last_name}</h3>
                            <Button primary>Follow</Button>
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
                    <div className={cx('video-list')}>
                        {isActive === "video" ? <VideosProfile data={data.videos}></VideosProfile> : ""}
                    </div>
                    <div>
                        {isActive === "like" ? <LikedProfile data={data} /> : ""}
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

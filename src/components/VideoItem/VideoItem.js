import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useElementOnScreen } from '../../hooks';
import Tippy from '@tippyjs/react/headless';

import {
    LinkIcon,
    ShareIcon,
    Ticker,
    DipIcon,
    WhatsAppIcon,
    TwitterIcon,
    LinkedIcon,
    RedditIcon,
    TelegramIcon,
    FacebookIcon,
    MusicIcon,
    LikeIcon,
    //  LikeIconActive,
    CommentIcon,
    PlayIcon,
    PauseIcon,
    VolumeOffIcon,
    VolumeOnIcon,
} from '../Icon';
import Menu from '../Popper/Menu';
import Button from '../Button';
import { Wrapper } from '../../components/Popper';
import AccountPreview from '../AccountPreview/AccountPreview';
import Image from '../Image';
import styles from './VideoItem.module.scss';
import classNames from 'classnames/bind';
import Modal from '../Modal/Modal';
import useModal from '../../hooks/useModal';

const cx = classNames.bind(styles);

const MENU_SHARE = {
    items: [
        {
            title: 'Nhúng',
            icon: <DipIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ Facebook',
            icon: <FacebookIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ với WhatsApp',
            icon: <WhatsAppIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ với Twitter',
            icon: <TwitterIcon />,
            path: '/',
        },
        {
            title: 'Sao chép liên kết',
            icon: <LinkIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ với LikedIn',
            icon: <LinkedIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ với Reddit',
            icon: <RedditIcon />,
            path: '/',
        },
        {
            title: 'Chia sẻ với Telegram',
            icon: <TelegramIcon />,
            path: '/',
        },
    ],
};

function VideoItem({ data, volume, setVolume }) {

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    // const playPromise = videoRef.current.play();
    
    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    // if (playPromise !== undefined) {
    //     playPromise.then(() => {});
    // }
    const playPromise = videoRef.current;

    async function playVideo(){
        videoRef.current.currentTime = 0;
               await videoRef.current.play();
                setPlaying(true);
    }

    useEffect(() => {
        if (isVisibile) {
    
            if (!playing && playPromise !== undefined) {
                // set curentTime video = 0;
                playVideo();
                
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line
    }, [isVisibile]);

    useEffect(()=>{
        videoRef.current.volume = volume;
    },[volume])
    
    const handleVolume = () => {
        if (volume === 0) {
            setVolume(0.5);
        } else {
            setVolume(0);
        }
    };
    useEffect(()=>{
        
    })

    const { isShowing, toggle } = useModal();
   

    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrap')}>
                <Tippy
                    placement="bottom-start"
                    interactive={true}
                    delay={[400, 400]}
                    render={(attrs) => (
                        <div className={cx('user-wrap')} {...attrs}>
                            <Wrapper>
                                <AccountPreview data={data.user} outlinePrimary />
                            </Wrapper>
                        </div>
                    )}
                >
                    <Link to={`/@${data.user.nickname}`}>
                        <Image className={cx('avatar')} src={data.user.avatar}></Image>
                    </Link>
                </Tippy>
            </div>

            <div className={cx('content-container')}>
                <div className={cx('header')}>
                    <div className={cx('info')}>
                        <Link to={`/@${data.user.nickname}`} className={cx('link-profile')}>
                            <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                            <span className={cx('full-name')}>{data.user.first_name + ' ' + data.user.last_name}</span>
                            <i className={cx('ticker')}>{data.user.tick ? <Ticker /> : undefined}</i>
                        </Link>
                        <span className={cx('desc')}>{data.description}</span>
                        <Link className={cx('music-video')}>
                            <i className={cx('music-icon')}>
                                <MusicIcon />
                            </i>
                            <h4 className={cx('music-name')}>{data.music}</h4>
                        </Link>
                    </div>
                    <div className={cx('btn')}>
                        <Button onClick={toggle} outlinePrimary>
                            Follow
                        </Button>
                        <Modal isShowing={isShowing} hide={toggle}></Modal>
                    </div>
                </div>
                <div className={cx('body')}>
                    <div
                        className={cx(
                            'video-player',
                            `${
                                data.meta.video.resolution_x > data.meta.video.resolution_y
                                    ? 'video-width'
                                    : 'video-height'
                            }`,
                        )}
                    >
                        <img
                            className={cx('image', `${playing === false ? 'z-index-image' : ''}`)}
                            src={data.thumb_url}
                            alt=""
                        />
                        <video
                            muted={false}
                            ref={videoRef}
                            onClick={onVideoClick}
                            loop
                            playsInline={true}
                            poster={data.thumb_url}
                            
                        >
                            <source src={data.file_url} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                        <div className={cx('controls')}>
                            <div className={cx('btn-wrap')}>
                                <button className={cx('btn-play', `${playing ? 'hide' : ''}`)} onClick={onVideoClick}>
                                    <PlayIcon />
                                </button>
                                <button className={cx('btn-pause', `${playing ? '' : 'hide'}`)} onClick={onVideoClick}>
                                    <PauseIcon />
                                </button>
                            </div>
                            <div className={cx('volume-control')}>
                                <div className={cx('volume-container')}>
                                    <input
                                        onChange={(e) => {
                                            setVolume(e.target.value);

                                            videoRef.current.volume = volume;
        
                                        }}
                                        value={volume}
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                    ></input>
                                </div>
                                {volume === 0 ? (
                                    <button onClick={handleVolume} className={cx('volume-off')}>
                                        <VolumeOffIcon />
                                    </button>
                                ) : (
                                    <button onClick={handleVolume} className={cx('volume-on')}>
                                        <VolumeOnIcon />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={cx('action-item')}>
                        <button>
                            <i className={cx('icon')}>
                                <LikeIcon />
                            </i>
                            <p className={cx('like-count')}>{data.likes_count}</p>
                        </button>
                        <button>
                            <i className={cx('icon')}>
                                <CommentIcon />
                            </i>
                            <p className={'comment-count'}>{data.comments_count}</p>
                        </button>
                        <Menu items={MENU_SHARE.items} position={'top-start'}>
                            <button>
                                <i className={cx('icon')}>
                                    <ShareIcon />
                                </i>
                                <p className={cx('share-count')}>{data.shares_count}</p>
                            </button>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;

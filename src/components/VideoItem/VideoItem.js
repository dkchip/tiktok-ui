import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useElementOnScreen } from '../../hooks';
import Tippy from '@tippyjs/react/headless';

import Menu from '../Popper/Menu';
import Button from '../Button';
import {Wrapper} from '../../components/Popper'
import AccountPreview from '../AccountPreview/AccountPreview';
import Image from '../Image';
import styles from './VideoItem.module.scss';
import classNames from 'classnames/bind';
import {
    Ticker,
    MusicIcon,
    LikeIcon,
    //  LikeIconActive,
    CommentIcon,
    ShareIcon,
    PlayIcon,
    PauseIcon,
    // VolumeOffIcon,
    VolumeOnIcon,
} from '../Icon';

const cx = classNames.bind(styles);

function VideoItem({ data }) {
    const [playing, setPlaying] = useState(false);

    const videoRef = useRef(null);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7,
    };
    const isVisibile = useElementOnScreen(options, videoRef);
    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };
    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                // set curentTime video = 0;
                videoRef.current.currentTime = 0;
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line
    }, [isVisibile]);

    // function handleVolume(e) {
    //     console.log(e);
    // }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('avatar-wrap')}>
                <Tippy 
                    placement='bottom-start'
                    interactive = {true}
                    delay={[400,400]}
                    render={attrs =>(
                        <div className={cx('user-wrap')} {...attrs}>
                            <Wrapper>
                                <AccountPreview data ={data.user} outlinePrimary />
                            </Wrapper>
                        </div>
                    )}
                >
                    <Link to={`/@${data.user.nickname}`}>
                        <Image className={cx('avatar')}  src={data.user.avatar}></Image>
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
                        <Button outlinePrimary >Follow</Button>
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
                        <img className={cx('image',`${playing === false ? "z-index-image" :""}`)} src={data.thumb_url} alt="" />
                        <video
                            // className={cx(`${onHide === true? 'hide' : ''}`)}
                            muted={true}
                            ref={videoRef}
                            onClick={onVideoClick}
                            // controls
                            loop
                            playsInline
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
                                {/* <div className={cx('volume-container')}>
                                    <div className={cx('volume-progress')} onMouseDown = {handleVolume}></div>
                                    <div className = {cx('volume-control-circle')}  ></div>
                                    <div className={cx('volume-bar')}></div>
                                </div> */}
                                <button className={cx('volume-on')}>
                                    <VolumeOnIcon />
                                </button>
                                {/* <button className={cx('volume-off')}>
                                    <VolumeOffIcon />
                                </button> */}
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
                        <button>
                    
                            <i className={cx('icon')}>
                                <ShareIcon />
                            </i>
                            <p className={cx('share-count')}>{data.shares_count}</p>
                       
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default VideoItem;


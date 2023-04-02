import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useElementOnScreen } from '../../hooks';
import Tippy from '@tippyjs/react/headless';
import { ModalContextKeys } from '../../contexts/ModalContext';
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
    LikeIconActive,
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
import { likeVideos, unLikeVideos } from '../../services/videoService';
import { followUser,unfollowUser } from '../../services/userServices';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateVideo,updateVideoFollowing } from '../../store/slices/videosSlice';
import { updateAccount } from '../../store/slices/accountSlice';

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

function VideoItem({
    data,
    volume,
    setVolume,
    index,
    interaction,
    setInteraction,
    followingPage = false
}) {

    const { auth } = useSelector((state)=>state.user);
    const dataAllVideos =  useSelector((state)=>state.videos).dataAllVideos;
    const dataAllVideosFollowing = useSelector((state)=>state.videos).dataAllVideosFollowing
    const dataAll = followingPage ? dataAllVideosFollowing : dataAllVideos; 
    
    const dispatch = useDispatch();

    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const { isShowingLogin, isShowingModalVideo, setIndexVideo ,setTypeModal} = useContext(ModalContextKeys);

    const {dataAccounts} = useSelector((state)=> state.accounts);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
    };

    const isVisibile = useElementOnScreen(options, videoRef);

    const handleClick = () => {
        isShowingModalVideo();
        setIndexVideo(index);
        setInteraction(false);
        if(followingPage){
            setTypeModal("following");
        }else{
            setTypeModal("home");

        }
    };

    const onVideoClick = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(!playing);
        } else {
            videoRef.current.play();
            setPlaying(!playing);
        }
    };

    const playPromise = videoRef.current;

    async function playVideo() {
        // set curentTime video = 0;
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
        setPlaying(true);
    }

    useEffect(() => {
        if (isVisibile && interaction) {
            if (!playing && playPromise !== undefined) {
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

    useEffect(() => {
        videoRef.current.volume = volume;
    }, [volume]);


    const handleVolume = () => {
        if (volume === '0') {
            setVolume('0.5');
        } else {
            setVolume('0');
        }
    };

    

    const updateVideos = (data) => {
        const indexVideo = dataAll.findIndex((video)=>{
            return video.uuid === data.uuid;
        }) 
        const tempDataAllVideos = [...dataAll]
        tempDataAllVideos[indexVideo] = data;
        if(followingPage){
            dispatch(updateVideoFollowing(tempDataAllVideos));

        }else{
            dispatch(updateVideo(tempDataAllVideos));
        }

    }

    const updateUser = (data,dataAll) => {
        const tempDataAllVideos = [...dataAll]
        const newDataAllVideos = tempDataAllVideos.map((item) =>  {
            if(item.user.id === data.id) {

              return  { ...item , user : data}
            }
            return item
        })

        if(followingPage){
            dispatch(updateVideoFollowing(newDataAllVideos));

        }else{
            dispatch(updateVideo(newDataAllVideos));
        }

    }

    const handleUpdateAccount = (data,dataAll)=>{
        const indexItem = dataAll.findIndex((item)=>{
            return item.id === data.id;
        })
        const newDataAccounts = [...dataAll];
        newDataAccounts[indexItem] = data;
        dispatch(updateAccount(newDataAccounts));
    }

    // handle request
    const token = Cookies.get('tokenAuth');


    const handleLikeVideo = () => {
        if (auth) {
            if (data.is_liked) {
                unLikeVideos(data.uuid, token)
                .then((res)=>{
                    updateVideos(res.data.data)
                })
            } else {
                likeVideos(data.uuid, token)
                .then((res)=>{
                    updateVideos(res.data.data)
                })
            }
        } else {
            isShowingLogin();
        }
    };

    
    const handleFollow = () => {

       if(auth){
        if(data.user.is_followed){
            unfollowUser(data.user.id, token)
            .then((res)=>{
                
                updateUser(res.data,dataAll);
                handleUpdateAccount(res.data,dataAccounts)
            })
       }else{
            followUser(data.user.id, token)
            .then((res)=>{
                updateUser(res.data,dataAll)
                handleUpdateAccount(res.data,dataAccounts)
            })
        
       }
       }else{
        isShowingLogin();
       }

    };




    return (
        <div id={index} className={cx('wrapper')}>
            <div className={cx('avatar-wrap')}>
                <Tippy
                    placement="bottom-start"
                    interactive={true}
                    delay={[400, 400]}
                    render={(attrs) => (
                        <div className={cx('user-wrap')} {...attrs}>
                            <Wrapper>
                                {
                                    auth ? (
                                        data.user.is_followed ? (
                                                    <AccountPreview
                                                        data={data.user}
                                                        onClick={handleFollow}
                                                        outline
                                                        nameBtn="Đang Follow"
                                                    />
                                                ) : (
                                                    <AccountPreview
                                                        data={data.user}
                                                        onClick={handleFollow}
                                                        outlinePrimary
                                                        nameBtn="Follow"
                                                    />
                                                )
                                            )
                                           :(
                                            <AccountPreview
                                                data={data.user}
                                                onClick={isShowingLogin}
                                                outlinePrimary
                                                nameBtn="Follow"
                                            />
                                           )
                                }
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
                    {auth ? (
                        !followingPage ? (
                            !data.user.is_followed ? (
                                <div className={cx('btn')}>
                                    <Button outlinePrimary onClick={handleFollow}>
                                        Follow
                                    </Button>
                                </div>
                            ) : (
                                <div className={cx('btn')}>
                                    <Button outline onClick={handleFollow}>
                                        Đang follow
                                    </Button>
                                </div>
                            )
                        ) :(null)
                    ) : (
                        <div className={cx('btn')}>
                            <Button
                                outlinePrimary
                                onclick={() => {
                                    isShowingLogin();
                                }}
                            >
                                Follow
                            </Button>
                        </div>
                    )}
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
                            onClick={handleClick}
                            src={data.thumb_url}
                            alt=""
                        />
                        <video
                            muted={false}
                            ref={videoRef}
                            onClick={() => {
                                onVideoClick();
                                handleClick();
                            }}
                            loop
                            playsInline={true}
                            poster={data.thumb_url}
                        >
                            <source src={data.file_url} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                        <div className={cx('controls')}>
                            <div className={cx('btn-wrap')}>
                                <button
                                    className={cx('btn-play', `${playing ? 'hide' : ''}`)}
                                    onClick={() => {
                                        onVideoClick();
                                        setInteraction(true);
                                    }}
                                >
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
                                            setVolume(`${e.target.value}`);

                                            videoRef.current.volume = volume;
                                        }}
                                        value={volume}
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                    ></input>
                                </div>
                                {volume === '0' ? (
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
                            <i className={cx('icon')} onClick={handleLikeVideo}>
                                {auth ? data.is_liked ? <LikeIconActive /> : <LikeIcon /> : <LikeIcon />}
                            </i>
                            <p className={cx('like-count')}>{data.likes_count}</p>
                        </button>
                        <button>
                            <i
                                className={cx('icon')}
                                onClick={() => {
                                    handleClick();
                                }}
                            >
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

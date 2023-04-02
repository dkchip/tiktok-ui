import classNames from 'classnames/bind';
import styles from './ModeBrowser.module.scss';
import VideoMode from './Video/VideoMode';
import Button from '../Button';
import { useEffect, useState,useContext } from 'react';
import { useDispatch } from 'react-redux';


import {
    MusicIcon,
    LikeIcon,
    LikeIconActive,
    CommentIcon,
    FacebookIcon,
    DipIcon,
    WhatsAppIcon,
    TwitterIcon,
    ShareIcon,
    EmojiIcon,
    LikeCommentIcon,
    // LikeCommentActiveIcon,
} from '../Icon';
import Tippy from '@tippyjs/react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { followUser,unfollowUser } from '../../services/userServices';
import { likeVideos,unLikeVideos } from '../../services/videoService';
import { ModalContextKeys } from '../../contexts/ModalContext';
import { updateVideo ,updateVideoFollowing,setVideosUser} from '../../store/slices/videosSlice';
import { updateAccount } from '../../store/slices/accountSlice';
import { setOtherUser } from '../../store/slices/userSlice';

const cx = classNames.bind(styles);
function ModeBrowser({ modalHide, data = [] }) {
    const {auth} = useSelector((state)=>state.user);
    const token = Cookies.get("tokenAuth")
    const {isShowingLogin} = useContext(ModalContextKeys);
    const dispatch = useDispatch();

    const [ indexVideo, setIndexVideo,typeModal] = data;



    const dataAllVideo = useSelector((state)=>{
        if(typeModal === "home"){
            return state.videos.dataAllVideos
        }else if(typeModal === "following"){
             return state.videos.dataAllVideosFollowing
        }else{
            return state.videos.dataAllVideosUser;
        }
    });

    const {dataAccounts} = useSelector((state)=> state.accounts);



    const dataVideo = dataAllVideo[indexVideo];
    const [volumeModal, setVolumeModal] = useState('0.5');
    const [dataComments, setDataComments] = useState({});


    const updateVideos = (data,dataAllVideos) => {

        const indexVideo = dataAllVideos.findIndex((video)=>{
            return video.uuid === data.uuid;
        }) 
        const tempDataAllVideos = [...dataAllVideos]
        tempDataAllVideos[indexVideo] = data;
        if(typeModal === "home"){
            dispatch(updateVideo(tempDataAllVideos));
        }else if(typeModal === "following"){
            dispatch(updateVideoFollowing(tempDataAllVideos))
        }else{
            dispatch(setVideosUser(tempDataAllVideos))
            dispatch(setOtherUser(data.user))
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
        if(typeModal === "home"){
            dispatch(updateVideo(newDataAllVideos));
        }else if(typeModal === "following"){
            dispatch(updateVideoFollowing(newDataAllVideos))
        }else{
            dispatch(setVideosUser(newDataAllVideos))
            dispatch(setOtherUser(data))
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

    useEffect(() => {
        // const uuid = data[0].uuid;
        // getComments(uuid, 'comments').then((res) => {
        //     setDataComments(res.data.data);
        // });
    }, [data[0]]);

    const handleNextVideo = () => {
        setIndexVideo(indexVideo + 1);
    };

    const handlePrevVideo = () => {
        setIndexVideo(indexVideo - 1);
    };

    const handleFollow = () => {
        if(auth){
            if(dataVideo.user.is_followed){
                unfollowUser(dataVideo.user.id, token)
                .then((res)=>{    
                    updateUser(res.data,dataAllVideo);
                    handleUpdateAccount(res.data,dataAccounts);

                })
            }else{
                followUser(dataVideo.user.id, token)
                .then((res)=>{
                    
                    updateUser(res.data,dataAllVideo);
                    handleUpdateAccount(res.data,dataAccounts);
                })
            }
        }else{
            isShowingLogin();
        }
    };

   

    const handleLikeVideo = () => {
        if (auth) {
            if (dataVideo.is_liked) {
                unLikeVideos(dataVideo.uuid, token)
                .then((res)=>{
                    updateVideos(res.data.data,dataAllVideo)
                })
            } else {
                likeVideos(dataVideo.uuid, token)
                .then((res)=>{
                    updateVideos(res.data.data,dataAllVideo)
                })
            }
        } else {
            isShowingLogin();
        }
    };
   

    return (
        <div className={cx('container')}>
            <div className={cx('video-container')}>
                <VideoMode
                    modalHide={modalHide}
                    data={dataVideo}
                    dataAll={dataAllVideo}
                    indexVideo={indexVideo}
                    handleNext={handleNextVideo}
                    handlePrev={handlePrevVideo}
                    volumeModal={volumeModal}
                    setVolumeModal={setVolumeModal}
                    typeModal = {typeModal}
                />
            </div>
            <div className={cx('content-container')}>
                <div className={cx('header')}>
                    <div className={cx('info-user')}>
                        <img className={cx('user-avatar')} src={dataVideo.user.avatar} alt="" />
                        <div className={cx('name-container')}>
                            <h4 className={cx('nick-name')}>{dataVideo.user.nickname}</h4>
                            <span className={cx('full-name')}>
                                {dataVideo.user.first_name + ' ' + dataVideo.user.last_name}
                            </span>
                        </div>
                        <div className={cx("btn-follow")}>
                            {
                                auth ? (
                                    dataVideo.user.is_followed ? <Button onclick={handleFollow} outline>Đang Follow</Button>
                                                    : <Button onclick={handleFollow} outlinePrimary>Follow</Button>
                                        )
                                    :(
                                        <Button onclick={isShowingLogin} outlinePrimary>Follow</Button>
                                    )
                            }
                        </div>
                        
                    </div>
                    <span className={cx('description')}>{dataVideo.description}</span>
                    <span className={cx('link-music')} href="">
                        <i>
                            <MusicIcon></MusicIcon>
                        </i>
                        <h4 className={cx('name-music')}>{dataVideo.music}</h4>
                    </span>

                    <div className={cx('interact')}>
                        <div className={cx('actions')}>
                            <div className={cx('like')}>
                                <i onClick = {handleLikeVideo}>
                                    {
                                        dataVideo.is_liked ? <LikeIconActive width='18' height='18' />
                                                : <LikeIcon width='18' height='18' />
                                    }
                                </i>
                                <span className={cx('like-count')}>{dataVideo.likes_count}</span>
                            </div>
                            <div className={cx('comment-icon')}>
                                <i>
                                    <CommentIcon width="18" height="18" />
                                </i>
                                <span className={cx('comment-count')}>{dataVideo.comments_count}</span>
                            </div>
                        </div>
                        <div className={cx('share')}>
                            <Tippy content="Nhúng">
                                <i className={cx('share-icon')}>
                                    <DipIcon width="22" height="22" />
                                </i>
                            </Tippy>
                            <Tippy content="">
                                <i className={cx('share-icon')}>
                                    <FacebookIcon width="22" height="22" />
                                </i>
                            </Tippy>
                            <Tippy content="">
                                <i className={cx('share-icon')}>
                                    <WhatsAppIcon width="22" height="22" />
                                </i>
                            </Tippy>
                            <Tippy content="">
                                <i className={cx('share-icon')}>
                                    <TwitterIcon width="22" height="22"></TwitterIcon>
                                </i>
                            </Tippy>
                            <Tippy content="">
                                <i className={cx('share-icon')}>
                                    <ShareIcon width="22" height="22" />
                                </i>
                            </Tippy>
                        </div>
                    </div>
                    <div className={cx('coppy-link')}>
                        <p className={cx('link-text')}>
                            https://www.tiktok.com/@game_factory02/video/7202245618872356139?is_from_webapp=1&sender_device=pc&web_id=7195793796022322734
                        </p>
                        <button className={cx('coppy-btn')}>Sao chép liên kết </button>
                    </div>
                </div>

                <div className={cx('comment')}>
                    <div className={cx('comment-list')}>
                        {dataComments.length > 0 ? dataComments.map((item, index) => {
                            return (
                                <div className={cx('comment-item')}>
                                    <img
                                        className={cx('user-avatar')}
                                        src={item.user.avatar}
                                        alt=""
                                    />
                                    <div className={cx('comment-content')}>
                                        <h3 className={cx('full-name-comment')}>{item.user.nickname}</h3>
                                        <span className={cx('comment-text')}>{item.comment}</span>
                                        <div className={cx('comment-sub-content')}>
                                            <span className={cx('comment-time')}>Time</span>
                                            <span className={cx('comment-reply')}>Trả lời</span>
                                        </div>
                                    </div>
                                    <div className={cx('comment-like')}>
                                        <i className={cx('like-icon')}>
                                            <LikeCommentIcon />
                                        </i>
                                    </div>
                                </div>
                            )
                        }) :
                            <span className={cx("no-comment")}>Hãy là người đầu tiên bình luận</span>
                        }
                    </div>
                </div>
                <div className={cx('comment-inpput-container')}>
                    <div className={cx('comment-input-wrapper')}>
                        {/* <button className={cx('comment-login')}>Please log in to comment</button> */}
                        <div className={cx('comment-input')}>
                            <input type="text"></input>
                            <i className={cx('emoji-icon')}>
                                <EmojiIcon />
                            </i>
                        </div>
                    </div>
                    <button className={cx('submit-comment')}>Đăng</button>
                </div>
            </div>
        </div>
    );
}

export default ModeBrowser;

import { useRef, useState,useContext } from 'react';

import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';

import { VideoPublic} from '../../components/Video';
import { Link } from 'react-router-dom';
import { PlayOutlineIcon } from '../../components/Icon';
import { ModalContextKeys } from '../../contexts/ModalContext';
const cx = classNames.bind(styles);

function Video({data,indexItem}) {
    const [videoPlaying,setVideoPlaying] = useState(false);
    const videoRef = useRef()
    const {isShowingModalVideo,setTypeModal,setIndexVideo} = useContext(ModalContextKeys);

    
    const handleClick = ()=>{
        isShowingModalVideo();
        setTypeModal("user");
        setIndexVideo(indexItem);
    }

    const handlePlay = ()=>{
        if(videoPlaying === false){
            setVideoPlaying(true);
            videoRef.current.play();
            videoRef.current.currentTime = 0;
        }
    }

    const handlePause = ()=>{
        setVideoPlaying(false)
        videoRef.current.pause();
    }
    return (
        <div
             className={cx('video-container')}  
             onMouseOver ={handlePlay}
             onMouseLeave = {handlePause}
             onClick ={handleClick}
        >
            <div style={{ position: 'relative' }}>
                <div style={{ paddingTop: '136%' }}>
                    <div className={cx('video-wrap')}>
                        <VideoPublic videoRef={videoRef} data = {data} videoPlaying = {videoPlaying}></VideoPublic>
                        <div className={cx('view')}>
                            <i className={cx('icon')}>
                                <PlayOutlineIcon />
                            </i>
                            <h4 className={cx('view-count')}>{data.views_count}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('desc')}>
                <Link>{data.description}</Link>
            </div>
        </div>
    );
}

export default Video;

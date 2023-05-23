import classNames from 'classnames/bind';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './UpLoad.module.scss';
import {
    ActionIcon,
    LiveTiviIcon,
    MusicIcon,
    PauseIcon,
    PlayIcon,
    SearchWhiteIcon,
    TickIcon,
    VolumeOffIcon,
    VolumeOnIcon,
} from '../../components/Icon/Icon';
import images from '../../asset/img';
import Image from '../../components/Image';



const cx = classNames.bind(styles);

function VideoPlayerPreview({dataVideo,videoRef,handleProgress,resetValue,uploadRef,caption,confirmModalShowing}) {
    const authData = useSelector((state) => state.user);

    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [intDuration, setIntDuration] = useState(null);
    const [volume, setVolume] = useState(true);
    const [playing, setPlaying] = useState(false);

    const updateDuration = (time) => {
        setIntDuration(time);
        const timeFormatted = formatTime(time);
        setDuration(timeFormatted);
    };

    const updateTime = (time) => {
        const timeFormatted = formatTime(time);
        setProgress(`${Math.round((time / intDuration) * 100)}`);
        setTime(timeFormatted);
    };

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minuteValue, secondValue;

        minuteValue = minutes < 10 ? '0' + minutes : minutes;
        secondValue = seconds < 10 ? '0' + seconds : seconds;

        let mediaTime = minuteValue + ':' + secondValue;
        return mediaTime;
    };

    const handleVolumeChange = () => {
        if (volume) {
            videoRef.current.volume = 0;
            setVolume(false);
        } else {
            videoRef.current.volume = 1;
            setVolume(true);
        }
    };
    const onChangeInput = (e) => {
        videoRef.current.currentTime = (intDuration / 100) * Number(e.target.value);
    };

    const handlePlay = () => {
        if (playing === false) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    return (
        <div className={cx('upload-container')}>
            {dataVideo.name ? (
                <div className={cx('video-preview')}>
                    <div className={cx('app-frame')}>
                        <div className={cx('app-menu')}></div>
                        <div className={cx('video-wrapper')}>
                            <div className={cx('tab-header')}>
                                <LiveTiviIcon />
                                <div>
                                    <span className={cx('tab-header-title')}>Following</span>
                                    <span className={cx('tab-header-title', 'mgl-8')}>For you</span>
                                </div>
                                <SearchWhiteIcon />
                            </div>
                            <div className={cx('video')}>
                                <video
                                    ref={videoRef}
                                    onProgress={(e) => {
                                        updateDuration(e.target.duration);
                                    }}
                                    onTimeUpdate={(e) => {
                                        updateTime(e.currentTarget.currentTime);
                                    }}
                                >
                                    <source type="video/mp4" src={dataVideo.path}></source>
                                </video>
                            </div>
                            <div className={cx('actions-video')}>
                                <div className={cx('avartar')}>
                                    <Image src={authData.currentUser.avatar} />
                                </div>
                                <ActionIcon />
                                <div className={cx('spin-disc', `${playing ? 'rotate' : ''}`)}>
                                    <Image src={authData.currentUser.avatar} />
                                </div>
                            </div>

                            <div className={cx('desc-video')}>
                                <span className={cx('nick-name')}>@{authData.currentUser.nickname}</span>
                                <span className={cx('caption')}>{caption || dataVideo.name}</span>
                                <div className={cx('name-music')}>
                                    <MusicIcon />
                                    <span>Original sound - {authData.currentUser.nickname}</span>
                                </div>
                            </div>
                        </div>
                        <div className={cx('controls')}>
                            <div className={cx('play-pause')} onClick={handlePlay}>
                                {playing ? <PauseIcon /> : <PlayIcon />}
                            </div>
                            <div className={cx('volume-container')}>
                                <div className={cx('volume-icon')} onClick={handleVolumeChange}>
                                    {volume ? <VolumeOnIcon /> : <VolumeOffIcon />}
                                </div>{' '}
                            </div>
                            <div className={cx('time')}>
                                <span>
                                    {time}/{duration}
                                </span>
                            </div>
                            <div className={cx('progress-container')}>
                                <div
                                    className={cx('dot')}
                                    style={{ left: `${progress}%`, transform: `translateX(-${progress}%)` }}
                                ></div>
                                <div className={cx('progress-bar')} style={{ width: `${progress}%` }}></div>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    step="1"
                                    value={progress}
                                    onChange={(e) => {
                                        onChangeInput(e);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('upload-card')}>
                    <img className={cx('img-upload')} src={images.upLoad} alt=" " />
                    <h4 className={cx('upload-heading', 'mgt-6')}>Select video to upload</h4>
                    <span className={cx('desc', 'mgt-6')}>Or drag and drop a file</span>
                    <span className={cx('desc', 'mgt-16')}>MP4 or WebM</span>
                    <span className={cx('desc', 'mgt-6')}>720x1260 resolution or higher</span>
                    <span className={cx('desc', 'mgt-6')}>Up to 30 minutes</span>
                    <span className={cx('desc', 'mgt-6', 'mgbt-22')}>Less than 2 GB</span>

                    <label className={cx('btn-select')} htmlFor="file">
                        Select file
                    </label>
                    <input
                        className={cx('input-file')}
                        ref={uploadRef}
                        type="file"
                        name="file"
                        id="file"
                        accept="video/mp4,video/x-m4v,video/*"
                        onChange={(e) => {
                            handleProgress(e);
                        }}
                    />
                </div>
            )}

            {dataVideo.name ? (
                <div className={cx('change-video')}>
                    <div>
                        <span className={cx('title')}>
                            <TickIcon />
                            <span>{dataVideo.name}</span>
                        </span>
                        <span className={cx('change-btn')} onClick={confirmModalShowing}>
                            Change video
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default VideoPlayerPreview;

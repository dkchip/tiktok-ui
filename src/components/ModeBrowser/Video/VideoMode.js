import classNames from 'classnames/bind';
import styles from './VideoMode.module.scss';
import { PlayLargeIcon, VolumeOnIcon, ArrowNextIcon, ArrowPrevIcon, CloseWhiteIcon, VolumeOffIcon } from '../../Icon';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);
function VideoMode({ modalHide, data, dataAll, indexVideo, handleNext, handlePrev, volumeModal, setVolumeModal,typeModal }) {
    const videoRef = useRef();
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState('0');
    const [timeUpdate, setTimeUpdate] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [durationInt, setDurationInt] = useState(null);

    useEffect(() => {
        if(typeModal !== "user"){
            const handleScroll = () => {
                const element = document.querySelector(`div[id ="${indexVideo}"]`);
                element.scrollIntoView({ behavior: 'smooth' });
            };

            handleScroll();
        }
    }, [indexVideo]);

    useEffect(() => {
        videoRef.current.volume = volumeModal;
    }, [volumeModal]);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minuteValue, secondValue;

        minuteValue = minutes < 10 ? '0' + minutes : minutes;
        secondValue = seconds < 10 ? '0' + seconds : seconds;

        let mediaTime = minuteValue + ':' + secondValue;
        return mediaTime;
    };

    const handleInput = (e) => {
        videoRef.current.currentTime = (durationInt / 100) * Number(e.target.value);
    };

    const onTimeUpdate = (e) => {
        const time = formatTime(e);
        setProgress(`${Math.round((e / durationInt) * 100)}`);
        setTimeUpdate(time);
    };

    const onDurationUpdate = (e) => {
        setDurationInt(e);
        const time = formatTime(e);
        setDuration(time);
    };

    const handlePlay = () => {
        if (isPlaying === false) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolume = () => {
        if (volumeModal === '0') {
            setVolumeModal('0.5');
        } else {
            setVolumeModal('0');
        }
    };

    const handleClose = () => {
        modalHide();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('image')} style={{ background: `url(${data.thumb_url})` }}></div>
                <video
                    loop
                    onProgress={(e) => {
                        onDurationUpdate(e.target.duration);
                    }}
                    onTimeUpdate={(e) => {
                        onTimeUpdate(e.currentTarget.currentTime);
                    }}
                    onClick={handlePlay}
                    ref={videoRef}
                    className={cx('video')}
                    src={data.file_url}
                    autoPlay={true}
                ></video>
            </div>
            {!isPlaying ? (
                <button onClick={handlePlay} className={cx('control-play')}>
                    <PlayLargeIcon />
                </button>
            ) : null}

            <div className={cx('control-close')}>
                <button onClick={handleClose} className={cx('btn-close')}>
                    <CloseWhiteIcon></CloseWhiteIcon>
                </button>
            </div>

            <div className={cx('process-wrapper')}>
                <div className={cx('process-video')}>
                    <div className={cx('process-btn')} style={{ left: `${progress - 3}%` }}></div>
                    <div className={cx('process-bar')} style={{ width: `${progress}%` }}></div>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={progress}
                        onChange={(e) => {
                            handleInput(e);
                        }}
                    />
                </div>
                <div className={cx('time-video')}>
                    {timeUpdate}:{duration}
                </div>
            </div>
            <div className={cx('controls-volume')}>
                <div className={cx('volume-input')}>
                    <input
                        onChange={(e) => {
                            setVolumeModal(`${e.target.value}`);

                            videoRef.current.volume = volumeModal;
                        }}
                        value={volumeModal}
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                    ></input>
                </div>
                {volumeModal === '0' ? (
                    <button onClick={handleVolume} className={cx('volume-icon-off')}>
                        <VolumeOffIcon />
                    </button>
                ) : (
                    <button onClick={handleVolume} className={cx('volume-icon-on')}>
                        <VolumeOnIcon />
                    </button>
                )}
            </div>
            <div className={cx('controls-next-prev')}>
                <button
                    className={cx('btn-next', `${indexVideo === 0 ? 'hiden-btn' : ''}`)}
                    onClick={() => {
                        handlePrev();
                    }}
                >
                    <ArrowPrevIcon></ArrowPrevIcon>
                </button>

                <button
                    className={cx('btn-down', `${indexVideo === dataAll.length - 1 ? 'hiden-btn' : ''}`)}
                    onClick={() => {
                        handleNext();
                    }}
                >
                    <ArrowNextIcon></ArrowNextIcon>
                </button>
            </div>
        </div>
    );
}

export default VideoMode;

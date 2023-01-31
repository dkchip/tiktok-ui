import styles from './Video.module.scss'
import classNames from 'classnames/bind';
import Image from '../Image';
const cx = classNames.bind(styles);
function Video({videoPlaying,videoRef,data}) {
    return (
        <div className={cx('video')}>
            <Image className={cx('image-video')} src={data.thumb_url} style={{ zIndex: !videoPlaying ? '12' : '-1' }} />
            <video ref={videoRef} muted={true} loop>
                <source src={data.file_url}></source>
            </video>
        </div>
    );
}

export default Video;

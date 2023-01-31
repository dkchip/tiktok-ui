import styles from './Following.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';

import { VideoPublic } from '../../components/Video';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import { Ticker } from '../../components/Icon';
import Button from '../../components/Button';
const cx = classNames.bind(styles);

function CardPlayerItem({ data }) {
    const [playing, setPlaying] = useState();
    const videoRef = useRef();
    const fullName = data.first_name + ' ' + data.last_name;

    const handlePlay = () => {
        if (!playing) {
            setPlaying(true);
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handlePause = () => {
        setPlaying(false);
    };
    return (
        <div className={cx('card-player')} onMouseOver={handlePlay} onMouseLeave={handlePause}>
            <Link className={cx('link-profile')} to={`/@${data.nickname}`}>
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <VideoPublic data={data.popular_video} videoPlaying={playing} videoRef={videoRef} />
                    <div className={cx('info-container')}>
                        <Image src={data.avatar} />
                        <h2 className={cx('full-name')}>{fullName.trim().length > 0 ? fullName : 'Erro name'}</h2>
                        <h6 className={cx('nick-name')}>
                            {data.nickname}
                            {data.tick ? (
                                <i className={cx('icon')}>
                                    <Ticker />
                                </i>
                            ) : undefined}
                        </h6>
                            <Button primary>Follow</Button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CardPlayerItem;

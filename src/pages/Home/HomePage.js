import { useState, useEffect, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';

import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import request from '../../utils/request';
import VideoItem from '../../components/VideoItem/VideoItem';
// import { SpinnerIcon } from '../../components/Icon';

const cx = classNames.bind(styles);

function HomePage() {
    document.title = "Tiktok - Make your day"
    const [dataVideo, setDataVideo] = useState([]);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState(0);
    

    const loadMore = useCallback(() => {
        return setTimeout(() => {
            request
                .get('videos', {
                    params: {
                        type: 'for-you',
                        page: page,
                    },
                })
                .then((res) => {
                    if (Array.isArray(res.data.data)) {
                        setDataVideo((prev) => [...prev, ...res.data.data]);
                        setPage((prev) => prev + 1);
                    }
                });
        }, 600);
    }, [page, setDataVideo]);

    useEffect(() => {
        const timeout = loadMore();
        return () => clearTimeout(timeout);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleVolume = (e) => {
        setVolume(e.target.value / 100);
    };

    return (
        <div className={'wrapper'}>
            <div className={cx('content')}>
                <Virtuoso
                    data={dataVideo}
                    useWindowScroll
                    endReached={() => {
                        loadMore();
                    }}
                    itemContent={(index, data) => (
                        <VideoItem key={index}
                                    data={data}
                                    volume={volume} 
                                    onChangeVolume={handleVolume}
                                    setVolume={setVolume} 
      
                        />
                    )}
                    components={{
                        Footer: () => {
                            return (
                                <div className={cx('loadingio-spinner-dual-ball-lwjvw2p7xft')}>
                                    <div className={cx('ldio-ol68y82xof9')}>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            );
                        },
                    }}
                />
            </div>
            <ButtonBottom />
        </div>
    );
}

export default HomePage;

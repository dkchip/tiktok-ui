import { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getVideos,getVideosAuth } from '../../services/videoService';
import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import VideoItem from '../../components/VideoItem/VideoItem';
import { ModalContextKeys } from '../../contexts/ModalContext';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
function HomePage() {
    document.title = 'Tiktok - Make your day';
    const [dataVideo, setDataVideo] = useState([]);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState('0');
    const [interaction, setInteraction] = useState(true);
    const [dataFollower,setDataFollower] = useState("");

    const { setDataAllVideo } = useContext(ModalContextKeys);

    const token = Cookies.get('tokenAuth');

    useEffect(() => {
        const time = setTimeout(() => {
            if (token) {
                getVideosAuth(page, 'for-you',token)
                   .then((res) => {
    
                        setDataVideo((prev) => [...prev, ...res.data.data]);
                });
            } else {
                getVideos(page, 'for-you')
                    .then((res) => {
                        setDataVideo((prev) => [...prev, ...res.data.data]);
                });
            }
        }, 1000);
        return () => {
            clearTimeout(time);
        };
    }, [page]);

    useEffect(() => {
        setDataAllVideo(dataVideo);
        // eslint-disable-next-line
    }, [dataVideo]);

    return dataVideo ? (
        <div className={'wrapper'}>
            <div className={cx('content')}>
                <InfiniteScroll
                    dataLength={dataVideo.length}
                    next={() => {
                        setPage((prev) => prev + 1);
                    }}
                    hasMore={true}
                    loader={
                        <div className={cx('loadingio-spinner-dual-ball-lwjvw2p7xft')}>
                            <div className={cx('ldio-ol68y82xof9')}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    }
                    scrollThreshold="5px"
                >
                    {dataVideo.map((item, index) => {
                        return (
                            <VideoItem
                                key={index}
                                index={index}
                                data={item}
                                dataAll={dataVideo}
                                volume={volume}
                                setVolume={setVolume}
                                interaction={interaction}
                                setInteraction={setInteraction}
                                dataFollower={dataFollower}
                                setDataFollower={setDataFollower}
                            />
                        );
                    })}
                </InfiniteScroll>
            </div>
            {/* <ModeBrowser /> */}
            <ButtonBottom />
        </div>
    ) : null;
}

export default HomePage;

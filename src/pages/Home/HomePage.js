import { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getVideos,getVideosAuth } from '../../services/videoService';
import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';
import VideoItem from '../../components/VideoItem/VideoItem';
import Cookies from 'js-cookie';
import { useDispatch ,useSelector } from 'react-redux';
import { setvideos,updateVideo } from '../../store/slices/videosSlice';


const cx = classNames.bind(styles);
function HomePage() {
    const dispatch = useDispatch();
    document.title = 'Tiktok - Make your day';
    // const [dataVideo, setDataVideo] = useState([]);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState('0');
    const [interaction, setInteraction] = useState(true);
    const [dataFollower,setDataFollower] = useState("");
    const [loading, setLoading] = useState(false);



    const token = Cookies.get('tokenAuth');

    //Reset data video whien load page
    useEffect(()=>{
        dispatch(updateVideo([]))
    },[])

    useEffect(() => {
        const time = setTimeout(() => {
            if (token) {
                getVideosAuth(page, 'for-you',token)
                   .then((res) => {
                    setLoading(true)
                        dispatch(setvideos(res.data.data))      
                });
            } else {
                getVideos(page, 'for-you')
                    .then((res) => {
                        setLoading(true)
                        dispatch(setvideos(res.data.data));
                });
            }
        }, 1000);
        return () => {
            clearTimeout(time);
        };
    }, [page]);

    const dataVideo = useSelector((state) =>state.videos)
    
         


    return loading ? (
        dataVideo.dataAllVideos.length > 0 ? (
            <div className={'wrapper'}>
                <div className={cx('content')}>
                    <InfiniteScroll
                        dataLength={dataVideo.dataAllVideos.length}
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
                        {dataVideo.dataAllVideos.map((item, index) => {
                            return (
                                <VideoItem
                                    key={index}
                                    index={index}
                                    data={item}
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
                <ButtonBottom />
            </div>
        ) : null
    ) :(
        <div className={cx('loadingio-spinner-dual-ball-lwjvw2p7xft')}>
            <div className={cx('ldio-ol68y82xof9')}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>  
    )
}

export default HomePage;

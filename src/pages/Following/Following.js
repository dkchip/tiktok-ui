import { useEffect, useState,useContext } from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cookies from 'js-cookie';

import styles from './Following.module.scss';
import { setVideosFollowing ,updateVideoFollowing} from '../../store/slices/videosSlice';
import { setAccountPreview } from '../../store/slices/accountSlice';
import ButtonBottom from '../../components/ButtonBottom/ButtonBottom';
import { getSuggestedUsers } from '../../services/userServices';
import CardPlayerItem from './CardPlayerItem';
import VideoItem from '../../components/VideoItem/VideoItem';
import { getVideosAuth } from '../../services/videoService';
import { ModalContextKeys } from '../../contexts/ModalContext';



const cx = classNames.bind(styles);
function Following() {
    document.title = 'Tiktok - Make your day';
    const dispatch = useDispatch();
    const token = Cookies.get('tokenAuth');
    const { auth } = useSelector((state) => {
        return state.user;
    });

    
    const {isShowing} = useContext(ModalContextKeys);
    const [page, setPage] = useState(1);
    const [volume, setVolume] = useState('0');
    const { dataAllVideosFollowing } = useSelector((state) => state.videos);

    // const [data, setData] = useState([]);
    const [interaction, setInteraction] = useState(true);
    const [loadMore, setLoadMore] = useState(true);
    const [loading,setLoadingData] = useState(false);
    const dataAccountsPreview = useSelector(state => state.accounts).dataAccountsPreview;


    // Reset data when load page
    useEffect(()=>{
        dispatch(updateVideoFollowing([]));
        dispatch(setAccountPreview([]));
    },[])

    useEffect(() => {
        if(isShowing === false){
            window.history.replaceState({},"", `/following`);
        }
    },[isShowing])
    

    useEffect(() => {

        if (token) {
            const timer =   setTimeout(()=>{
                getVideosAuth(page, 'following', token).then((res) => {
                    dispatch(setVideosFollowing(res.data.data));
                    setLoadingData(true)
                    if(res.data.meta.pagination.total_pages === page){
                        setLoadMore(false)
                    }else{
                        setLoadMore(true)
                    }
                    });
            },1000)
            return ()=>{clearTimeout(timer)}
        }
    }, [page]);

    useEffect(() => {
        getSuggestedUsers(1, 12).then((res) => 
            dispatch(setAccountPreview(res.data))
    )
    }, []);

    return !auth ? (
        <div className={cx('container')}>
            <div className={cx('list-card')}>
                {dataAccountsPreview.map((item, index) => {
                    return <CardPlayerItem key={index} data={item} />;
                })}
            </div>
            <ButtonBottom />
        </div>
    ) : loading ? (
        dataAllVideosFollowing.length > 0 ? (
            <div className={'wrapper'}>
                <div className={cx('content')}>
                    <InfiniteScroll
                        dataLength={dataAllVideosFollowing.length}
                        next={() => {
                            setPage((prev) => prev + 1);
                        }}
                        hasMore={loadMore}
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
                        {dataAllVideosFollowing.map((item, index) => {
                            return (
                                <VideoItem
                                    key={index}
                                    index={index}
                                    data={item}
                                    volume={volume}
                                    setVolume={setVolume}
                                    interaction={interaction}
                                    setInteraction={setInteraction}
                                    followingPage = {true}
                                />
                            );
                        })}
                    </InfiniteScroll>
                </div>
                <ButtonBottom />
            </div>
            ) : (
            <div className={cx('container')}>
                <div className={cx('list-card')}>
                    {dataAccountsPreview.map((item, index) => {
                        return <CardPlayerItem key={index} data={item} />;
                    })}
                </div>
                <ButtonBottom />
            </div>
        )
    ):(
        <div className={cx('loadingio-spinner-dual-ball-lwjvw2p7xft')}>
                                <div className={cx('ldio-ol68y82xof9')}>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
    )
}

export default Following;

import styles from './Following.module.scss';
import classNames from 'classnames/bind';
import { useState, useRef,useContext } from 'react';
import  { ModalContextKeys } from '../../contexts/ModalContext';
import { useSelector , useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { VideoPublic } from '../../components/Video';
import { Link } from 'react-router-dom';
import Image from '../../components/Image';
import { Ticker } from '../../components/Icon';
import Button from '../../components/Button';
import { followUser,unfollowUser } from '../../services/userServices';
import { setAccountPreview, updateAccount } from '../../store/slices/accountSlice';
const cx = classNames.bind(styles);

function CardPlayerItem({ data }) {

    const [playing, setPlaying] = useState();
    const videoRef = useRef();
    const fullName = data.first_name + ' ' + data.last_name;

    const dispatch = useDispatch();
    const token = Cookies.get("tokenAuth");
    const dataAccountsPreview = useSelector(state => state.accounts).dataAccountsPreview;

    const {auth} = useSelector(state => state.user);
    const {isShowingLogin} = useContext(ModalContextKeys);
    const dataAccounts = useSelector(state => state.accounts).dataAccounts;

    const handlePlay = () => {
        if (!playing) {
            setPlaying(true);
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleUpdateAccount = (data,dataAll)=>{
        const indexItem = dataAll.findIndex((item)=>{
            return item.id === data.id;
        })
        if(indexItem !== -1) {
            const newDataAccounts = [...dataAll];
            newDataAccounts[indexItem] = data;
            dispatch(updateAccount(newDataAccounts));
        }else{
            return 0;
        }
        
    }

    const handleUpdateAccountPreview = (data,dataAll)=>{
        const indexItem = dataAll.findIndex((item)=>{
            return item.id === data.id;
        })
        if(indexItem !==  -1){
            const newDataAccounts = [...dataAll];
            newDataAccounts[indexItem] = {...newDataAccounts[indexItem],is_followed : data.is_followed};
            dispatch(setAccountPreview(newDataAccounts));
        }
        else{
            return 0;
        }
    }


    const handleFollow = ()=>{
        if(auth){
            if(!data.is_followed){
                followUser(data.id,token)
                .then((res)=>{
                    handleUpdateAccount(res.data,dataAccounts);
                    handleUpdateAccountPreview(res.data,dataAccountsPreview)
                })
            }else{
                unfollowUser(data.id,token)
                .then((res)=>{
                    handleUpdateAccount(res.data,dataAccounts)
                    handleUpdateAccountPreview(res.data,dataAccountsPreview)
                })
            }
        }else{

            isShowingLogin();
        }
    }

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

                       {
                        data.is_followed ? (
                                        <Button onclick={(e)=>{
                                            e.preventDefault();
                                            handleFollow();
                                        }} following >Đang Follow</Button>
                                        ) : (
                                            <Button onclick={(e)=>{
                                                e.preventDefault();
                                                handleFollow();
                                            }} primary>Follow</Button>
                                        )
                       }
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CardPlayerItem;

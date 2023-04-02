import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import Tippy from '@tippyjs/react/headless';

import { Wrapper } from '../../../../components/Popper';
import { Ticker } from '../../../../components/Icon';
import classNames from 'classnames/bind';
import styles from './MenuAccounts.module.scss';
import { AccountPreview } from '../../../../components/AccountPreview';
import { ModalContextKeys } from '../../../../contexts/ModalContext';
import { useContext } from 'react';
import { followUser,unfollowUser } from '../../../../services/userServices';
import Cookies from 'js-cookie';
import { useSelector,useDispatch } from 'react-redux';
import { updateAccount } from '../../../../store/slices/accountSlice';
import { updateVideo } from '../../../../store/slices/videosSlice';


const cx = classNames.bind(styles);
function AcountItem({ data ,following = false}) {
    const dispatch = useDispatch();


    const {isShowingLogin} = useContext(ModalContextKeys)
    const {auth} = useSelector((state) => state.user);
    const {dataAccounts} = useSelector((state)=> state.accounts);
    const {dataAllVideos} = useSelector((state)=> state.videos);
    const token = Cookies.get("tokenAuth")


    const handleUpdateAccount = (data,dataAll)=>{
        const indexItem = dataAll.findIndex((item)=>{
            return item.id === data.id;
        })
        const newDataAccounts = [...dataAll];
        newDataAccounts[indexItem] = data;
        dispatch(updateAccount(newDataAccounts));
    }

    const handleUpdateVideos = (data,dataAll)=>{

        const indexItem = dataAll.findIndex((item)=>{
            return data.id === item.user_id;
        })
        if(indexItem !== -1){
            const tempDataAllVideos = [...dataAll]
            const newDataAllVideos = tempDataAllVideos.map((item) =>  {
                if(item.user.id === data.id) {
    
                  return  { ...item , user : data}
                }
                return item
            })
            dispatch(updateVideo(newDataAllVideos));
        }
    }

    const handleFollow = () => {
        if(auth){
            if(data.is_followed){
                unfollowUser(data.id, token)
                .then((res)=>{
                    handleUpdateAccount(res.data,dataAccounts);

                    handleUpdateVideos(res.data,dataAllVideos)
                })
            }else{
                followUser(data.id, token)
                .then((res)=>{
                    handleUpdateAccount(res.data,dataAccounts);

                    handleUpdateVideos(res.data,dataAllVideos);
                })
            }
            
        }else{
            isShowingLogin();
        }
    };

    return (
        <div>
            {!following ? (<Tippy
                delay={[600, 500]}
                appendTo ={()=> document.body}
                interactive = {false}
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('account-preview')} {...attrs}>
                        <Wrapper>
                            {   
                                auth ? ( data.is_followed ?<AccountPreview data={data} onClick ={handleFollow   } outline nameBtn="Đang Follow" /> 
                                                    : <AccountPreview data={data} onClick = {handleFollow} primary nameBtn="Follow" /> 
                                        )
                                    : (
                                        <AccountPreview data={data} onClick = {isShowingLogin}  primary nameBtn="Follow" />
                                    )
                            }
                        </Wrapper>
                    </div>
                )}
            >
                <Link className={cx('user')} to={`/@${data.nickname}`}>
                    <Image className={cx('image')} src={data.avatar} alt="" />
                    <div className={cx('info')}>
                        <div className={cx('name-wrap')}>
                            <h4 className={cx('nick-name')}>{data.nickname}</h4>
                            <span className={cx('icon')}>{data.tick ? <Ticker /> : undefined}</span>
                        </div>
                        <span className={cx('full-name')}>{data.first_name + ' ' + data.last_name}</span>
                    </div>
                </Link>
            </Tippy>)
            :(
            <Link className={cx('user')} to={`/@${data.nickname}`}>
                <Image className={cx('image')} src={data.avatar} alt="" />
                <div className={cx('info')}>
                    <div className={cx('name-wrap')}>
                        <h4 className={cx('nick-name')}>{data.nickname}</h4>
                        <span className={cx('icon')}>{data.tick ? <Ticker /> : undefined}</span>
                    </div>
                    <span className={cx('full-name')}>{data.first_name + ' ' + data.last_name}</span>
                </div>
            </Link>
            )
        }
        </div>
    );
}

export default AcountItem;

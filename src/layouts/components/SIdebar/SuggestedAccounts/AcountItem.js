import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import Tippy from '@tippyjs/react/headless';

import { Wrapper } from '../../../../components/Popper';
import { Ticker } from '../../../../components/Icon';
import classNames from 'classnames/bind';
import styles from './MenuAccounts.module.scss';
import { AccountPreview } from '../../../../components/AccountPreview';
import { ModalContextKeys } from '../../../../contexts/ModalContext';
import { useState,useContext } from 'react';
import { followUser,unfollowUser } from '../../../../services/userServices';
import Cookies from 'js-cookie';
import store from '../../../../redux/store';


const cx = classNames.bind(styles);
function AcountItem({ data }) {

    const [following,setFollowing] = useState(data.is_followed);

    const {isShowingLogin} = useContext(ModalContextKeys)
    const {auth} = store.getState();
    const token = Cookies.get("tokenAuth")


    const handleFollow = () => {
        followUser(data.id, token);
        setFollowing(true);
        // setDataFollower(`follow ${data.user.id}`);
    };

    const handleUnFollow = () => {
        unfollowUser(data.id, token);
        setFollowing(false);
        // setDataFollower(`unfollow ${data.user.id}`);

    };
    return (
        <div>
            <Tippy
                delay={[600, 500]}
                appendTo ={()=> document.body}
                interactive
                placement="bottom"
                render={(attrs) => (
                    <div className={cx('account-preview')} {...attrs}>
                        <Wrapper>
                            {   
                                auth ? ( following ?<AccountPreview data={data} onClick ={handleUnFollow} outline nameBtn="Đang Follow" /> 
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
            </Tippy>
        </div>
    );
}

export default AcountItem;

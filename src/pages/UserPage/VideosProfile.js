import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';
import { useSelector } from 'react-redux';
import Video from './Video';
import { UserLargeIcon } from '../../components/Icon';

const cx = classNames.bind(styles);

function VideosProfile({ data ,id }) {

    const auth = useSelector((state) => state.user.auth)
    const curentUser = useSelector((state) => state.user.currentUser)
    return  (
      
        auth ? 
        (
            curentUser.id === id ? 
            (
                data.length > 0 ? 
                (   
                    <div className={cx('video-list')}>
                        {
                            data.map((item) => {
                                return (
                                <Video key={item.id} data={item}></Video>
                                );
                            })
                        }
                    </div>
                ) : (
                    <div className={cx("container")}>
                        <div className={cx("wrapper")}>
                            <UserLargeIcon />
                            <h1>Tải video đầu tiên của bạn lên</h1>
                            <span className={cx("title")}>
                                Video của bạn sẽ xuất hiện tại đây
                            </span>
                        </div>
                    </div>
                )
            ) : (
                data.length > 0 ? 
                (
                    <div className={cx('video-list')}>
                        {
                            data.map((item) => {
                                return (
                                <Video key={item.id} data={item}></Video>
                                );
                            })
                        }
                    </div>
                ) : 
                (
                    <div className={cx("container")}>
                        <div className={cx("wrapper")}>
                            <UserLargeIcon />
                            <h1>Không có nội dung</h1>
                            <span className={cx("title")}>
                                Người dùng này chưa đăng bất kỳ video nào
                            </span>
                        </div>
                    </div>
                )
            )
        ) : (
            data.length > 0 ? (
                <div className={cx('video-list')}>
                    {
                        data.map((item) => {
                            return (
                            <Video key={item.id} data={item}></Video>
                            );
                        })
                    }
                </div>
            ) : (
                <div className={cx("container")}>
                    <div className={cx("wrapper")}>
                        <UserLargeIcon />
                        <h1>Không có nội dung</h1>
                        <span className={cx("title")}>
                            Người dùng này chưa đăng bất kỳ video nào
                        </span>
                    </div>
                </div>
            )
        )
    
                
            

    );
}

export default VideosProfile;

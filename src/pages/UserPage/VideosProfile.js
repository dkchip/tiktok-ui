import classNames from 'classnames/bind';
import styles from './UserPage.module.scss';

import Video from './Video';

const cx = classNames.bind(styles);

function VideosProfile({ data }) {


    return (
        <>
            {data.length > 0 ? (
                data.map((item) => {
                    return (
                       <Video key={item.id} data={item}></Video>
                    );
                })
            ) : (
                <div className={cx()}>
                    <h1>NOTTHING</h1>
                </div>
            )}
        </>
    );
}

export default VideosProfile;

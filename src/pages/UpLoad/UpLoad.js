import classNames from 'classnames/bind';
import { useRef, useState,useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';


import { ModalLoadingContextKeys } from '../../contexts/ModalLoadingContext';
import styles from './UpLoad.module.scss';
import Button from '../../components/Button';
import VideoPlayerPreview from './VideoPlayerPreview';
import {  SelectIcon, SpinnerIcon } from '../../components/Icon/Icon';
import { postVideo } from '../../services/videoService';

const cx = classNames.bind(styles);

function UpLoad() {
    const {discardModalShowing,confirm,confirmModalShowing,confirmValue,successModalShowing} = useContext(ModalLoadingContextKeys);

    const authData = useSelector((state) => state.user);
    const videoRef = useRef();
    const uploadRef = useRef();

    const token = Cookies.get('tokenAuth');

    const [dataVideo, setDataVideo] = useState({
        name: '',
        path: '',
    });


    const [showOptions, setShowOptions] = useState(false);
    const [fileVideo, setFileVideo] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    //Values form
    const [caption, setCaption] = useState('');
    const [selectValue, setSelectValue] = useState('Public');
    const [checkbox, setCheckbox] = useState({
        comment: 'true',
        duet: 'true',
        stitch: 'true',
    });

    const resetValue = () => {
        videoRef.current.value = null;
        setDataVideo({
            name: '',
            path: '',
        });
        setCaption('');
        setSelectValue('Public');
    };



    useEffect(()=>{
        if(videoRef.current){
            resetValue()
        }
    },[confirm,confirmValue])


    const handleProgress = (e) => {
        setFileVideo(e.target.files[0]);
        setDataVideo((dataVideo) => ({
            ...dataVideo,
            name: uploadRef.current.files[0].name,
            path: URL.createObjectURL(uploadRef.current.files[0]),
        }));
        setCaption(uploadRef.current.files[0].name);
    };



    const handleChecked = (e, type) => {
        const checked = e.target.checked;

        setCheckbox((prev) => ({ ...prev, [type]: `${checked}` }));
    };



    const handlePost = () => {
        const formData = new FormData();
        formData.append('description', caption);
        formData.append('upload_file', fileVideo);
        formData.append('thumbnail_time', '1');
        formData.append('music', `Original sound - ${authData.currentUser.nickname}`);
        formData.append('viewable', selectValue.toLowerCase());

        // eslint-disable-next-line
        Object.entries(checkbox).map(([key, value]) => {
            if (value === 'true') {
                formData.append('allows[]', key);
            }
        });
        setIsLoading(true);

        postVideo(token, formData)
        .then((res) => {
            setIsLoading(false)
            resetValue();
            successModalShowing();
            console.log(res)
        })
        .catch((e) => {
            setIsLoading(false)
            console.log(e);
        });

    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2 className={cx('heading')}>Upload Video</h2>
                <span className={cx('title')}>Post a video to your account</span>
            </div>
            <div className={cx('content')}>
                <VideoPlayerPreview 
                    dataVideo={dataVideo}
                    videoRef={videoRef}
                    uploadRef={uploadRef}
                    caption ={caption}
                    confirmModalShowing = {confirmModalShowing}
                    handleProgress = {handleProgress}
                    resetValue = {resetValue}

                />
                {/* Form */}
                <div className={cx('form')}>
                    <div className={cx('caption')}>
                        <h4>Caption</h4>
                        <div className={cx('input-caption-wrap')}>
                            <input
                                type="text"
                                value={caption}
                                onChange={(e) => {
                                    setCaption(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('cover')}>
                        <h4>Cover</h4>
                        <div className={cx('cover-img')}></div>
                    </div>
                    <div className={cx('options-wrap')}>
                        <h4>Who can watch this video</h4>
                        <div
                            className={cx('options-value')}
                            onClick={() => {
                                setShowOptions(!showOptions);
                            }}
                        >
                            <span>{selectValue}</span>
                            <i className={cx(`${showOptions ? '' : 'rtt-180deg'}`)}>
                                <SelectIcon />
                            </i>
                            <div className={cx('select-list', `${showOptions ? 'h-100' : 'h-0'}`)}>
                                <div
                                    className={cx('select-item')}
                                    onClick={() => {
                                        setSelectValue('Public');
                                    }}
                                >
                                    <p>Public</p>
                                </div>
                                <div
                                    className={cx('select-item')}
                                    onClick={() => {
                                        setSelectValue('Friends');
                                    }}
                                >
                                    <p>Friends</p>
                                </div>
                                <div
                                    className={cx('select-item')}
                                    onClick={() => {
                                        setSelectValue('Private');
                                    }}
                                >
                                    <p>Private</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('cover')}>
                        <h4>Allow users to :</h4>
                        <div className={cx('checkbox-container')}>
                            <div className={cx('checkbox')}>
                                <input
                                    id="comment"
                                    type="checkbox"
                                    defaultChecked={checkbox.comment === 'true' ? true : false}
                                    onClick={(e) => {
                                        handleChecked(e, 'comment');
                                    }}
                                />
                                <label htmlFor="comment">Comment</label>
                            </div>
                            <div className={cx('checkbox')}>
                                <input
                                    id="duet"
                                    type="checkbox"
                                    defaultChecked={checkbox.duet === 'true' ? true : false}
                                    onClick={(e) => {
                                        handleChecked(e, 'duet');
                                    }}
                                />
                                <label htmlFor="duet">Duet</label>
                            </div>
                            <div className={cx('checkbox')}>
                                <input
                                    id="stitch"
                                    type="checkbox"
                                    defaultChecked={checkbox.stitch === 'true' ? true : false}
                                    onClick={(e) => {
                                        handleChecked(e, 'stitch');
                                    }}
                                />
                                <label htmlFor="stitch">Stitch</label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('btn-container')}>
                        <Button outline onclick={discardModalShowing}> Discard</Button>
                       {
                        isLoading ? 
                        (
                            <Button primary disabled >
                                <div className={cx("icon")}>
                                     <SpinnerIcon />
                                </div>
                            </Button> 
                        ):(
                            <Button primary onclick={handlePost}>
                                Post
                            </Button>        
                        )
                       }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpLoad;

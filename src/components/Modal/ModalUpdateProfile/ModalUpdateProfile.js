import classNames from 'classnames/bind';
import { useEffect, useRef, useState,useContext } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setUser } from '../../../store/slices/userSlice';

import { ModalLoadingContextKeys } from '../../../contexts/ModalLoadingContext';
import {updateProfileUser} from "../../../services/userServices"
import { CloseIcon, UpdateIcon } from '../../Icon';
import Button from '../../Button';
import styles from './ModalUpdateProfile.module.scss';
import Image from '../../Image';

const cx = classNames.bind(styles);

function ModalUpdateProfile({ modalHide }) {
    const inputRef = useRef(null);
    const {currentUser} = useSelector(state => state.user)
    const token = Cookies.get("tokenAuth")
    const dispatch = useDispatch();
    const {handleToastShowing} = useContext(ModalLoadingContextKeys)


    const [profile, setProfile] = useState({
        avatar_preview : "",
        avatar_file: "",
        first_name: '',
        last_name: '',
        link_fb: '',
        bio: '',
    });

    useEffect(() => {
        setProfile({
            avatar_preview : "",
            avatar_file: "",
            first_name: currentUser.first_name,
            last_name : currentUser.last_name,
            link_fb: currentUser.facebook_url,
            bio: currentUser.bio
        });
    },[])
    const [boolCheck,setBoolCheck] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleClick = () => {
        inputRef.current.click();
    };

    const onChangeValue = (e) => {
        const value = e.target.value;
        const name = e.target.getAttribute('name');

        if(name === "bio" && value.length > 80 ){
            setBoolCheck(true)
        }else{
            setBoolCheck(false)
        }

        if(name === "avatar" && inputRef.current ){
            setProfile(prev => ({
                ...prev,
                avatar_file: inputRef.current.files[0],
                avatar_preview : URL.createObjectURL(inputRef.current.files[0])
            }))
        }else{
            setProfile(prev => ({
                ...prev,
                [name] : value
            }))
        }
    }

    const handleUpdateProfile = () => {
        const formData = new FormData();

        formData.append("first_name",profile.first_name);
        formData.append("last_name",profile.last_name);
        if(profile.avatar_file){
            formData.append('avatar',profile.avatar_file);
        }
        formData.append("bio",profile.bio);
        formData.append("facebook_url",profile.link_fb);

        for (const key of formData.values()) {
            console.log(key);
          }
        updateProfileUser(token,formData)
            .then((res) => {
                setLoading(true)
                if(res){
                    handleToastShowing("Profile has been updated");
                }

                return new Promise((resolve,reject) => {
                    setTimeout( () => {
                        resolve(() => {
                            setLoading(false)
                            dispatch(setUser(res.data));
                            window.location.reload();
                        })
                    },1500)
                })
            })
            .then( (cb) => {
                cb();
            })
            .catch((e) => {
                handleToastShowing("Profile update failed",);
                setLoading(false)
                console.log(e)
            })
        
    }
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('header')}>
                        <h2> Discard this post?</h2>
                        <i className={cx('icon-close')} onClick={modalHide}>
                            <CloseIcon />
                        </i>
                    </div>
                    <div className={cx('body-container')}>
                        <div className={cx('profile-photo')}>
                            <div className={cx('title')}>
                                <span>Profile Photo</span>
                            </div>
                            <div className={cx('avatar')} onClick={handleClick}>
                                <Image src={profile.avatar_preview ||currentUser.avatar}></Image>
                                <div className={cx('edit-icon')}>
                                    <UpdateIcon />
                                    <input id="inputAvatar" type="file" name="avatar" ref={inputRef} onChange={(e) => {onChangeValue(e)}}></input>
                                </div>
                            </div>
                        </div>

                        <div className={cx('profile-nickname')}>
                            <div className={cx('title')}>
                                <span>Nickname</span>
                            </div>

                            <div className={cx('nickname')}>
                                <div className={cx('nickname-bgr')}>
                                    <span>{currentUser.nickname}</span>
                                    <i></i>
                                </div>
                                <span className={cx('sub-title')}>www.tiktok.com/@{currentUser.nickname}</span>
                                <span className={cx('sub-title')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </span>
                            </div>
                        </div>
                        <div className={cx('profile-username')}>
                            <div className={cx('title')}>
                                <span>First name</span>
                            </div>
                            <div className={cx('username-input')}>
                                <div className={cx('input-wrapper')}>
                                    <input
                                        type="text"
                                        value={profile.first_name}
                                        name='first_name'
                                        onChange={(e) => {
                                            onChangeValue(e)
                                        }}
                                        placeholder="First name"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('profile-username')}>
                            <div className={cx('title')}>
                                <span>Last name</span>
                            </div>
                            <div className={cx('username-input')}>
                                <div className={cx('input-wrapper')}>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        name='last_name'
                                        value={profile.last_name}
                                        onChange={(e) => {
                                            onChangeValue(e)
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('profile-link')}>
                            <div className={cx('title')}>
                                <span>Link your Facebook</span>
                            </div>
                            <div className={cx('link-input')}>
                                <div className={cx('input-wrapper')}>
                                    <input
                                        type="text"
                                        value={profile.link_fb}
                                        name='link_fb'
                                        onChange={(e) => {
                                            onChangeValue(e)
                                        }}
                                        placeholder="Link your FB"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('profile-bio')}>
                            <div className={cx('title')}>
                                <span>Bio</span>
                            </div>
                            <div className={cx('bio-input')}>
                                <div className={cx('textarea-wrapper',`${boolCheck ? "border-color-primary" : ""}`)}>
                                    <textarea
                                        placeholder="Bio"
                                        value={profile.bio}
                                        name='bio'
                                        onChange={(e) => {
                                            onChangeValue(e)
                                        }}
                                    ></textarea>
                                </div>
                                <div>
                                    <span  className={cx(`${boolCheck ? "text-color-primary" :""}`)}>{profile.bio.length}/</span>
                                    <span>{80}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-container')}>
                        <div className={cx('btn-wrapper')}>
                            <Button onclick={modalHide} outline>
                                Cancel
                            </Button>
                            <Button disabled={boolCheck || loading ? true : false} onclick={handleUpdateProfile} primary >Save</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalUpdateProfile;

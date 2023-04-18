import classNames from "classnames/bind";

import styles from "./UpLoad.module.scss";
import images from "../../asset/img";
import Button from "../../components/Button";
const cx = classNames.bind(styles)
function UpLoad() {
    return ( 
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h2 className={cx('heading')}>
                    Upload Video
                </h2>
                <sapn className = {cx("title")}>
                    Post a video to your account
                </sapn>
            </div>
            <div className={cx("content")}>
                <div className={cx("upload-container")}>
                    <div className={cx("upload-card")}>
                        <img className={cx("img-upload") } src={images.upLoad} alt=" " />
                        <h4 className={cx("upload-heading","mgt-6")}>
                             Select video to upload
                        </h4>
                        <span className={cx("desc","mgt-6")}>Or drag and drop a file</span>
                        <span className={cx("desc","mgt-16")}>MP4 or WebM</span>
                        <span className={cx("desc","mgt-6")}>720x1260 resolution or higher</span>
                        <span className={cx("desc","mgt-6")}>Up to 30 minutes</span>
                        <span className={cx("desc","mgt-6","mgbt-22")}>Less than 2 GB</span>

                        <Button primary>Select file</Button>
                    </div>
                </div>
                <div className={cx("form")}>
                    <div className={cx("caption")}>
                        <h4>Caption</h4>
                        <input type="text" />
                    </div>
                    <div className={cx("cover")}>
                        <h4>Cover</h4>
                        <div className={cx("cover-img")}></div>
                    </div>
                    <div className={cx("options-wrap")}>
                        <h4>Who can watch this video</h4>
                        <div className={cx("option")}>
                            
                        </div>
                    </div>
                    <div className={cx("cover")}>
                        <h4>Allow users to :</h4>
                        <input type="checkbox"  /> Comment
                        <input type="checkbox"  /> Duet
                        <input type="checkbox"  /> Stitch
                    </div>
                    <div className={cx("btn")}>
                        <Button outline> Discard</Button>
                        <Button outline> Post</Button>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default UpLoad;
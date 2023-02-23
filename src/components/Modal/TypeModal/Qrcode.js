import classNames from 'classnames/bind';
import styles from './TypeModal.module.scss';
import Image from '../../../components/Image';
import images from '../../../asset/img';
import { AddUserIcon,ScanIcon } from '../../Icon';
const cx = classNames.bind(styles);
function Qrcode() {
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Đăng nhập bằng mã QR</h1>
            <div className={cx('content-qrcode')}>
                <div className={cx('QR-code')}>
                    <Image src={images.qrcode}></Image>
                    <div className={cx('intrucstion')}>
                        <p>1. Mở ứng dụng TikTok trên thiết bị di động của bạn</p>
                        <p>2. Trên Hồ sơ, nhấn vào <i className={cx("icon")}><AddUserIcon/></i></p>
                        <p>3.Nhấn vào <i><ScanIcon /></i> rồi quét mã QR để xác nhận thông tin đăng nhập của bạn</p>
                    </div>
                </div>
                <div className={cx('image-tip')}>
                    <Image src={images.tip}></Image>
                </div>
            </div>
        </div>
    );
}

export default Qrcode;

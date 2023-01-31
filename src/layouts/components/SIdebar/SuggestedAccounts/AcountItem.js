import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import Tippy from '@tippyjs/react/headless';

import { Wrapper } from '../../../../components/Popper';
import { Ticker } from '../../../../components/Icon';
import classNames from 'classnames/bind';
import styles from './MenuAccounts.module.scss';
import { AccountPreview } from '../../../../components/AccountPreview';

const cx = classNames.bind(styles);
function AcountItem({ data }) {
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
                            <AccountPreview data={data} primary />
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

import classnames from 'classnames/bind';
import style from './Mail.module.scss';


const cx = classnames.bind(style);
function HeaderMail({ items = [],curent,setCurent }) {
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('heading')}>Thông báo</h2>
            <div className={'menu'}>
                {items.map((item, index) => {

                    return <button  
                                    onClick={()=>{setCurent(`${item.id}`)}}
                                    className={`${cx('menu-item')} ${curent === `${item.id}` ? cx('active') : ''}`} 
                                    key={index}>
                                    {item.title}
                            </button>;
                })}
            </div>
        </div>
    );
}

export default HeaderMail;

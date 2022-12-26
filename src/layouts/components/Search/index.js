import { useState, useRef, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import { SearchIcon } from '../../../components/Icon';

import request from '../../../utils/request';
import AccountItem from '../../../components/AccountItem';
import { Wrapper } from '../../../components/Popper';
import style from './Search.module.scss';
import { useDebounce } from '../../../hooks';
const cx = classnames.bind(style);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showReslut, setShowReslut] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debounce = useDebounce(searchValue, 800);


    useEffect(() => {
        if (!debounce) {
            return;
        }
        setLoading(true);
        request
            .get(`users/search`, {
                params: {
                    q: debounce,
                    type: `less`,
                },
            })
            .then((res) => {
                setSearchResult(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debounce]);

    return (
        <div>
            <HeadlessTippy
                interactive={true}
                onClickOutside={() => {
                    setShowReslut(false);
                }}
                visible={showReslut && searchResult.length > 0 && searchValue.trim().length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Wrapper>
                            <h4 className={cx('search-account')}>Tai Khoan</h4>
                            {searchResult.map((result) => {
                                return <AccountItem key={result.id} data={result} />;
                            })}
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        onFocus={() => {
                            setShowReslut(true);
                        }}
                        type="text"
                        placeholder="Tìm kiếm tài khoản và video"
                        onChange={(e) => {
                            if (!e.target.value.startsWith(' ')) {
                                setSearchValue(e.target.value);
                            } else if (e.target.value.length === 0) {
                                setSearchResult([]);
                            }
                        }}
                    />

                    {searchValue && !loading && (
                        <button
                            className={cx('input-icon')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResult([]);
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && (
                        <button className={cx('loading')}>
                            <FontAwesomeIcon icon={faSpinner} />
                        </button>
                    )}

                    <span className={cx('line')}></span>

                    <button className={cx('search-btn')} type="button">
                        <SearchIcon width="2.2rem" height="2.2rem" />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;

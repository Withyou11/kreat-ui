import { useState, useEffect, useRef } from 'react';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDebounce } from '~/hooks';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchText, 600);

    const inputRef = useRef();

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchText(e.target.value);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);

        axios
            .get(`http://localhost:3000/accounts/search`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
                params: {
                    q: debouncedValue,
                },
            })
            .then((res) => {
                setSearchResults(res.data.accounts);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debouncedValue]);
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive
                visible={showResults && searchResults.length > 0}
                render={(attr) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attr}>
                        <PopperWrapper>
                            <h3 className={cx('search-title')}>Account</h3>
                            {searchResults.map((result) => (
                                <AccountItem
                                    key={result.id_account}
                                    data={result}
                                    mutualFriends={result.mutualFriends}
                                />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchText}
                        placeholder="Search people on KreaT..."
                        spellCheck="false"
                        onChange={(e) => handleChange(e)}
                        onFocus={() => setShowResults(true)}
                    />
                    {/* Khi có searchText mới hiện nut x */}
                    {!!searchText && !loading && (
                        <button
                            className={cx('clear-btn')}
                            onClick={() => {
                                setSearchResults([]);
                                setSearchText('');
                                inputRef.current.focus();
                            }}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search;

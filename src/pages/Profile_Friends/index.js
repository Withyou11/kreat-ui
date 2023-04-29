import styles from './Profile_Friends.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileHeader from '~/components/ProfileHeader';
import FriendItem from '~/layouts/components/FriendItem';
import { useDebounce } from '~/hooks';
import axios from 'axios';
import listUsers from '~/StaticData/ListUser';

function Profile_Friends(props) {
    const cx = classNames.bind(styles);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchText, 600);

    const inputRef = useRef();

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
        // setLoading(true);
        console.log(debouncedValue);
        var resultFind = listUsers.filter((user) => user.fullname.toLowerCase().includes(debouncedValue));
        console.log(listUsers);

        console.log(resultFind);
        setSearchResults(resultFind);

        // axios
        //     .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
        //         params: {
        //             q: debouncedValue,
        //             type: 'more',
        //         },
        //     })
        //     .then((res) => {
        //         setSearchResults(res.data.data);
        //         setLoading(false);
        //     })
        //     .catch(() => {
        //         setLoading(false);
        //     });
    }, [debouncedValue]);
    return (
        <>
            <ProfileHeader />
            <div className={cx('friend-container')}>
                <div className={cx('search-friend-container')}>
                    <div className={cx('friend-amout')}>
                        <p className={cx('your-friends')}>Your friends</p>
                        <p className={cx('amount')}>{listUsers.length}</p>
                    </div>
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            value={searchText}
                            placeholder="Find your friends..."
                            spellCheck="false"
                            onChange={(e) => handleChange(e)}
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
                    </div>
                </div>
                <div className={cx('list-friend-container')}>
                    {searchResults.length > 0
                        ? searchResults.map((user) => (
                              <div key={user.id}>
                                  <FriendItem data={user} />
                              </div>
                          ))
                        : listUsers.map((user) => (
                              <div key={user.id}>
                                  <FriendItem data={user} />
                              </div>
                          ))}
                </div>
            </div>
        </>
    );
}

export default Profile_Friends;

import styles from './Profile_Friends.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileHeader from '~/components/ProfileHeader';
import FriendItem from '~/layouts/components/FriendItem';
import { useDebounce } from '~/hooks';
import axios from 'axios';
// import listUsers from '~/StaticData/ListUser';
import FriendRequestItem from '~/layouts/components/FriendRequestItem';

function Profile_Friends(props) {
    const cx = classNames.bind(styles);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const debouncedValue = useDebounce(searchText, 600);

    const inputRef = useRef();
    useEffect(() => {
        axios
            .get(`http://localhost:3000/accounts/64748bc1f6501b98ef1c9155/friends`)
            .then((res) => {
                setListUsers(res.data.listFriend[0]);
            })
            .catch(() => {});
    }, []);

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
        var resultFind = listUsers.filter((user) => user.fullname.toLowerCase().includes(debouncedValue));
        setSearchResults(resultFind);

        axios
            .get(`http://localhost:3000/accounts/search`, {
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

                <h2 style={{ textAlign: 'center', marginTop: '30px' }}>YOUR FRIENDS</h2>
                <div className={cx('list-friend-container')}>
                    {searchResults.length > 0
                        ? searchResults.map((user) => (
                              <div key={user._id}>
                                  <FriendItem data={user} />
                              </div>
                          ))
                        : listUsers.map((user) => (
                              <div key={user._id}>
                                  <FriendItem data={user} />
                              </div>
                          ))}
                </div>
                <h2 style={{ textAlign: 'center', marginTop: '30px' }}>FRIEND REQUESTS</h2>
                <div className={cx('list-friend-container')}>
                    {listUsers.map((user) => (
                        <div key={user._id}>
                            <FriendRequestItem data={user} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Profile_Friends;

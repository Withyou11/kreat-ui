import styles from './Profile_Friends.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileHeader from '~/components/ProfileHeader';
import FriendItem from '~/layouts/components/FriendItem';
import { useDebounce } from '~/hooks';
import axios from 'axios';
import FriendRequestItem from '~/layouts/components/FriendRequestItem';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function Profile_Friends(props) {
    const [dict, setDict] = useState({});
    useEffect(() => {
        switch (localStorage.getItem('language')) {
            case 'english':
                setDict(enDict);
                break;
            case 'vietnamese':
                setDict(viDict);
                break;
        }
    }, []);
    const cx = classNames.bind(styles);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(true);
    const [listUsers, setListUsers] = useState([]);
    const [listFriendsRequest, setListFriendsRequest] = useState([]);
    const debouncedValue = useDebounce(searchText, 600);
    let id = '';
    if (localStorage.getItem('anotherAccountId') !== '') {
        id = localStorage.getItem('anotherAccountId');
    } else {
        id = localStorage.getItem('accountId');
    }
    const inputRef = useRef();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`https://kreat-api.onrender.com/accounts/${id}/friends`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListUsers(response1.data.listFriend);
                setLoading1(false);

                if (localStorage.getItem('anotherAccountId') === '') {
                    const response2 = await axios.get(`https://kreat-api.onrender.com/accounts/friend_requests`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    });
                    setListFriendsRequest(response2.data.listRequest);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
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
        var resultFind = listUsers.filter((user) => user.fullName.toLowerCase().includes(debouncedValue));
        setSearchResults(resultFind);

        axios
            .get(`https://kreat-api.onrender.com/accounts/${id}/friends/search`, {
                params: {
                    q: debouncedValue,
                },
            })
            .then((res) => {
                setSearchResults(res.data.searchedFriends);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debouncedValue]);
    return (
        <>
            <ProfileHeader />
            {!loading1 ? (
                <div className={cx('friend-container')}>
                    <div className={cx('search-friend-container')}>
                        <div className={cx('friend-amout')}>
                            <p className={cx('your-friends')}>{dict.All_friends}</p>
                            <p className={cx('amount')}>{listUsers.length}</p>
                        </div>
                        <div className={cx('search')}>
                            <input
                                ref={inputRef}
                                value={searchText}
                                placeholder={dict.Find_your_friends}
                                spellCheck="false"
                                onChange={(e) => handleChange(e)}
                            />
                            {!!searchText && !loading && (
                                <button
                                    className={cx('clear-btn')}
                                    onClick={() => {
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

                    <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{dict.ALL_FRIENDS}</h2>
                    {searchResults.length > 0 || debouncedValue === '' ? (
                        <div className={cx('list-friend-container')}>
                            {searchResults.length > 0
                                ? searchResults.map((user) => (
                                      <div key={user.id_account}>
                                          <FriendItem data={user} />
                                      </div>
                                  ))
                                : listUsers.map((user) => (
                                      <div key={user.id_account}>
                                          <FriendItem data={user} />
                                      </div>
                                  ))}
                        </div>
                    ) : (
                        <div className={cx('list-friend-container')}>
                            <p style={{ fontWeight: 600, fontSize: '20px', margin: '50px auto' }}>{dict.Not_Found}</p>
                        </div>
                    )}
                    {localStorage.getItem('anotherAccountId') === '' && (
                        <div>
                            <h2 style={{ textAlign: 'center', marginTop: '30px' }}>{dict.FRIEND_REQUESTS}</h2>
                            {listFriendsRequest?.length > 0 && (
                                <div className={cx('list-friend-container')}>
                                    {listFriendsRequest?.map((user) => (
                                        <div key={user.id_account}>
                                            <FriendRequestItem data={user} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {listFriendsRequest?.length === 0 && (
                                <div className={cx('list-friend-container')}>
                                    <p className={cx('title')}>{dict.You_have_no_friend_requests}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
        </>
    );
}

export default Profile_Friends;

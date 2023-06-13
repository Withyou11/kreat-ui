import styles from './Profile_Friends.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileHeader from '~/components/ProfileHeader';
import FriendItem from '~/layouts/components/FriendItem';
import { useDebounce } from '~/hooks';
import axios from 'axios';
import { AccountContext } from '~/Context/AccountContext/AccountContext';
import FriendRequestItem from '~/layouts/components/FriendRequestItem';

function Profile_Friends(props) {
    const cx = classNames.bind(styles);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listUsers, setListUsers] = useState([]);
    const [listFriendsRequest, setListFriendsRequest] = useState([]);
    const debouncedValue = useDebounce(searchText, 600);
    const accountContext = useContext(AccountContext);
    // const accountId = accountContext.accountId;
    // const setAccountId = accountContext.setAccountId;
    const [data, setData] = useState({});
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
                const response1 = await axios.get(`http://localhost:3000/accounts/${id}/friends`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListUsers(response1.data.listFriend);
                setData(response1.data);

                if (localStorage.getItem('anotherAccountId') === '') {
                    const response2 = await axios.get(`http://localhost:3000/accounts/friend_requests`, {
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
            .get(`http://localhost:3000/accounts/${id}/friends/search`, {
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
            <ProfileHeader data={data} />
            <div className={cx('friend-container')}>
                <div className={cx('search-friend-container')}>
                    <div className={cx('friend-amout')}>
                        <p className={cx('your-friends')}>All friends</p>
                        <p className={cx('amount')}>{listUsers.length}</p>
                    </div>
                    <div className={cx('search')}>
                        <input
                            ref={inputRef}
                            value={searchText}
                            placeholder="Find friends..."
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

                <h2 style={{ textAlign: 'center', marginTop: '30px' }}>ALL FRIENDS</h2>
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
                        <p style={{ fontWeight: 600, fontSize: '28px', margin: '50px auto' }}>Not Found</p>
                    </div>
                )}
                {localStorage.getItem('anotherAccountId') === '' && (
                    <div>
                        <h2 style={{ textAlign: 'center', marginTop: '30px' }}>FRIEND REQUESTS</h2>
                        <div className={cx('list-friend-container')}>
                            {listFriendsRequest?.map((user) => (
                                <div key={user.id_account}>
                                    <FriendRequestItem data={user} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Profile_Friends;

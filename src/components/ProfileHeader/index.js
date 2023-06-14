// ProfileHeader.jsx
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import styles from './ProfileHeader.module.scss';
import profilebackground from '~/assets/images/profilebackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const cx = classNames.bind(styles);

function ProfileHeader(data) {
    const [activeTab, setActiveTab] = useState('timeline');
    const location = useLocation();
    const [friendStatus, setFriendStatus] = useState(data.data.friendStatus);
    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    useEffect(() => {
        switch (location.pathname) {
            case '/about':
                setActiveTab('about');
                break;
            case '/friends':
                setActiveTab('friends');
                break;
            case '/medias':
                setActiveTab('medias');
                break;
            case '/timelines':
            default:
                setActiveTab('timeline');
                break;
        }
    }, [location.pathname]);
    function handleAddFriend(e) {
        const receiver = {
            id_receiver: localStorage.getItem('anotherAccountId'),
        };
        axios
            .post(`http://localhost:3000/accounts/send_friend_request`, receiver, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setFriendStatus('friend request sent');
            })
            .catch(() => {});
    }

    function handleCancelRequest(e) {
        axios
            .delete(
                `http://localhost:3000/accounts/${localStorage.getItem('anotherAccountId')}/cancel_friend_request`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            )
            .then((res) => {
                setFriendStatus('not friend');
            })
            .catch(() => {});
    }

    function handleDeclineRequest(e) {
        axios
            .delete(`http://localhost:3000/accounts/${data.data.id_friendRequest}/decline_friend_request`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setFriendStatus('not friend');
            })
            .catch(() => {});
    }

    function handleAcceptRequest(e) {
        axios
            .delete(`http://localhost:3000/accounts/${data.data.id_friendRequest}/accept_friend_request`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch(() => {});
    }

    function handleUnfriend(e) {
        e.stopPropagation();
        e.preventDefault();
        if (
            window.location.confirm(`Are you sure you want to unfriend ${localStorage.getItem('anotherAccountName')}?`)
        ) {
            axios
                .delete(`http://localhost:3000/accounts/${localStorage.getItem('anotherAccountId')}/unfriend`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    window.location.reload();
                })
                .catch(() => {});
        } else {
            // user clicked Cancel
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <img className={cx('profile-background')} src={profilebackground} alt="profilebackground"></img>
                <div className={cx('tabs-info')}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/timelines"
                        className={cx('tab', { active: activeTab === 'timeline' })}
                        onClick={() => handleTabClick('timeline')}
                    >
                        Timeline
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/about"
                        className={cx('tab', { active: activeTab === 'about' })}
                        onClick={() => handleTabClick('about')}
                    >
                        About
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/friends"
                        className={cx('tab', { active: activeTab === 'friends' })}
                        onClick={() => handleTabClick('friends')}
                    >
                        Friends
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/medias"
                        className={cx('tab', { active: activeTab === 'medias' })}
                        onClick={() => handleTabClick('medias')}
                    >
                        Photos & Videos
                    </Link>
                </div>
                <div className={cx('info')}>
                    {/* 1 */}
                    {friendStatus === 'not friend' && localStorage.getItem('anotherAccountId') && (
                        <div className={cx('buttonContainer')}>
                            <button onClick={handleAddFriend} className={cx('addButton')}>
                                Add Friend
                            </button>
                        </div>
                    )}
                    {/* 2 */}
                    {friendStatus === 'friend request sent' && localStorage.getItem('anotherAccountId') && (
                        <div className={cx('buttonContainer')}>
                            <button onClick={handleCancelRequest} className={cx('addButton1')}>
                                Cancel Request
                            </button>
                        </div>
                    )}
                    {/* 3 */}
                    {friendStatus === 'friend request received' && localStorage.getItem('anotherAccountId') && (
                        <div className={cx('buttonContainer')}>
                            <button onClick={handleDeclineRequest} className={cx('addButton1')}>
                                Decline Request
                            </button>
                            <button onClick={handleAcceptRequest} className={cx('addButton')}>
                                Accept Friend
                            </button>
                        </div>
                    )}
                    {/* 4 */}
                    {friendStatus === 'friend' && localStorage.getItem('anotherAccountId') && (
                        <div className={cx('buttonContainer')}>
                            <p className={cx('friend')}>Friend</p>
                            <button onClick={handleUnfriend} className={cx('addButton1')}>
                                Unfriend
                            </button>
                        </div>
                    )}
                    <Image
                        className={cx('avatar')}
                        cloudName="dzuzcewvj"
                        publicId={
                            localStorage.getItem('anotherAccountId') === ''
                                ? localStorage.getItem('avatar')
                                : localStorage.getItem('anotherAccountAvatar')
                        }
                        alt="avatar"
                    />
                    <p className={cx('fullname')}>
                        {localStorage.getItem('anotherAccountId') === ''
                            ? localStorage.getItem('fullname')
                            : localStorage.getItem('anotherAccountName')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;

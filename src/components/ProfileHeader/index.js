// ProfileHeader.jsx
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import styles from './ProfileHeader.module.scss';
import profilebackground from '~/assets/images/profilebackground.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPen } from '@fortawesome/free-solid-svg-icons';
import UpdateNameModal from '../UpdateNameModal';
import axios from 'axios';
import { io } from 'socket.io-client';

function ProfileHeader() {
    const cx = classNames.bind(styles);
    const [activeTab, setActiveTab] = useState('timeline');
    const location = useLocation();
    const [friendStatus, setFriendStatus] = useState(localStorage.getItem('friendStatus'));
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
                io('ws://localhost:3002').emit('sendNotification', res.data.id_notification_receivers);
                setFriendStatus('friend request sent');
                localStorage.setItem('friendStatus', 'friend request sent');
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
                localStorage.setItem('friendStatus', 'not friend');
            })
            .catch(() => {});
    }

    function handleDeclineRequest(e) {
        axios
            .delete(
                `http://localhost:3000/accounts/${localStorage.getItem('idFriendRequest')}/decline_friend_request`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            )
            .then((res) => {
                setFriendStatus('not friend');
                localStorage.setItem('friendStatus', 'not friend');
            })
            .catch(() => {});
    }

    function handleAcceptRequest(e) {
        axios
            .delete(`http://localhost:3000/accounts/${localStorage.getItem('idFriendRequest')}/accept_friend_request`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                io('ws://localhost:3002').emit('sendNotification', res.data.id_notification_receivers);
                localStorage.setItem('friendStatus', 'friend');
                window.location.reload();
            })
            .catch(() => {});
    }

    function handleUnfriend(e) {
        e.stopPropagation();
        e.preventDefault();
        if (window.confirm(`Are you sure you want to unfriend ${localStorage.getItem('anotherAccountName')}?`)) {
            axios
                .delete(`http://localhost:3000/accounts/${localStorage.getItem('anotherAccountId')}/unfriend`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    localStorage.setItem('friendStatus', 'not friend');
                    window.location.reload();
                })
                .catch(() => {});
        } else {
            // user clicked Cancel
        }
    }

    const [isUpdateInfoModalOpen, setIsUpdateInfoModalOpen] = useState(false);

    const handleOpenUpdateInfoModal = () => {
        setIsUpdateInfoModalOpen(true);
    };

    const handleCloseUpdateInfoModal = () => {
        setIsUpdateInfoModalOpen(false);
    };
    const handleUpdateInfo = (updateInfo) => {
        localStorage.setItem('fullname', updateInfo.fullName);
        if (updateInfo.avatar.includes('base64')) {
            axios
                .patch(
                    `http://localhost:3000/accounts/update_personal_info`,
                    {
                        fullName: updateInfo.fullName,
                        avatarData: updateInfo.avatar,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {
                    localStorage.setItem('avatar', res.data.url);
                    setTimeout(() => {
                        window.location.reload();
                    }, 10);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios
                .patch(
                    `http://localhost:3000/accounts/update_personal_info`,
                    {
                        fullName: updateInfo.fullName,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {
                    setTimeout(() => {
                        window.location.reload();
                    }, 10);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
                    {localStorage.getItem('anotherAccountId') === '' && (
                        <button onClick={handleOpenUpdateInfoModal} className={cx('updateAvatar')}>
                            <FontAwesomeIcon className={cx('updateAvatarIcon')} icon={faCamera}></FontAwesomeIcon>
                        </button>
                    )}
                    <div className={cx('fullNameContainer')}>
                        <p className={cx('fullname')}>
                            {localStorage.getItem('anotherAccountId') === ''
                                ? localStorage.getItem('fullname')
                                : localStorage.getItem('anotherAccountName')}
                        </p>
                        {localStorage.getItem('anotherAccountId') === '' && (
                            <FontAwesomeIcon
                                onClick={handleOpenUpdateInfoModal}
                                className={cx('updateNameIcon')}
                                icon={faPen}
                            ></FontAwesomeIcon>
                        )}
                    </div>
                </div>
            </div>
            {isUpdateInfoModalOpen && (
                <UpdateNameModal onClose={handleCloseUpdateInfoModal} onSave={handleUpdateInfo} />
            )}
        </div>
    );
}

export default ProfileHeader;

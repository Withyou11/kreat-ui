import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import { useEffect, useRef, useContext, useState, cloneElement } from 'react';
import { io } from 'socket.io-client';
import { OnlineFriendContext } from '~/Context/OnlineFriendContext/OnlineFriendContext';
import axios from 'axios';
function DefaultLayout({ children }) {
    const cx = classNames.bind(styles);
    const [selectedConversationId, setSelectedConversatioId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [flag, setFlag] = useState(0);
    const [status, setStatus] = useState(null);
    const [unviewAmount, setUnviewAmount] = useState();

    const handleUserSelect = (conversationId, userName, userAvatar, userId, status) => {
        setStatus(status);
        setSelectedConversatioId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
        setSelectedUserId(userId);
    };
    const clearUser = () => {
        handleUserSelect(null, null, null, null);
    };
    const onlineFriend = useContext(OnlineFriendContext);
    const setOnlineFriendList = onlineFriend.setOnlineFriendList;
    let socket = useRef();
    socket.current = io('ws://localhost:3002');
    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('accountId')) {
            socket.current.emit('addUser', localStorage.getItem('accountId'));
            socket.current.on('getUser', (onlineFriends) => {
                setOnlineFriendList(onlineFriends);
            });
            socket.current.on('getMessage', (newMessage) => {
                setFlag((prevCount) => prevCount + 1);
                setNewMessage(newMessage);
                handleUserSelect(
                    newMessage.id_conversation,
                    newMessage.fullName,
                    newMessage.avatar,
                    newMessage.id_sender,
                    true,
                );
            });
            socket.current.on('getNotification', () => {
                axios
                    .get(`http://localhost:3000/accounts/unviewed_notification_and_message`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    })
                    .then((res) => {
                        setUnviewAmount(res.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    }, []);

    useEffect(() => {
        if (newMessage) {
            setSelectedUserId(newMessage.id_sender);
        }
    }, [newMessage]);
    return (
        <>
            <div className={cx('wrapper')}>
                <Header
                    setUnviewAmount={setUnviewAmount}
                    unviewAmount={unviewAmount}
                    handleUserSelect={handleUserSelect}
                />
                <div className={cx('container')}>
                    <LeftSidebar />
                    <div className={cx('content')}>
                        {cloneElement(children, {
                            selectedUserId: selectedUserId,
                            selectedConversationId: selectedConversationId,
                            selectedUserName: selectedUserName,
                            selectedUserAvatar: selectedUserAvatar,
                            clearUser: clearUser,
                            flag: flag,
                            status: status,
                        })}
                    </div>
                    <RightSidebar />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;

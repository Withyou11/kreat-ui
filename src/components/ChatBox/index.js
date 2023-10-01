import classNames from 'classnames/bind';
// import { io } from 'socket.io-client';
import styles from './ChatBox.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useState, useContext } from 'react';
import { OnlineFriendContext } from '~/Context/OnlineFriendContext/OnlineFriendContext';
import ChatContent from '../ChatContent';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
function ChatBox({ updateState, conversationId, userName, userAvatar, userId, flag, status }) {
    const onlineFriend = useContext(OnlineFriendContext);
    const navigate = useNavigate();
    const onlineFriendList = onlineFriend.onlineFriendList;
    const [messages, setMessages] = useState([]);
    const cx = classNames.bind(styles);
    function handleClose(e) {
        updateState(null);
    }

    const handleGoTimelines = () => {
        localStorage.setItem('anotherAccountId', userId);
        localStorage.setItem('anotherAccountName', userName);
        localStorage.setItem('anotherAccountAvatar', userAvatar);
        navigate(`/timelines/${userId}`);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chat/${conversationId}/messages`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setMessages(response.data.messages);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [conversationId, flag]);

    const [inputValue, setInputValue] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue !== '') {
            const newMessage = {
                id_conversation: conversationId,
                messageContent: inputValue,
            };
            axios
                .post(`http://localhost:3000/chat/send_message`, newMessage, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((response) => {
                    const onlineAccountIds = onlineFriendList.map((onlineFriend) => onlineFriend.id_account);
                    const isSocket = onlineAccountIds.includes(userId);
                    if (isSocket) {
                        const data = {
                            id_conversation: conversationId,
                            id_sender: localStorage.getItem('accountId'),
                            id_receiver: userId,
                            messageContent: inputValue,
                        };
                        io('ws://localhost:3002').emit('sendMessage', data);
                    }

                    setMessages([...messages, response.data.newMessage]);
                    setInputValue('');
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    return (
        <div id="chatbox">
            <PopperWrapper className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Image
                        onClick={handleGoTimelines}
                        className={cx('avatar')}
                        cloudName="dzuzcewvj"
                        publicId={userAvatar}
                        crop="scale"
                    />
                    <h4 onClick={handleGoTimelines} className={cx('username')}>
                        {userName}
                    </h4>
                    <Button leftIcon={<FontAwesomeIcon icon={faTimes} />} smallest onClick={handleClose}></Button>
                </div>
                <hr />
                <ChatContent messages={messages} />
                <hr />
                {status ? (
                    <form className={cx('form')} onSubmit={handleSubmit}>
                        <input
                            className={cx('input')}
                            type="text"
                            value={inputValue}
                            placeholder="Enter message..."
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button className={cx('submit')} type="submit">
                            <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                        </button>
                    </form>
                ) : (
                    <p className={cx('not-friend')}>This person is not your friend now</p>
                )}
            </PopperWrapper>
        </div>
    );
}

export default ChatBox;

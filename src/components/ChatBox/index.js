import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useRef, useState } from 'react';
import ChatContent from '../ChatContent';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import Button from '../Button';
function ChatBox({ updateState, conversationId, userName, userAvatar }) {
    const socket = useRef('ws://localhost:3002');

    useEffect(() => {
        socket.current.emit('addUser', localStorage.getItem('accountId'));
    }, [localStorage.getItem('accountId')]);
    const [messages, setMessages] = useState([]);

    const cx = classNames.bind(styles);
    function handleClose(e) {
        updateState(null);
    }

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
    }, [conversationId]);

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
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={userAvatar} crop="scale" />
                    <h4 className={cx('username')}>{userName}</h4>
                    <Button leftIcon={<FontAwesomeIcon icon={faTimes} />} smallest onClick={handleClose}></Button>
                </div>
                <hr />
                <ChatContent messages={messages} />
                <hr />
                <form onSubmit={handleSubmit}>
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
            </PopperWrapper>
        </div>
    );
}

export default ChatBox;

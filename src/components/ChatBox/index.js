import classNames from 'classnames/bind';
import styles from './ChatBox.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useEffect, useState } from 'react';
import ChatContent from '../ChatContent';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';
function ChatBox({ updateState, userId, userName, userAvatar }) {
    const cx = classNames.bind(styles);
    function handleClose(e) {
        updateState(null);
    }
    useEffect(() => {}, [userId]);

    const [messages, setMessages] = useState([
        {
            sender: 'John',
            receiver: 'Jane',
            message: 'Hey there!',
            time: '2023-03-20T09:15:00.000Z',
        },
        {
            sender: 'Jane',
            receiver: 'John',
            message: 'Hi John, how are you?',
            time: '2023-03-20T09:16:00.000Z',
        },
        {
            sender: 'John',
            receiver: 'Jane',
            message: "I'm good, thanks for asking. How about you?",
            time: '2023-03-20T09:17:00.000Z',
        },
        {
            sender: 'Jane',
            receiver: 'John',
            message: "I'm doing well too, thanks. What have you been up to?",
            time: '2023-03-20T09:18:00.000Z',
        },
        {
            sender: 'John',
            receiver: 'Jane',
            message: 'Not much, just working on some coding projects. How about you?',
            time: '2023-03-20T09:19:00.000Z',
        },
        {
            sender: 'Jane',
            receiver: 'John',
            message: 'Same here, just trying to finish up some work before the weekend.',
            time: '2023-03-20T09:20:00.000Z',
        },
    ]);

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            sender: 'John',
            receiver: 'Jane',
            message: inputValue,
            time: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
        setInputValue('');
    };

    return (
        <div id="chatbox">
            <PopperWrapper className={cx('wrapper')}>
                <div className={cx('header')}>
                    <img className={cx('avatar')} src={userAvatar} alt="Avatar" />
                    <h4 className={cx('username')}>{userName}</h4>
                    <Button leftIcon={<FontAwesomeIcon icon={faTimes} />} smallest onClick={handleClose}></Button>
                </div>
                <hr />
                <ChatContent messages={messages} userId={userId} />
                <hr />
                <form onSubmit={handleSubmit}>
                    <input
                        className={cx('input')}
                        type="text"
                        value={inputValue}
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

import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import NewTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRef, useEffect } from 'react';

function ChatContent({ messages }) {
    const cx = classNames.bind(styles);
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <div className={cx('wrapper')}>
            <ul>
                {messages.map((msg) => (
                    <li ref={scrollRef} key={msg._id}>
                        <NewTippy content={new Date(msg.createdAt).toLocaleString()}>
                            <div
                                className={cx(
                                    `message ${
                                        msg.id_sender === localStorage.getItem('accountId') ? 'sender' : 'reciever'
                                    }`,
                                )}
                            >
                                <p className={cx('content-message')}>{msg.messageContent}</p>
                            </div>
                        </NewTippy>
                        <div style={{ clear: 'both' }}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatContent;

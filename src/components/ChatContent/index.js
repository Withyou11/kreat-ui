import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import NewTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function ChatContent({ messages, userId }) {
    const currentUserId = 'John';
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.time}>
                        <NewTippy content={new Date(msg.time).toLocaleString()}>
                            <div className={cx(`message ${msg.sender === currentUserId ? 'sender' : 'reciever'}`)}>
                                <p className={cx('content-message')}>{msg.message}</p>
                                {/* <p className="time-message">{new Date(msg.time).toLocaleString()}</p> */}
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

import classNames from 'classnames/bind';
import styles from './ChatContent.module.scss';
import NewTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useRef, useLayoutEffect } from 'react';
import { Image } from 'cloudinary-react';

function ChatContent({ messages, userId }) {
    const cx = classNames.bind(styles);
    const chatContainerRef = useRef();

    useLayoutEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [messages]);

    return (
        <div className={cx('wrapper')} ref={chatContainerRef}>
            {userId !== 'null' ? (
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
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
            ) : (
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {msg.type !== 'notification' && msg.id_sender !== localStorage.getItem('accountId') && (
                                <Image
                                    // onClick={handleGoTimelines}
                                    className={cx('avatar')}
                                    cloudName="dzuzcewvj"
                                    publicId={msg.avatar}
                                    crop="scale"
                                />
                            )}
                            {msg.type !== 'notification' ? (
                                <NewTippy content={new Date(msg.createdAt).toLocaleString()}>
                                    <div
                                        className={cx(
                                            `message ${
                                                msg.id_sender === localStorage.getItem('accountId')
                                                    ? 'sender'
                                                    : 'reciever'
                                            }`,
                                        )}
                                    >
                                        {msg.id_sender !== localStorage.getItem('accountId') && (
                                            <p className={cx('content-name')}>{msg.fullName}</p>
                                        )}
                                        <p className={cx('content-message')}>{msg.messageContent}</p>
                                    </div>
                                </NewTippy>
                            ) : (
                                <p className={cx('notification')}>{msg.messageContent}</p>
                            )}

                            <div style={{ clear: 'both' }}></div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ChatContent;

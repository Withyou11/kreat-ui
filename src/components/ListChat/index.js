import styles from './ListChat.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatItem from '../ChatItem';
function ListChat({ setShowListChats, handleUserSelect }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/chat/conversations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data.listConversation);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Chats</p>
            {!loading ? (
                <div className={cx('container')}>
                    {data.length === 0 && <p className={cx('title1')}>No conversations to show</p>}
                    {data?.map((notification, index) => (
                        <div key={index}>
                            <ChatItem
                                data={notification}
                                setShowListChats={setShowListChats}
                                handleUserSelect={handleUserSelect}
                            ></ChatItem>
                            <hr style={{ margin: '0' }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('dot-spinner')}>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                </div>
            )}
        </div>
    );
}

export default ListChat;

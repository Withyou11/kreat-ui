import { useState } from 'react';
import { Image } from 'cloudinary-react';
import styles from './ChatItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
function ChatItem({ data, setShowListChats, handleUserSelect }) {
    console.log(data);
    const cx = classNames.bind(styles);
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const diff = (now.getTime() - date.getTime()) / 1000; // Đổi thành giây

        if (diff < 60) {
            // Dưới 1 phút
            return `${Math.floor(diff)} seconds ago`;
        } else if (diff < 60 * 60) {
            // Dưới 1 giờ
            if (diff < 120) return `1 minute ago`;
            else {
                return `${Math.floor(diff / 60)} minutes ago`;
            }
        } else if (diff < 24 * 60 * 60) {
            if (diff < 60 * 60 * 2) return `1 hour ago`;
            // Dưới 1 ngày
            return `${Math.floor(diff / (60 * 60))} hours ago`;
        } else if (diff < 2 * 24 * 60 * 60) {
            // Từ 1 ngày tới 2 ngày
            return `Yesterday at ${formatTime(date)}`;
        } else {
            // Hơn 2 ngày
            return formatDateToString(date);
        }
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        // const time = formatTime(date);

        return `${year}-${month}-${day} `;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    const handleClick = () => {
        setShowListChats(false);
        handleUserSelect(data.id_conversation, data.fullName, data.avatar, data.id_account, data.status);
    };
    return (
        <div onClick={handleClick} className={cx('container')}>
            {!data.isViewed ? (
                <div className={cx('wrapper')}>
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    <div className={cx('info')}>
                        <p className={cx('name')}>{data?.fullName}</p>
                        <p className={cx('content')}>
                            {data?.isYou ? 'You: ' + data?.latestMessage : data?.latestMessage}
                        </p>
                        <p className={cx('time1')}>{formatDate(data?.latestMessageTime)}</p>
                    </div>
                    <FontAwesomeIcon className={cx('icon')} icon={faCircle}></FontAwesomeIcon>
                </div>
            ) : (
                <div style={{ opacity: 0.7 }} className={cx('wrapper')}>
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    <div className={cx('info')}>
                        <p className={cx('name')}>{data?.fullName}</p>
                        <p className={cx('content')}>
                            {data?.isYou ? 'You: ' + data?.latestMessage : data?.latestMessage}
                        </p>
                        <p className={cx('time')}>{formatDate(data?.latestMessageTime)}</p>
                    </div>
                    <FontAwesomeIcon
                        style={{ display: 'none' }}
                        className={cx('icon')}
                        icon={faCircle}
                    ></FontAwesomeIcon>
                </div>
            )}
        </div>
    );
}

export default ChatItem;

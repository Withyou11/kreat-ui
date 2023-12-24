import { Image } from 'cloudinary-react';
import styles from './NotificationItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHand, faComment, faUpload, faTag, faShare, faBan } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import hahaImg from '~/assets/images/haha.png';
import wowImg from '~/assets/images/wow.png';
import sadImg from '~/assets/images/sad.png';
import angryImg from '~/assets/images/angry.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function NotificationItem({ data, setShowListNotification }) {
    const [dict, setDict] = useState({});
    useEffect(() => {
        switch (localStorage.getItem('language')) {
            case 'english':
                setDict(enDict);
                break;
            case 'vietnamese':
                setDict(viDict);
                break;
        }
    }, []);

    const listIcon = [
        {
            type: 'friend request',
            icon: faHand,
            backgroundColor: 'blue',
        },
        {
            type: 'like',
            icon: faThumbsUp,
            backgroundColor: 'primary',
        },
        {
            type: 'love',
            icon: faHeart,
            backgroundColor: 'love',
        },
        {
            type: 'haha',
            icon: hahaImg,
            backgroundColor: 'yellow',
        },
        {
            type: 'wow',
            icon: wowImg,
            backgroundColor: 'yellow',
        },
        {
            type: 'sad',
            icon: sadImg,
            backgroundColor: 'yellow',
        },
        {
            type: 'angry',
            icon: angryImg,
            backgroundColor: 'yellow',
        },
        {
            type: 'comment',
            icon: faComment,
            backgroundColor: 'green',
        },
        {
            type: 'upload',
            icon: faUpload,
            backgroundColor: 'pink',
        },
        {
            type: 'tag',
            icon: faTag,
            backgroundColor: 'red',
        },
        {
            type: 'share',
            icon: faShare,
            backgroundColor: 'purple',
        },
        {
            type: 'block',
            icon: faBan,
            backgroundColor: 'red',
        },
        {
            type: 'unblock',
            icon: faShare,
            backgroundColor: 'red',
        },
    ];

    const [icon, setIcon] = useState(listIcon.find((item) => item.type === data.notificationType));

    function getNotificationContent() {
        return localStorage.getItem('language') === 'english'
            ? data?.notificationEnglishContent
            : data?.notificationVietnameseContent;
    }
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const diff = (now.getTime() - date.getTime()) / 1000; // Đổi thành giây

        if (diff < 60) {
            // Dưới 1 phút
            return `${Math.floor(diff)} ${dict.secsAgo}`;
        } else if (diff < 60 * 60) {
            // Dưới 1 giờ
            if (diff < 120) return `1 ${dict.minAgo}`;
            else {
                return `${Math.floor(diff / 60)} ${dict.minsAgo}`;
            }
        } else if (diff < 24 * 60 * 60) {
            if (diff < 60 * 60 * 2) return `1 ${dict.hourAgo}`;
            // Dưới 1 ngày
            return `${Math.floor(diff / (60 * 60))} ${dict.hoursAgo}`;
        } else if (diff < 2 * 24 * 60 * 60) {
            // Từ 1 ngày tới 2 ngày
            return `${dict.yesterday} ${formatTime(date)}`;
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
        setShowListNotification(false);
        if (data.id_post) {
            navigate(`/post/${data.id_post}`);
        } else {
            localStorage.setItem('anotherAccountId', data.id_senders[0]);
            localStorage.setItem('anotherAccountAvatar', data.avatar);
            navigate(`/timelines/${data.id_senders[0]}`);
        }
    };
    return (
        <div onClick={handleClick} className={cx('container')}>
            {!data.isViewed ? (
                <div className={cx('wrapper')}>
                    <div className={cx('imageContainer')}>
                        <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('content1')}>{getNotificationContent()}</p>
                        <p className={cx('time1')}>{formatDate(data?.notificationTime)}</p>
                    </div>
                    <div className={cx('iconContainer')}>
                        {icon?.type === 'haha' ||
                        icon?.type === 'sad' ||
                        icon?.type === 'angry' ||
                        icon?.type === 'wow' ? (
                            <img src={icon.icon} className={cx('imageIcon')} alt="Icon" />
                        ) : (
                            <FontAwesomeIcon
                                className={cx(`${icon?.backgroundColor}`)}
                                icon={icon?.icon}
                            ></FontAwesomeIcon>
                        )}
                    </div>
                </div>
            ) : (
                <div style={{ opacity: 0.6 }} className={cx('wrapper')}>
                    <div className={cx('imageContainer')}>
                        <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    </div>
                    <div className={cx('info')}>
                        <p className={cx('content')}>{getNotificationContent()}</p>
                        <p className={cx('time')}>{formatDate(data?.notificationTime)}</p>
                    </div>
                    <div className={cx('iconContainer')}>
                        {icon?.type === 'haha' ||
                        icon?.type === 'sad' ||
                        icon?.type === 'angry' ||
                        icon?.type === 'wow' ? (
                            <img src={icon.icon} className={cx('imageIcon')} alt="Icon" />
                        ) : (
                            <FontAwesomeIcon
                                className={cx(`${icon?.backgroundColor}`)}
                                icon={icon?.icon}
                            ></FontAwesomeIcon>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationItem;

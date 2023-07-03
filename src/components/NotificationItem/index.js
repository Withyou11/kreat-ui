import { Image } from 'cloudinary-react';
import styles from './NotificationItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function NotificationItem({ data }) {
    console.log(data);
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const handleClick = () => {
        if (data.id_post) {
            navigate(`/post/${data.id_post}`);
        } else {
            navigate(`/timelines/${data.id_senders[0]}`);
        }
    };
    return (
        <div onClick={handleClick} className={cx('container')}>
            {data.isViewed ? (
                <div className={cx('wrapper')}>
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    <div className={cx('info')}>
                        <p className={cx('content')}>Sungha Jung and 1 other person reacted to your post.</p>
                        <p className={cx('time1')}>2 hours ago</p>
                    </div>
                    <FontAwesomeIcon className={cx('icon')} icon={faCircle}></FontAwesomeIcon>
                </div>
            ) : (
                <div style={{ opacity: 0.7 }} className={cx('wrapper')}>
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    <div className={cx('info')}>
                        <p className={cx('content')}>Sungha Jung and 1 other person reacted to your post.</p>
                        <p className={cx('time')}>2 hours ago</p>
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

export default NotificationItem;

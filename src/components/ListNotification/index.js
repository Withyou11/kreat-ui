import styles from './ListNotification.module.scss';
import classNames from 'classnames/bind';
import NotificationItem from '../NotificationItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
function ListNotification() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/accounts/notification`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data.listNotification);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Notifications</p>
            {!loading ? (
                <div className={cx('container')}>
                    {data.length === 0 && <p className={cx('title1')}>You don't have any notifications yet</p>}
                    {data?.map((notification, index) => (
                        <div key={index}>
                            <NotificationItem data={notification}></NotificationItem>
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

export default ListNotification;

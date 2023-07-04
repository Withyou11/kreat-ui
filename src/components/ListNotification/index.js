import styles from './ListNotification.module.scss';
import classNames from 'classnames/bind';
import NotificationItem from '../NotificationItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
function ListNotification() {
    const [data, setData] = useState([]);
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
            })
            .catch(() => {});
    }, []);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>Notifications</p>
            <div className={cx('container')}>
                {data?.map((notification, index) => (
                    <div key={index}>
                        <NotificationItem data={notification}></NotificationItem>
                        <hr style={{ margin: '0' }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListNotification;

import styles from './ListNotification.module.scss';
import classNames from 'classnames/bind';
import NotificationItem from '../NotificationItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function ListNotification({ setShowListNotification }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/accounts/notification`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data.listNotification);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{dict.Notifications}</p>
            {!loading ? (
                <div className={cx('container')}>
                    {data.length === 0 && <p className={cx('title1')}>{dict.No_Notifications}</p>}
                    {data?.map((notification, index) => (
                        <div key={index}>
                            <NotificationItem
                                data={notification}
                                setShowListNotification={setShowListNotification}
                            ></NotificationItem>
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

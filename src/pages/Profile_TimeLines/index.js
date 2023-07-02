import { useEffect, useState } from 'react';
import styles from './Profile_TimeLines.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import Post from '~/components/Post';
import axios from 'axios';
function Profile_TimeLines(props) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    let id = '';
    if (localStorage.getItem('anotherAccountId')) {
        id = localStorage.getItem('anotherAccountId');
    } else {
        id = localStorage.getItem('accountId');
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`http://localhost:3000/accounts/${id}/timeline`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data);
                setLoading(false);
                localStorage.setItem('idFriendRequest', res.data.id_friendRequest);
                localStorage.setItem('friendStatus', res.data.friendStatus);
            })
            .catch(() => {});
    }, []);
    const cx = classNames.bind(styles);

    return (
        <>
            {!loading && <ProfileHeader />}
            {!loading ? (
                <>
                    <div className={cx('list-post')}>
                        {data.timeline?.map((post, index) => (
                            <div key={index}>
                                <Post data={post} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
        </>
    );
}

export default Profile_TimeLines;

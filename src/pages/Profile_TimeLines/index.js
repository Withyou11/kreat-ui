import { useContext, useEffect, useState } from 'react';
import styles from './Profile_TimeLines.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import Post from '~/components/Post';
import axios from 'axios';
function Profile_TimeLines(props) {
    const [data, setData] = useState({});
    let id = '';
    if (localStorage.getItem('anotherAccountId') !== '') {
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
                console.log(res.data);
            })
            .catch(() => {});
    }, []);
    const cx = classNames.bind(styles);

    return (
        <>
            {data.fullName && <ProfileHeader data={data} />}
            <div className={cx('list-post')}>
                {data.timeline?.map((post) => (
                    <div key={post.post._id}>
                        <Post data={post} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Profile_TimeLines;

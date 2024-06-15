import { useEffect, useState } from 'react';
import styles from './DetailPost.module.scss';
import classNames from 'classnames/bind';
import Post from '~/components/Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function DetailPost() {
    let { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`http://localhost:3000/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data.postInfo);
                setLoading(false);
            })
            .catch(() => {});
    }, [id]);
    const cx = classNames.bind(styles);

    return (
        <>
            {!loading ? (
                <>
                    <div className={cx('list-post')}>
                        <Post data={data} />
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

export default DetailPost;

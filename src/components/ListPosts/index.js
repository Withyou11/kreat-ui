import { useNavigate } from 'react-router-dom';
import Post from '../Post';
import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ListPosts.module.scss';

function ListPosts() {
    const cx = classNames.bind(styles);

    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);
    const [stop, setStop] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!stop) {
            axios
                .get(`https://kreat-api.onrender.com/posts/get_all_post/${page}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    if (res.data.listPost.length === 0) {
                        setStop(true);
                    }
                    setLoading(false);
                    setResults((prevResults) => [...prevResults, ...res.data.listPost]);
                })
                .catch((error) => {
                    if (error.response.status === 403) {
                        // alert('Login session expired, please login again');
                        localStorage.removeItem('avatar');
                        localStorage.removeItem('fullname');
                        localStorage.removeItem('anotherAccountId');
                        localStorage.removeItem('accountId');
                        localStorage.removeItem('anotherAccountName');
                        localStorage.removeItem('anotherAccountAvatar');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('friendStatus');
                        localStorage.removeItem('idFriendRequest');
                        navigate('/authentication');
                        window.location.reload();
                    }
                });
        }
    }, [page, navigate, stop]);

    useEffect(() => {
        const handleScroll = () => {
            if (!stop) {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                if (Math.ceil(scrolled) >= scrollable) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [stop]);
    return (
        <div>
            {!loading ? (
                results.map((post, index) => (
                    <div key={index}>
                        <Post data={post} results={results} setResults={setResults} />
                    </div>
                ))
            ) : (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
        </div>
    );
}

export default ListPosts;

import { useNavigate } from 'react-router-dom';
import Post from '../Post';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListPosts() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/get_all_post/${page}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
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
                    navigate('/login');
                }
            });
    }, [page, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            if (Math.ceil(scrolled) >= scrollable + 17) {
                console.log('cuối trang');
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {results.map((post, index) => (
                <div key={index}>
                    <Post data={post} />
                </div>
            ))}
        </div>
    );
}

export default ListPosts;

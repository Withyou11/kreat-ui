import { useNavigate } from 'react-router-dom';
import Post from '../Post';
import { useState, useEffect } from 'react';
import axios from 'axios';
function ListPosts() {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/get_all_post`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                console.log(res.data.listPost);
                setResults(res.data.listPost);
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
    }, []);

    return (
        <div>
            {results?.map((post, index) => (
                <div key={index}>
                    {console.log(post)}
                    <Post data={post} />
                </div>
            ))}
        </div>
    );
}

export default ListPosts;

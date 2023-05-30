import Post from '../Post';
import { useState, useEffect } from 'react';
import axios from 'axios';
function ListPosts() {
    const [results, setResults] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/:id/get_all_post`, {
                // params: {
                //     id: '64323c92d7690715d02edd8b',
                // },
            })
            .then((res) => {
                setResults(res.data.listPost);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {results.map((post) => (
                <div key={post.post._id}>
                    <Post data={post} />
                </div>
            ))}
        </div>
    );
}

export default ListPosts;

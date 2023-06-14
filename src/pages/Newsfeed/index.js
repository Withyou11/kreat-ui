import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
function Newsfeed() {
    // const socket = useRef();
    // useEffect(() => {
    //     if (localStorage.getItem('accountId')) {
    //         socket.current = io('ws://localhost:3002');
    //         socket.current.emit('addUser', localStorage.getItem('accountId'));
    //         socket.current.on('getUser', (onlineFriends) => {
    //             console.log(onlineFriends);
    //         });
    //     }
    // }, []);

    return (
        <div>
            <PostForm />
            <ListPosts></ListPosts>
        </div>
    );
}

export default Newsfeed;

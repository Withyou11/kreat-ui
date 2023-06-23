import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';
import { useEffect, useRef, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import { OnlineFriendContext } from '~/Context/OnlineFriendContext/OnlineFriendContext';
import ChatBox from '~/components/ChatBox';
function Newsfeed() {
    const [selectedConversationId, setSelectedConversatioId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const handleUserSelect = (conversationId, userName, userAvatar, userId) => {
        setSelectedConversatioId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
        setSelectedUserId(userId);
    };
    const clearUser = () => {
        console.log(1);
        handleUserSelect(null, null, null, null);
    };
    const onlineFriend = useContext(OnlineFriendContext);
    const onlineFriendList = onlineFriend.onlineFriendList;
    const setOnlineFriendList = onlineFriend.setOnlineFriendList;
    let socket = useRef();
    socket.current = io('ws://localhost:3002');
    // localStorage.setItem('socket', jsonString);
    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('accountId')) {
            socket.current.emit('addUser', localStorage.getItem('accountId'));
            socket.current.on('getUser', (onlineFriends) => {
                setOnlineFriendList(onlineFriends);
            });
            socket.current.on('getMessage', (newMessage) => {
                setNewMessage(newMessage);
                setSelectedUserId(newMessage.id_sender);
            });
        }
    }, []);

    // useEffect(() => {
    //     socket.current.on('getMessage', (newMessage) => {
    //         setSelectedUserId(newMessage.id_sender);
    //         setNewMessage(newMessage);
    //     });
    // }, [selectedUserId]);

    return (
        <div>
            <PostForm />
            <ListPosts></ListPosts>
            {selectedUserId && (
                <ChatBox
                    updateState={clearUser}
                    conversationId={newMessage.id_conversation}
                    userName={newMessage.fullName}
                    userAvatar={newMessage.avatar}
                    userId={newMessage.id_sender}
                />
            )}
        </div>
    );
}

export default Newsfeed;

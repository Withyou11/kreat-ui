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
    const [flag, setFlag] = useState(0);
    const handleUserSelect = (conversationId, userName, userAvatar, userId) => {
        setSelectedConversatioId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
        setSelectedUserId(userId);
    };
    const clearUser = () => {
        handleUserSelect(null, null, null, null);
    };
    const onlineFriend = useContext(OnlineFriendContext);
    const onlineFriendList = onlineFriend.onlineFriendList;
    const setOnlineFriendList = onlineFriend.setOnlineFriendList;
    let socket = useRef();
    socket.current = io('ws://localhost:3002');
    useEffect(() => {
        window.scrollTo(0, 0);
        if (localStorage.getItem('accountId')) {
            socket.current.emit('addUser', localStorage.getItem('accountId'));
            socket.current.on('getUser', (onlineFriends) => {
                console.log(onlineFriends);
                setOnlineFriendList(onlineFriends);
            });
            socket.current.on('getMessage', (newMessage) => {
                setFlag((prevCount) => prevCount + 1);
                console.log(newMessage.messageContent);
                setNewMessage(newMessage);
                setSelectedUserId(newMessage.id_sender);
            });
        }
    }, []);

    useEffect(() => {
        if (newMessage) {
            setSelectedUserId(newMessage.id_sender);
        }
    }, [newMessage]);

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
                    flag={flag}
                />
            )}
        </div>
    );
}

export default Newsfeed;

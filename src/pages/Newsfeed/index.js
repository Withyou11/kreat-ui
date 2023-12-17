import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';
import ChatBox from '~/components/ChatBox';
import { useEffect, useState, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';

const socket = io.connect('https://kreat-socket.onrender.com');

function Newsfeed({
    selectedConversationId,
    selectedUserAvatar,
    selectedUserName,
    selectedUserId,
    clearUser,
    flag,
    status,
}) {
    // Define Call video variables
    const [me, setMe] = useState('');
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallerAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    return (
        <div>
            <PostForm />
            <ListPosts />
            {selectedUserId && (
                <ChatBox
                    updateState={clearUser}
                    conversationId={selectedConversationId}
                    userName={selectedUserName}
                    userAvatar={selectedUserAvatar}
                    userId={selectedUserId}
                    flag={flag}
                    status={status}
                />
            )}
        </div>
    );
}

export default Newsfeed;

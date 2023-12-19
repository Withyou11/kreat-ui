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

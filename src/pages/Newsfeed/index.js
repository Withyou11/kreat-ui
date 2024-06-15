import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';
import ChatBox from '~/components/ChatBox';
import { useEffect, useState, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { io } from 'socket.io-client';

const socket = io.connect('http://localhost:3002');

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
        <div style={{ width: '100%' }}>
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

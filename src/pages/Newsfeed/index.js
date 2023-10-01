import ListPosts from '~/components/ListPosts';
import PostForm from '~/components/PostForm';
import ChatBox from '~/components/ChatBox';
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

import AccountItem from '../AccountItem';
import styles from './ListAccountItem.module.scss';
import classNames from 'classnames/bind';
import ChatBox from '../ChatBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListAccountItem({ listContact, onlineFriendList }) {
    const cx = classNames.bind(styles);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const handleUserSelect = (conversationId, userName, userAvatar, userId) => {
        setSelectedConversationId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
        setSelectedUserId(userId);
    };
    const clearUser = () => {
        handleUserSelect(null, null, null);
    };

    const onlineAccountIds = onlineFriendList.map((onlineFriend) => onlineFriend.id_account);

    const sortedListContact = [...listContact].sort((a, b) => {
        const aIsActive = onlineAccountIds.includes(a.id_account);
        const bIsActive = onlineAccountIds.includes(b.id_account);
        if (aIsActive && !bIsActive) {
            return -1;
        } else if (!aIsActive && bIsActive) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <div className={cx('wrapper')}>
            {sortedListContact.map((account, index) => {
                const isActive = onlineAccountIds.includes(account.id_account);
                return (
                    <div key={index}>
                        <AccountItem
                            key={account.id_conversation}
                            data={account}
                            active={isActive}
                            inactive={!isActive}
                            onUserSelect={() =>
                                handleUserSelect(
                                    account.id_conversation,
                                    account.fullName,
                                    account.avatar,
                                    account.id_account,
                                )
                            }
                        ></AccountItem>
                    </div>
                );
            })}
            {selectedConversationId && (
                <ChatBox
                    updateState={clearUser}
                    conversationId={selectedConversationId}
                    userName={selectedUserName}
                    userAvatar={selectedUserAvatar}
                    userId={selectedUserId}
                />
            )}
        </div>
    );
}

export default ListAccountItem;

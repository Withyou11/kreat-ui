import AccountItem from '../AccountItem';
import styles from './ListAccountItem.module.scss';
import classNames from 'classnames/bind';
import ChatBox from '../ChatBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListAccountItem({ onlineFriendList }) {
    const cx = classNames.bind(styles);
    const [selectedConversationId, setSelectedConversatioId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const handleUserSelect = (conversationId, userName, userAvatar, userId) => {
        setSelectedConversatioId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
        setSelectedUserId(userId);
    };
    const clearUser = () => {
        handleUserSelect(null, null, null);
    };
    const [listContact, setListContact] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/accounts/contact`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setListContact(response.data.listContact);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const onlineAccountIds = onlineFriendList.map((onlineFriend) => onlineFriend.id_account);
    return (
        <div className={cx('wrapper')}>
            {/* {listContact?.map((account) => (
                <div key={Math.random()}>
                    <AccountItem
                        key={account.id_conversation}
                        data={account}
                        active
                        onUserSelect={() => handleUserSelect(account.id_conversation, account.fullName, account.avatar)}
                    ></AccountItem>
                </div>
            ))} */}
            {listContact?.map((account) => {
                const isActive = onlineAccountIds.includes(account.id_account);
                return (
                    <div key={Math.random()}>
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

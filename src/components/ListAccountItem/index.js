import AccountItem from '../AccountItem';
import styles from './ListAccountItem.module.scss';
import classNames from 'classnames/bind';
import ChatBox from '../ChatBox';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListAccountItem({}) {
    // console.log(onlineFriends);
    const cx = classNames.bind(styles);
    const [selectedConversationId, setSelectedConversatioId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const handleUserSelect = (conversationId, userName, userAvatar) => {
        setSelectedConversatioId(conversationId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
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
    // const onlineAccountIds = onlineFriends.map((onlineFriend) => onlineFriend.id_account);
    return (
        <div className={cx('wrapper')}>
            {listContact?.map((account) => (
                <div key={Math.random()}>
                    <AccountItem
                        key={account.id_conversation}
                        data={account}
                        active
                        onUserSelect={() => handleUserSelect(account.id_conversation, account.fullName, account.avatar)}
                    ></AccountItem>
                </div>
            ))}
            {/* {listContact?.map((account) => {
                const isActive = onlineAccountIds.includes(account.id_account);
                return (
                    <div key={Math.random()}>
                        <AccountItem
                            key={account.id_conversation}
                            data={account}
                            active={isActive}
                            inactive={!isActive}
                            onUserSelect={() =>
                                handleUserSelect(account.id_conversation, account.fullName, account.avatar)
                            }
                        ></AccountItem>
                    </div>
                );
            })} */}
            {selectedConversationId && (
                <ChatBox
                    updateState={clearUser}
                    conversationId={selectedConversationId}
                    userName={selectedUserName}
                    userAvatar={selectedUserAvatar}
                />
            )}
        </div>
    );
}

export default ListAccountItem;

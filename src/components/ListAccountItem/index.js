import AccountItem from '../AccountItem';
import styles from './ListAccountItem.module.scss';
import classNames from 'classnames/bind';
import ChatBox from '../ChatBox';
import { useState } from 'react';

function ListAccountItem() {
    const cx = classNames.bind(styles);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUserName, setSelectedUserName] = useState(null);
    const [selectedUserAvatar, setSelectedUserAvatar] = useState(null);
    const handleUserSelect = (userId, userName, userAvatar) => {
        setSelectedUserId(userId);
        setSelectedUserName(userName);
        setSelectedUserAvatar(userAvatar);
    };
    const clearUser = () => {
        handleUserSelect(null, null, null);
    };

    const fakeData = {
        nickname: 'abc@gmail.com',
        avatar: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/06/avatar-anime-nu-cute.jpg',
        full_name: 'Rose Marry',
    };

    const fakeData2 = {
        nickname: 'def@gmail.com',
        avatar: 'https://i.pinimg.com/736x/c0/29/5a/c0295a690ba4e121e0ab092279d8ed6b.jpg',
        full_name: 'Rebeca Powel',
    };
    return (
        <div className={cx('wrapper')}>
            <AccountItem
                key={1}
                data={fakeData2}
                active
                onUserSelect={() => handleUserSelect(fakeData2.nickname, fakeData2.full_name, fakeData2.avatar)}
            />
            <AccountItem
                key={2}
                data={fakeData}
                active
                onUserSelect={() => handleUserSelect(fakeData.nickname, fakeData.full_name, fakeData.avatar)}
            />
            <AccountItem
                key={3}
                data={fakeData2}
                inactive
                onUserSelect={() => handleUserSelect(fakeData2.nickname, fakeData2.full_name, fakeData2.avatar)}
            />
            <AccountItem
                key={4}
                data={fakeData}
                active
                onUserSelect={() => handleUserSelect(fakeData.nickname, fakeData.full_name, fakeData.avatar)}
            />
            <AccountItem
                key={11}
                data={fakeData2}
                active
                onUserSelect={() => handleUserSelect(fakeData2.nickname, fakeData2.full_name, fakeData2.avatar)}
            />
            <AccountItem
                key={21}
                data={fakeData}
                active
                onUserSelect={() => handleUserSelect(fakeData.nickname, fakeData.full_name, fakeData.avatar)}
            />
            <AccountItem
                key={31}
                data={fakeData2}
                inactive
                onUserSelect={() => handleUserSelect(fakeData2.nickname, fakeData2.full_name, fakeData2.avatar)}
            />
            <AccountItem
                key={41}
                data={fakeData}
                active
                onUserSelect={() => handleUserSelect(fakeData.nickname, fakeData.full_name, fakeData.avatar)}
            />
            <AccountItem
                key={12}
                data={fakeData2}
                active
                onUserSelect={() => handleUserSelect(fakeData2.nickname, fakeData2.full_name, fakeData2.avatar)}
            />
            <AccountItem
                key={22}
                data={fakeData}
                active
                onUserSelect={() => handleUserSelect(fakeData.nickname, fakeData.full_name, fakeData.avatar)}
            />
            {selectedUserId && (
                <ChatBox
                    updateState={clearUser}
                    userId={selectedUserId}
                    userName={selectedUserName}
                    userAvatar={selectedUserAvatar}
                />
            )}
        </div>
    );
}

export default ListAccountItem;

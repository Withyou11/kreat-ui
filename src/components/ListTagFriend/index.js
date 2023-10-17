import { useState, useEffect } from 'react';
import styles from './ListTagFriend.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'cloudinary-react';
function ListTagFriend({ data, handleWithFriendChange, withfriend, withfriendName }) {
    const cx = classNames.bind(styles);

    const [selectedFriends, setSelectedFriends] = useState(withfriend);
    const [selectedFriendsName, setSelectedFriendsName] = useState(withfriendName);

    function handleFriendSelection(friendName, friendId) {
        if (selectedFriendsName.includes(friendName)) {
            setSelectedFriendsName(selectedFriendsName.filter((fullName) => fullName !== friendName));
            setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
        } else {
            setSelectedFriendsName([...selectedFriendsName, friendName]);
            setSelectedFriends([...selectedFriends, friendId]);
        }
    }

    useEffect(() => {
        handleWithFriendChange(selectedFriends, selectedFriendsName);
    }, [selectedFriends]);

    useEffect(() => {
        setSelectedFriends(withfriend);
    }, [withfriend]);

    const originalError = console.error;
    console.error = (message) => {
        if (message.startsWith('Warning: A component is changing an uncontrolled input to be controlled')) {
            return;
        }
        originalError(message);
    };
    return (
        <div className={cx('wrapper')}>
            {data &&
                data.map((friend, index) => (
                    <div key={index}>
                        <label className={cx('label-checkbox')}>
                            <input
                                type="checkbox"
                                value={friend.id_account}
                                checked={
                                    selectedFriends.includes(friend.id_account) ||
                                    (friend.isJoined && friend.isJoined === true)
                                }
                                onChange={() => handleFriendSelection(friend.fullName, friend.id_account)}
                                disabled={friend.isJoined === true}
                            />
                            <div>
                                <Image
                                    className={cx('avatar', { muted: friend.isJoined === true })}
                                    cloudName="dzuzcewvj"
                                    publicId={friend.avatar}
                                    alt="Avatar"
                                />
                            </div>
                            <div className={cx('name', { muted: friend.isJoined === true })}>{friend.fullName}</div>
                        </label>
                    </div>
                ))}
        </div>
    );
}

export default ListTagFriend;

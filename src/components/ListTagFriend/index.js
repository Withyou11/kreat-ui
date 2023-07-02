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
    return (
        <div className={cx('wrapper')}>
            {data &&
                data.map((friend, index) => (
                    <div key={index}>
                        <label className={cx('label-checkbox')}>
                            <input
                                type="checkbox"
                                value={friend.id_account}
                                checked={selectedFriends.includes(friend.id_account)}
                                onChange={() => handleFriendSelection(friend.fullName, friend.id_account)}
                            />
                            <div>
                                <Image
                                    className={cx('avatar')}
                                    cloudName="dzuzcewvj"
                                    publicId={friend.avatar}
                                    alt="Avatar"
                                />
                            </div>
                            <div className={cx('name')}>{friend.fullName}</div>
                        </label>
                    </div>
                ))}
        </div>
    );
}

export default ListTagFriend;

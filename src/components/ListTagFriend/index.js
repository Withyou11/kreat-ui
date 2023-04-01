import { useState, useEffect } from 'react';
import styles from './ListTagFriend.module.scss';
import classNames from 'classnames/bind';
function ListTagFriend({ data, handleWithFriendChange, withfriend }) {
    const cx = classNames.bind(styles);

    const [selectedFriends, setSelectedFriends] = useState(withfriend);

    function handleFriendSelection(friendName) {
        if (selectedFriends.includes(friendName)) {
            setSelectedFriends(selectedFriends.filter((fullName) => fullName !== friendName));
        } else {
            setSelectedFriends([...selectedFriends, friendName]);
        }
    }

    useEffect(() => {
        handleWithFriendChange(selectedFriends);
    }, [selectedFriends]);

    useEffect(() => {
        setSelectedFriends(withfriend);
    }, [withfriend]);
    return (
        <div className={cx('wrapper')}>
            {data &&
                data.map((friend) => (
                    <div key={friend.id}>
                        <label className={cx('label-checkbox')}>
                            <input
                                type="checkbox"
                                value={friend.id}
                                checked={selectedFriends.includes(friend.fullName)}
                                onChange={() => handleFriendSelection(friend.fullName)}
                            />
                            <div>
                                <img className={cx('avatar')} src={friend.avatar} alt="Avatar" />
                            </div>
                            <div className={cx('name')}>{friend.fullName}</div>
                        </label>
                    </div>
                ))}
        </div>
    );
}

export default ListTagFriend;

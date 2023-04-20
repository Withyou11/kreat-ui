import styles from './TagFriendModal.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useMemo } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';

import ListTagFriend from '../ListTagFriend';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
function TagFriendModal({ onClose, visible, withfriend, handleWithFriendChange }) {
    // const [friends, setFriends] = useState([]);
    const cx = classNames.bind(styles);

    const handleCompleteTag = (event) => {
        event.preventDefault();
        onClose();
    };

    // useEffect(() => {
    //     fetch('/api/friends')
    //       .then(response => response.json())
    //       .then(data => setFriends(data));
    //   }, []);
    const data = useMemo(
        () => [
            {
                id: 1,
                fullName: 'John Doe',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            },
            {
                id: 2,
                fullName: 'Jane Smith',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            },
            {
                id: 3,
                fullName: 'Bob Johnson',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
            {
                id: 4,
                fullName: 'Alice Williams',
                avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            },
            {
                id: 5,
                fullName: 'Mike Brown',
                avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            },
            {
                id: 6,
                fullName: 'Bob Johnson',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            },
            {
                id: 7,
                fullName: 'Alice Williams',
                avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
            },
            {
                id: 8,
                fullName: 'Mike Brown',
                avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
            },
        ],
        [],
    );

    // setFriends(data);

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(data);
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchText(e.target.value);
        }
    };

    useEffect(() => {
        const filteredData = data.filter((friend) => friend.fullName.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredData);
    }, [searchText, data]);

    function handleClose() {
        onClose();
    }
    return (
        // <div className={cx('wrapper')}>
        //     <PopperWrapper>
        <Modal show={visible} onHide={handleClose} animation={false}>
            <Modal.Body>
                <h3 style={{ margin: '0 12px' }}>Select friends to tag:</h3>
                <button className={cx('delete-image-button')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                </button>
                <hr style={{ margin: '8px' }} />
                <input
                    value={searchText}
                    style={{ width: '90%' }}
                    placeholder="Find your friend..."
                    spellCheck="false"
                    onChange={(e) => handleChange(e)}
                />
                <ListTagFriend
                    data={searchResults}
                    handleWithFriendChange={handleWithFriendChange}
                    withfriend={withfriend}
                />
                <button className={cx('buttonDone')} onClick={(event) => handleCompleteTag(event)}>
                    Done
                </button>
            </Modal.Body>
        </Modal>
        //     </PopperWrapper>
        // </div>
    );
}

export default TagFriendModal;

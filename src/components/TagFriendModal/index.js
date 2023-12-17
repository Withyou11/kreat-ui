import styles from './TagFriendModal.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import ListTagFriend from '../ListTagFriend';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function TagFriendModal({ onClose, visible, withfriend, withfriendName, handleWithFriendChange }) {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const handleCompleteTag = (event) => {
        event.preventDefault();
        onClose();
    };

    const [dict, setDict] = useState({});
    useEffect(() => {
        switch (localStorage.getItem('language')) {
            case 'english':
                setDict(enDict);
                break;
            case 'vietnamese':
                setDict(viDict);
                break;
        }
    }, []);

    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/posts/get_all_friend_to_tag`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setData(response.data.listFriend);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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
        <Modal show={visible} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <h3 style={{ margin: '0 12px' }}>{dict.Select_friends_to_tag}</h3>
                <button className={cx('delete-image-button')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                </button>
                <hr style={{ margin: '8px' }} />
                <input
                    value={searchText}
                    style={{ width: '90%' }}
                    placeholder={dict.Find_your_friends}
                    spellCheck="false"
                    onChange={(e) => handleChange(e)}
                />
                <div style={{ height: '77%' }}>
                    <ListTagFriend
                        data={searchResults}
                        handleWithFriendChange={handleWithFriendChange}
                        withfriend={withfriend}
                        withfriendName={withfriendName}
                    />
                </div>
                <button className={cx('buttonDone')} onClick={(event) => handleCompleteTag(event)}>
                    {dict.Done}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default TagFriendModal;

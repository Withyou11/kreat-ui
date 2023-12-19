import styles from './AddMemberModal.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListTagFriend from '../ListTagFriend';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function AddMemberModal({ groupId, onClose, visible }) {
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

    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);

    const [withfriend, setWithfriend] = useState([]);
    const [withfriendName, setWithFriendName] = useState([]);

    const handleWithFriendChange = (newListFriend, newListFriendName) => {
        setWithfriend(newListFriend);
        setWithFriendName(newListFriendName);
    };

    const handleAddMember = (event) => {
        const body = {
            newMembers: withfriend,
        };
        axios
            .patch(`https://kreat-api.onrender.com/chat/add_members_group_chat/${groupId}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                handleClose();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/chat/get_all_friends_for_group_chat/${groupId}`, {
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
        <Modal show={true} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h2>{dict.Add_friend_to_this_group_chat}</h2>
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
                    <div style={{ flex: 1 }}>
                        <ListTagFriend
                            data={searchResults}
                            handleWithFriendChange={handleWithFriendChange}
                            withfriend={withfriend}
                            withfriendName={withfriendName}
                        />
                    </div>
                    <button className={cx('buttonDone')} onClick={(event) => handleAddMember(event)}>
                        {dict.Add}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddMemberModal;

import styles from './CreateGroupModal.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListTagFriend from '../ListTagFriend';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function CreateGroupModal({ onClose, visible }) {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [chosenImage, setChosenImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [groupName, setGroupName] = useState('');
    const inputRef = useRef(null);

    const [withfriend, setWithfriend] = useState([]);
    const [withfriendName, setWithFriendName] = useState([]);

    const handleWithFriendChange = (newListFriend, newListFriendName) => {
        setWithfriend(newListFriend);
        setWithFriendName(newListFriendName);
    };

    const handleInputButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const handleCreateGroup = (event) => {
        event.preventDefault();
        const body = {
            picture: base64Image,
            name: groupName,
            members: withfriend,
        };
        if (groupName && withfriend.length > 1) {
            axios
                .post(`https://kreat-api.onrender.com/chat/create_group_chat`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    onClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            alert(`${dict.Please_fill_in_the_group_name_and_select_at_least_2_people_to_add_to_the_group}`);
        }
    };

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

    const handleNameChange = (event) => {
        setGroupName(event.target.value);
    };

    useEffect(() => {
        const filteredData = data.filter((friend) => friend.fullName.toLowerCase().includes(searchText.toLowerCase()));
        setSearchResults(filteredData);
    }, [searchText, data]);

    function handleClose() {
        onClose();
    }

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

    const handleChange1 = (event) => {
        setChosenImage(event.target.files);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setBase64Image(base64String);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Modal show={visible} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h2>{dict.Create_new_group_chat}</h2>
                    <div className={cx('wrapper')}>
                        <div className={cx('avatar-container')}>
                            {chosenImage && (
                                <img className={cx('avatar')} src={URL.createObjectURL(chosenImage[0])} alt="avatar" />
                            )}
                        </div>
                        <div className={cx('add-image-container')}>
                            <button
                                className={cx('add-image-button')}
                                onClick={(event) => handleInputButtonClick(event)}
                            >
                                {dict.Choose_image}
                            </button>
                        </div>
                        <input
                            ref={inputRef}
                            style={{ display: 'none' }}
                            id="image-uploader"
                            type="file"
                            accept="image/*"
                            name="media"
                            onChange={(event) => handleChange1(event)}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="fullName">
                            {dict.Group_Name}
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            value={groupName}
                            onChange={handleNameChange}
                            className={cx('form-control')}
                        />
                    </div>
                    <h3 style={{ margin: '0 12px' }}>{dict.Select_friends_to_add_to_the_group_chat}</h3>
                    <button className={cx('delete-image-button')} onClick={handleClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                    <hr style={{ margin: '8px' }} />
                    <input
                        value={searchText}
                        style={{ width: '90%' }}
                        placeholder={dict.Find_your_fiends}
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
                    <button className={cx('buttonDone')} onClick={(event) => handleCreateGroup(event)}>
                        {dict.Create}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default CreateGroupModal;

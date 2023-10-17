import styles from './UpdateGroupInfoModal.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MemberItem from '../MemberItem';

function UpdateGroupInfoModal({ groupId, isLeader, groupName, groupImage, onClose, onSave }) {
    const cx = classNames.bind(styles);
    const personalInfo = {
        name: groupName,
        picture: groupImage,
    };
    const [data, setData] = useState(personalInfo);
    const [chosenImage, setChosenImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const [listMember, setListMember] = useState([]);
    const inputRef = useRef(null);

    function handleClose() {
        onClose(false);
    }

    const handleInputButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const handleChange = (event, fieldName) => {
        if (fieldName === 'name') {
            setData((prevData) => ({
                ...prevData,
                name: event.target.value,
            }));
        } else {
            setChosenImage(event.target.files);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chat/get_all_members_group_chat/${groupId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setListMember(response.data.listMember);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        if (chosenImage) {
            const reader = new FileReader();
            const file = chosenImage[0];

            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
            setTimeout(
                () =>
                    setData((prevData) => ({
                        ...prevData,
                        picture: reader.result,
                    })),
                10,
            );
        }
    }, [chosenImage]);

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    const handleLeave = () => {
        if (window.confirm(`Are you sure to leave this group chat?`)) {
            axios
                .patch(
                    `http://localhost:3000/chat/leave_group_chat/${groupId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <Modal show={true} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <div style={{ position: 'relative', height: '100%' }}>
                    <div style={{ display: 'flex' }}>
                        <h3 style={{ margin: 'auto 12px' }}>Update your group information:</h3>
                        <button className={cx('delete-image-button')} onClick={onClose}>
                            <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                    <hr style={{ margin: '8px' }} />
                    <div className={cx('wrapper')}>
                        <div className={cx('avatar-container')}>
                            {!chosenImage ? (
                                <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={groupImage} />
                            ) : (
                                <img
                                    id="preview"
                                    className={cx('avatar')}
                                    src={URL.createObjectURL(chosenImage[0])}
                                    alt="avatar"
                                />
                            )}
                        </div>
                        {isLeader && (
                            <div className={cx('add-image-container')}>
                                <button
                                    className={cx('add-image-button')}
                                    onClick={(event) => handleInputButtonClick(event)}
                                >
                                    Choose image...
                                </button>
                            </div>
                        )}
                        <input
                            ref={inputRef}
                            style={{ display: 'none' }}
                            id="image-uploader"
                            type="file"
                            accept="image/*, video/*"
                            multiple
                            name="media"
                            onChange={(event) => handleChange(event, 'avatar')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="name">
                            Group Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={data.name}
                            onChange={(event) => handleChange(event, 'name')}
                            readOnly={isLeader === false}
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('memberList')}>
                        {listMember.map((member, index) => (
                            <div key={index}>
                                <MemberItem
                                    data={member}
                                    isLeader={isLeader}
                                    setListMember={setListMember}
                                    groupId={groupId}
                                    listMember={listMember}
                                ></MemberItem>
                            </div>
                        ))}
                    </div>
                    <button className={cx('buttonLeave')} onClick={handleLeave}>
                        Leave this group
                    </button>
                    {isLeader && (
                        <button className={cx('buttonDone')} onClick={handleSave}>
                            Update
                        </button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateGroupInfoModal;

import styles from './UpdateNameModal.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpdateNameModal({ onClose, onSave }) {
    const cx = classNames.bind(styles);
    const personalInfo = {
        fullName: `${localStorage.getItem('fullname')}`,
        avatar: `${localStorage.getItem('avatar')}`,
    };
    const [data, setData] = useState(personalInfo);
    const [chosenImage, setChosenImage] = useState(null);
    const [base64Image, setBase64Image] = useState(null);
    const inputRef = useRef(null);

    function handleClose() {
        onClose(false);
    }

    const handleInputButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const handleChange = (event, fieldName) => {
        if (fieldName === 'fullName') {
            setData((prevData) => ({
                ...prevData,
                fullName: event.target.value,
            }));
        } else {
            setChosenImage(event.target.files);
        }
    };

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
                        avatar: reader.result,
                    })),
                10,
            );
        }
    }, [chosenImage]);

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    return (
        <Modal show={true} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>Update your name and avatar:</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <div className={cx('wrapper')}>
                    <div className={cx('avatar-container')}>
                        {!chosenImage ? (
                            <Image
                                className={cx('avatar')}
                                cloudName="dzuzcewvj"
                                publicId={localStorage.getItem('avatar')}
                            />
                        ) : (
                            <img
                                id="preview"
                                className={cx('avatar')}
                                src={URL.createObjectURL(chosenImage[0])}
                                alt="avatar"
                            />
                        )}
                    </div>
                    <div className={cx('add-image-container')}>
                        <button className={cx('add-image-button')} onClick={(event) => handleInputButtonClick(event)}>
                            Choose image...
                        </button>
                    </div>
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
                    <label className={cx('label1')} htmlFor="fullName">
                        Full Name:
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={data.fullName}
                        onChange={(event) => handleChange(event, 'fullName')}
                        className={cx('form-control')}
                    />
                </div>
                <button className={cx('buttonDone')} onClick={handleSave}>
                    Update
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateNameModal;

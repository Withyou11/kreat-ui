import styles from './PostForm.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import avatar from '~/assets/images/useravatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState, useEffect, useRef } from 'react';
import Button from '../Button';
import TagFriendModal from '../TagFriendModal';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faTimes, faUserTag } from '@fortawesome/free-solid-svg-icons';
import LocationModal from '../LocationModal';

function PostForm() {
    const [inputValue, setInputValue] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [privacy, setPrivacy] = useState('Public');

    const [withfriend, setWithFriend] = useState([]);
    const [atLocation, setAtLocation] = useState('');

    const handleWithFriendChange = (newListFriend) => {
        setWithFriend(newListFriend);
    };

    const handleAtLocationChange = (newLocation) => {
        setAtLocation(newLocation);
    };

    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

    const inputRef = useRef(null);
    const cx = classNames.bind(styles);

    // Hàm hoàn tất đăng bài
    const handleSubmit = () => {
        console.log('post successfully submitted');
        // Biến tag bạn bè: withfriend, biến location: atLocation, biến nội dung: inputValue, biến ảnh: selectedImages, biến quyền riêng tư: privacy
    };

    const handleInputButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, ...files]);
    };

    const handleImageDelete = (image) => {
        setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((prevImage) => prevImage !== image));
        URL.revokeObjectURL(image.preview);
    };

    const handleTagButtonClick = (event) => {
        event.preventDefault();
        setIsTagModalOpen(true);
    };

    const handleLocationButtonClick = (event) => {
        event.preventDefault();
        setIsLocationModalOpen(true);
    };

    useEffect(() => {
        document.getElementById('public').click();
    }, []);

    useEffect(() => {
        const urls = [];
        selectedImages.forEach((image) => {
            const url = URL.createObjectURL(image);
            urls.push(url);
        });
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [selectedImages]);

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('post-form')}>
                    <div className={cx('avatar')}>
                        <img src={avatar} alt="avatar" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className={cx('main-input')}
                            type="text"
                            spellCheck={false}
                            placeholder="What are you thinking?"
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                        <div className={cx('image-container')}>
                            {selectedImages.map((image) => (
                                <div className={cx('post-image')} key={image.name}>
                                    <img
                                        id="preview"
                                        key={image.name}
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                    />
                                    <button
                                        className={cx('delete-image-button')}
                                        onClick={() => handleImageDelete(image)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('delete-user-icon')}
                                            icon={faTimes}
                                        ></FontAwesomeIcon>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <hr />
                        <div className={cx('post-actions')}>
                            <label htmlFor="image-uploader">
                                <button
                                    className={cx('add-image-button')}
                                    onClick={(event) => handleInputButtonClick(event)}
                                >
                                    <FontAwesomeIcon
                                        className={cx('add-user-icon')}
                                        style={{ color: 'green' }}
                                        icon={faImage}
                                    ></FontAwesomeIcon>
                                </button>
                            </label>
                            <input
                                ref={inputRef}
                                style={{ display: 'none' }}
                                id="image-uploader"
                                type="file"
                                multiple
                                name="image"
                                onChange={(event) => handleImageChange(event)}
                            />
                            <button className={cx('add-image-button')} onClick={(event) => handleTagButtonClick(event)}>
                                <FontAwesomeIcon className={cx('add-user-icon')} icon={faUserTag}></FontAwesomeIcon>
                            </button>
                            {isTagModalOpen && (
                                <div>
                                    <TagFriendModal
                                        visible={isTagModalOpen}
                                        onClose={() => setIsTagModalOpen(false)}
                                        withfriend={withfriend}
                                        handleWithFriendChange={handleWithFriendChange}
                                    />
                                </div>
                            )}
                            <button
                                className={cx('add-image-button')}
                                onClick={(event) => handleLocationButtonClick(event)}
                            >
                                <FontAwesomeIcon
                                    className={cx('add-location-icon')}
                                    icon={faLocationDot}
                                ></FontAwesomeIcon>
                            </button>
                            {isLocationModalOpen && (
                                <div>
                                    <LocationModal
                                        visible={isLocationModalOpen}
                                        onClose={() => setIsLocationModalOpen(false)}
                                        handleAtLocationChange={handleAtLocationChange}
                                    />
                                </div>
                            )}
                            <div className={cx('post-info')}>
                                <span className={cx('location-info')}>
                                    <h4 style={{ display: 'inline-block', marginLeft: '4px' }}>At:</h4>
                                    <p style={{ display: 'inline-block', marginLeft: '4px' }}>{atLocation}</p>
                                </span>
                                <span style={{ display: 'inline-block' }} className={cx('friends-info')}>
                                    <h4 style={{ display: 'inline-block', marginLeft: '4px' }}>With:</h4>
                                    {withfriend.map((item, index) => (
                                        <p style={{ display: 'inline-block', marginLeft: '4px' }} key={index}>
                                            {item},
                                        </p>
                                    ))}
                                </span>
                            </div>

                            <div className={cx('radio-container')}>
                                <div className={cx('radio-item')}>
                                    <input
                                        type="radio"
                                        id="public"
                                        name="privacy"
                                        value="public"
                                        checked={privacy === 'public'}
                                        onChange={() => setPrivacy('public')}
                                    />
                                    <p className={cx('radio-label')}>Public</p>
                                </div>
                                <div className={cx('radio-item')}>
                                    <input
                                        type="radio"
                                        id="friend"
                                        name="privacy"
                                        value="friend"
                                        checked={privacy === 'friend'}
                                        onChange={() => setPrivacy('friend')}
                                    />
                                    <p className={cx('radio-label')}>Friends</p>
                                </div>
                                <div className={cx('radio-item')}>
                                    <input
                                        type="radio"
                                        id="private"
                                        name="privacy"
                                        value="private"
                                        checked={privacy === 'private'}
                                        onChange={() => setPrivacy('private')}
                                    />
                                    <p className={cx('radio-label')}>Private</p>
                                </div>
                            </div>
                            <Button className={cx('submit-button')} primary small type="submit">
                                Post
                            </Button>
                        </div>
                    </form>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default PostForm;

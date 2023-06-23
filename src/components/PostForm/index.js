import styles from './PostForm.module.scss';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { Image } from 'cloudinary-react';
import Button from '../Button';
import TagFriendModal from '../TagFriendModal';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faFaceSmile, faLocationDot, faTimes, faUserTag } from '@fortawesome/free-solid-svg-icons';
import LocationModal from '../LocationModal';
import { useNavigate } from 'react-router-dom';
import FeelingModal from '../FeelingModal';

function PostForm() {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [privacy, setPrivacy] = useState('public');

    const [withfriend, setWithFriend] = useState([]);
    const [atLocation, setAtLocation] = useState('');
    const [feeling, setFeeling] = useState('');

    const handleWithFriendChange = (newListFriend) => {
        setWithFriend(newListFriend);
    };

    const handleAtLocationChange = (newLocation) => {
        setAtLocation(newLocation);
    };

    const handleFeelingChange = (newFeeling) => {
        setFeeling(newFeeling);
    };

    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isFeelingModalOpen, setIsFeelingModalOpen] = useState(false);

    const inputRef = useRef(null);
    const cx = classNames.bind(styles);

    // Hàm hoàn tất đăng bài
    const handleSubmit = (e) => {
        e.preventDefault();
        let visualData = [];
        const promises = [];

        selectedImages.forEach((image) => {
            const file = image;
            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
                reader.onload = function (event) {
                    const base64Data = event.target.result;
                    resolve(base64Data);
                };
                reader.onerror = function (error) {
                    reject(error);
                };
            });
            reader.readAsDataURL(file);
            promises.push(promise);
        });

        Promise.all(promises)
            .then((base64DataArray) => {
                const visualList = {
                    data: base64DataArray,
                };
                visualList.data.map((visual) => {
                    visualData.push({ type: 'image', data: visual });
                });
                const postData = {
                    visualData: visualData,
                    postContent: inputValue,
                    postPrivacy: privacy,
                    id_friendTag: withfriend,
                    location: atLocation,
                    postFeeling: feeling,
                };
                axios
                    .post('http://localhost:3000/posts/create_post', postData, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    })
                    .then((res) => {
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

        // selectedVideos.forEach((video) => {
        //     id_visualMedia.push({ key: 'video', value: video });
        // });

        // Biến tag bạn bè: withfriend, biến location: atLocation, biến nội dung: inputValue, biến ảnh: selectedImages, biến video: selectedVideos, biến quyền riêng tư: privacy
    };

    const handleInputButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    };

    const handleMediaChange = (event) => {
        const files = Array.from(event.target.files);
        files.forEach((file) => {
            console.log(file);

            if (file.type.includes('image')) {
                handleImageChange(file);
            } else if (file.type.includes('video')) {
                handleVideoChange(file);
            }
        });
    };

    const handleImageChange = (image) => {
        setSelectedImages((prevSelectedImages) => [...prevSelectedImages, image]);
    };

    const handleVideoChange = (video) => {
        // Xử lý video tại đây
        setSelectedVideos((prevSelectedVideos) => [...prevSelectedVideos, video]);
    };
    const handleMediaDelete = (media, type) => {
        if (type === 'image') {
            setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((prevImage) => prevImage !== media));
            URL.revokeObjectURL(media.preview);
        } else if (type === 'video') {
            setSelectedVideos((prevSelectedVideos) => prevSelectedVideos.filter((prevVideo) => prevVideo !== media));
        }
    };

    const handleTagButtonClick = (event) => {
        event.preventDefault();
        setIsTagModalOpen(true);
    };

    const handleLocationButtonClick = (event) => {
        event.preventDefault();
        setIsLocationModalOpen(true);
    };

    const handleFeelingButtonClick = (event) => {
        event.preventDefault();
        setIsFeelingModalOpen(true);
    };

    const placeholder = `What are you thinking, ${localStorage.getItem('fullname')}?`;

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

    const handleGoProfile = () => {
        navigate('/timelines');
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('post-form')}>
                    <button onClick={handleGoProfile} className={cx('avatar')}>
                        <Image
                            className={cx('avatarImg')}
                            cloudName="dzuzcewvj"
                            publicId={localStorage.getItem('avatar')}
                        />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <textarea
                            className={cx('main-input')}
                            type="text"
                            spellCheck={false}
                            placeholder={placeholder}
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
                                        onClick={() => handleMediaDelete(image, 'image')}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('delete-user-icon')}
                                            icon={faTimes}
                                        ></FontAwesomeIcon>
                                    </button>
                                </div>
                            ))}
                            {selectedVideos.map((video) => (
                                <div className={cx('post-media')} key={video.name}>
                                    <video
                                        id="preview"
                                        key={video.name}
                                        src={URL.createObjectURL(video)}
                                        alt={video.name}
                                        controls
                                    />
                                    <button
                                        className={cx('delete-media-button')}
                                        onClick={() => handleMediaDelete(video, 'video')}
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
                            <div className={cx('add-image-button-container')}>
                                <div className={cx('add-image-button-2')}>
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
                                    <input
                                        ref={inputRef}
                                        style={{ display: 'none' }}
                                        id="image-uploader"
                                        type="file"
                                        accept="image/*, video/*"
                                        multiple
                                        name="media"
                                        onChange={(event) => handleMediaChange(event)}
                                    />
                                    <button
                                        className={cx('add-image-button')}
                                        onClick={(event) => handleTagButtonClick(event)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('add-user-icon')}
                                            icon={faUserTag}
                                        ></FontAwesomeIcon>
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
                                </div>
                                <div className={cx('add-image-button-2')}>
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
                                    <button
                                        className={cx('add-image-button')}
                                        onClick={(event) => handleFeelingButtonClick(event)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('add-emotion-icon')}
                                            icon={faFaceSmile}
                                        ></FontAwesomeIcon>
                                    </button>
                                    {isFeelingModalOpen && (
                                        <div>
                                            <FeelingModal
                                                visible={isFeelingModalOpen}
                                                onClose={() => setIsFeelingModalOpen(false)}
                                                handleFeelingChange={handleFeelingChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={cx('post-info')}>
                                <span className={cx('location-info')}>
                                    <h4 style={{ display: 'inline-block', marginLeft: '4px' }}>At:</h4>
                                    <p style={{ display: 'inline-block', marginLeft: '4px' }}>{atLocation}</p>
                                </span>
                                <span style={{ display: 'inline-block' }} className={cx('location-info')}>
                                    <h4 style={{ display: 'inline-block', marginLeft: '4px' }}>With:</h4>
                                    {withfriend.map((item, index) => (
                                        <p style={{ display: 'inline-block', marginLeft: '4px' }} key={index}>
                                            {item},
                                        </p>
                                    ))}
                                </span>
                                <span className={cx('location-info')}>
                                    <h4 style={{ display: 'inline-block', marginLeft: '4px' }}>Feeling:</h4>
                                    <p style={{ display: 'inline-block', marginLeft: '4px' }}>{feeling}</p>
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

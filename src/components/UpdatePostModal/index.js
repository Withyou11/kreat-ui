import styles from './UpdatePostModal.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { Carousel } from 'react-bootstrap';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function UpdatePostModal({ data, onClose, visible, setResults, results }) {
    const [privacy, setPrivacy] = useState(data.postPrivacy);
    const [feeling, setFeeling] = useState(data.postFeeling);

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

    const handleChangeFeeling = (e) => {
        setFeeling(e.target.value);
    };
    const cx = classNames.bind(styles);
    const [content, setContent] = useState(data.postContent);
    const handleUpdate = (event) => {
        event.preventDefault();
        const postData = {
            _id: data._id,
            avatar: data.avatar,
            fullName: data.fullName,
            id_account: data.id_account,
            id_friendTag: data.id_friendTag,
            id_visualMedia: data.id_visualMedia,
            isShare: data.isShare,
            listReaction: data.listReaction,
            location: data.location,
            shareId: data.shareId,
            createdAt: data.createdAt,
            postPrivacy: privacy,
            postContent: content,
            postFeeling: feeling === 'No emotion' ? '' : feeling,
        };
        axios
            .patch('http://localhost:3000/posts/update_post', postData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                const updatedPost = postData;
                const postIndex = results.findIndex((post) => post._id === data._id);
                if (postIndex !== -1) {
                    setResults((prevList) => {
                        const newList = [...prevList];
                        newList[postIndex] = updatedPost;
                        return newList;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        onClose();
    };

    function handleClose() {
        onClose();
    }

    function handleChange(e) {
        setContent(e.target.value);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const diff = (now.getTime() - date.getTime()) / 1000; // Đổi thành giây

        if (diff < 60) {
            // Dưới 1 phút
            return `${Math.floor(diff)} ${dict.secsAgo}`;
        } else if (diff < 60 * 60) {
            // Dưới 1 giờ
            if (diff < 120) return `1 ${dict.minAgo}`;
            else {
                return `${Math.floor(diff / 60)} ${dict.minsAgo}`;
            }
        } else if (diff < 24 * 60 * 60) {
            if (diff < 60 * 60 * 2) return `1 ${dict.hourAgo}`;
            // Dưới 1 ngày
            return `${Math.floor(diff / (60 * 60))} ${dict.hoursAgo}`;
        } else if (diff < 2 * 24 * 60 * 60) {
            // Từ 1 ngày tới 2 ngày
            return `${dict.yesterday} ${formatTime(date)}`;
        } else {
            // Hơn 2 ngày
            return formatDateToString(date);
        }
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        // const time = formatTime(date);

        return `${year}-${month}-${day} `;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }
    return (
        <Modal style={{ marginLeft: '-6.8%' }} show={visible} onHide={handleClose} animation={false}>
            <Modal.Body style={{ height: '100px' }}>
                <h3 style={{ margin: '0 12px' }}>{dict.Update_the_post}</h3>
                <button className={cx('delete-image-button')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                </button>
                <hr style={{ margin: '8px' }} />
                <textarea
                    className={cx('textarea')}
                    value={content}
                    style={{ width: '90%', marginLeft: '5%' }}
                    placeholder="What are you thinking?"
                    spellCheck="false"
                    onChange={(e) => handleChange(e)}
                />
                <div style={{ display: 'flex' }}>
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
                            <p className={cx('radio-label')}>{dict.Public}</p>
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
                            <p className={cx('radio-label')}>{dict.Friends}</p>
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
                            <p className={cx('radio-label')}>{dict.Private}</p>
                        </div>
                    </div>
                    <div className={cx('form-group')}>
                        <select
                            className={cx('form-control2')}
                            id="feeling"
                            value={feeling}
                            onChange={(e) => handleChangeFeeling(e)}
                        >
                            <option value="No">{dict.No_emotion}</option>
                            <option value="Happy">{dict.Happy}</option>
                            <option value="Upset">{dict.Upset}</option>
                            <option value="Excited">{dict.Excited}</option>
                            <option value="Disappointed">{dict.Disappointed}</option>
                            <option value="Surprised">{dict.Surprised}</option>
                            <option value="Emotional">{dict.Emotional}</option>
                            <option value="Optimistic">{dict.Optimistic}</option>
                            <option value="Skeptical">{dict.Skeptical}</option>
                            <option value="Regretful">{dict.Regretful}</option>
                        </select>
                    </div>
                </div>
                <div className={cx('share-content')}>
                    <div className={cx('post-content')}>
                        <div className={cx('post-content-image1')} style={{ marginTop: '12px', width: '640px' }}>
                            {data.id_visualMedia.length > 1 && (
                                <Carousel>
                                    {data.id_visualMedia.map((image) => (
                                        <Carousel.Item key={Math.random()}>
                                            <Image
                                                className={cx('image')}
                                                cloudName="dzuzcewvj"
                                                publicId={image.url}
                                                crop="scale"
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            )}
                            {data.id_visualMedia.length === 1 && (
                                <Image
                                    className={cx('image')}
                                    cloudName="dzuzcewvj"
                                    publicId={data.id_visualMedia[0].url}
                                />
                            )}
                        </div>
                        <div className={cx('post-info')}>
                            <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} />
                            <div className={cx('post-info-main')}>
                                <h4 className={cx('name')}>{data.fullName}</h4>
                                <div className={cx('time-location')}>
                                    <p className={cx('time')}>{formatDate(data.createdAt)}</p>
                                    {/* <FontAwesomeIcon className={cx('privacy')} icon={faUserGroup}></FontAwesomeIcon> */}
                                    <p className={cx('location')}>{data.location}</p>
                                </div>
                            </div>
                            {data.id_friendTag.length > 0 && (
                                <div className={cx('friend')}>
                                    <p className={cx('friend-number')}>{data.id_friendTag.length} people</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className={cx('buttonDone')} onClick={(event) => handleUpdate(event)}>
                    {dict.Update}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default UpdatePostModal;

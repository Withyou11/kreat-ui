import { useState, useEffect } from 'react';
import ProfileHeader from '~/components/ProfileHeader';
import styles from './Profile_Medias.module.scss';
import classNames from 'classnames/bind';
import { Image, Video } from 'cloudinary-react';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

import { arrow } from '~/assets/images/arrow-down.svg';

function Profile_Medias() {
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

    const options = [
        { value: 'Uploads', id: 1, title: dict.Uploads },
        { value: 'Avatars', id: 2, title: dict.Avatars },
    ];

    const [selectedImage, setSelectedImage] = useState(null);
    const [listImage, setListImage] = useState([]);
    const [listAvatar, setListAvatar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMode, setSelectedMode] = useState('Uploads');
    const cx = classNames.bind(styles);
    const handleClick = (image) => {
        setSelectedImage(image);
    };

    // const handleChangeMode = (e) => {
    //     setSelectedMode(e.target.value);
    // };

    const [isOptionsContainerActive, setOptionsContainerActive] = useState(false);
    const handleChangeMode = (value) => {
        setSelectedMode(value);
        setOptionsContainerActive(false);
    };

    let id = '';
    if (localStorage.getItem('anotherAccountId') !== '') {
        id = localStorage.getItem('anotherAccountId');
    } else {
        id = localStorage.getItem('accountId');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`https://kreat-api.onrender.com/accounts/${id}/visual_media`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListImage(response1.data.listURL);
                setLoading(false);

                const response2 = await axios.get(`https://kreat-api.onrender.com/accounts/${id}/avatar`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListAvatar(response2.data.listURL);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const handleClose = () => {
        setSelectedImage(null);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ProfileHeader />
            {loading && (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
            {!loading && selectedMode === 'Uploads' ? (
                <>
                    <div className={cx('container')}>
                        <div className={cx('select-box')}>
                            <div className={cx('options-container', { active: isOptionsContainerActive })}>
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={cx('option')}
                                        onClick={() => handleChangeMode(option.value)}
                                    >
                                        <input type="radio" className={cx('radio')} id={option.id} name="category" />
                                        <label htmlFor={option.id}>{option.title}</label>
                                    </div>
                                ))}
                            </div>
                            <div
                                className={cx('selected')}
                                onClick={() => setOptionsContainerActive(!isOptionsContainerActive)}
                            >
                                {selectedMode}
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <select
                            className={cx('changeMode')}
                            id="view-mode"
                            value={selectedMode}
                            onChange={(e) => handleChangeMode(e)}
                        >
                            <option value="image" className={cx('option')}>
                                {dict.Uploads}
                            </option>
                            <option value="avatar" className={cx('option')}>
                                {dict.Avatars}
                            </option>
                        </select>
                    </div> */}
                    <div className={cx('wrapper')}>
                        <div className={cx('image-container')}>
                            {listImage.map((media, index) => {
                                return (
                                    <div key={index} className={cx('image-item')}>
                                        {media.url.visualType === 'video' ? (
                                            <Video
                                                publicId={media.url.visualUrl}
                                                className={cx('image')}
                                                cloudName="dzuzcewvj"
                                                controls
                                                sourceTypes={['webm', 'mp4']}
                                            ></Video>
                                        ) : (
                                            <Image
                                                className={cx('image')}
                                                cloudName="dzuzcewvj"
                                                publicId={media.url.visualUrl}
                                                crop="scale"
                                                onClick={() => handleClick(media.url.visualUrl)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={cx('container')}>
                        <div className={cx('select-box')}>
                            <div className={cx('options-container', { active: isOptionsContainerActive })}>
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={cx('option')}
                                        onClick={() => handleChangeMode(option.value)}
                                    >
                                        <input type="radio" className={cx('radio')} id={option.id} name="category" />
                                        <label htmlFor={option.id}>{option.title}</label>
                                    </div>
                                ))}
                            </div>
                            <div
                                className={cx('selected')}
                                onClick={() => setOptionsContainerActive(!isOptionsContainerActive)}
                            >
                                {selectedMode}
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper')}>
                        <div className={cx('image-container')}>
                            {listAvatar.map((image, index) => {
                                return (
                                    <div key={index} className={cx('image-item')}>
                                        <Image
                                            className={cx('image')}
                                            cloudName="dzuzcewvj"
                                            publicId={image.url.visualUrl}
                                            crop="scale"
                                            onClick={() => handleClick(image.url.visualUrl)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
            {selectedImage && (
                <div className={cx('overlay')} onClick={handleClose}>
                    <Image
                        className={cx('overlay-image')}
                        cloudName="dzuzcewvj"
                        publicId={selectedImage}
                        crop="scale"
                        alt="selected media"
                    />
                </div>
            )}
        </div>
    );
}

export default Profile_Medias;

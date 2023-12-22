import { useState, useEffect } from 'react';
import ProfileHeader from '~/components/ProfileHeader';
import styles from './Profile_Medias.module.scss';
import classNames from 'classnames/bind';
import { Image, Video } from 'cloudinary-react';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

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

    const [selectedImage, setSelectedImage] = useState(null);
    const [listImage, setListImage] = useState([]);
    const [listAvatar, setListAvatar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMode, setSelectedMode] = useState('image');
    const cx = classNames.bind(styles);
    const handleClick = (image) => {
        setSelectedImage(image);
    };
    const handleChangeMode = (e) => {
        setSelectedMode(e.target.value);
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
            {!loading && selectedMode === 'image' ? (
                <>
                    <div>
                        <select
                            className={cx('changeMode')}
                            id="view-mode"
                            value={selectedMode}
                            onChange={(e) => handleChangeMode(e)}
                        >
                            <option value="image">{dict.Uploads}</option>
                            <option value="avatar">{dict.Avatars}</option>
                        </select>
                    </div>
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
                    <div>
                        <select
                            className={cx('changeMode')}
                            id="view-mode"
                            value={selectedMode}
                            onChange={(e) => handleChangeMode(e)}
                        >
                            <option value="image">{dict.Uploads}</option>
                            <option value="avatar">{dict.Avatars}</option>
                        </select>
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

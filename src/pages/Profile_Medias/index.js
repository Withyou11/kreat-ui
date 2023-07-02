import { useState, useEffect } from 'react';
import ProfileHeader from '~/components/ProfileHeader';
import styles from './Profile_Medias.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'cloudinary-react';
import axios from 'axios';
function Profile_Medias() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [listImage, setListImage] = useState([]);
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
        axios
            .get(`http://localhost:3000/accounts/${id}/visual_media`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setListImage(res.data.listURL);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const handleClose = () => {
        setSelectedImage(null);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ProfileHeader />
            {!loading ? (
                <>
                    <div>
                        <select
                            className={cx('changeMode')}
                            id="view-mode"
                            value={selectedMode}
                            onChange={(e) => handleChangeMode(e)}
                        >
                            <option value="image">Uploads</option>
                            <option value="avatar">Avatars</option>
                        </select>
                    </div>

                    <div className={cx('wrapper')}>
                        <div className={cx('image-container')}>
                            {listImage.map((image, index) => {
                                if (image.url.visualType === selectedMode) {
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
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </>
            ) : (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
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

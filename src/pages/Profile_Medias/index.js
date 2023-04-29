import { useState } from 'react';
import ProfileHeader from '~/components/ProfileHeader';
import styles from './Profile_Medias.module.scss';
import classNames from 'classnames/bind';
import listImage from '~/StaticData/ListImage';
function Profile_Medias() {
    const [selectedImage, setSelectedImage] = useState(null);
    const cx = classNames.bind(styles);
    const handleClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        setSelectedImage(null);
    };
    return (
        <>
            <ProfileHeader />
            <div className={cx('wrapper')}>
                {listImage.map((image) => (
                    <div key={image.id} className={cx('image-item')}>
                        <img
                            className={cx('image')}
                            src={image.url}
                            alt="media"
                            onClick={() => handleClick(image.url)}
                        />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div className={cx('overlay')} onClick={handleClose}>
                    <img className={cx('overlay-image')} src={selectedImage} alt="selected media" />
                </div>
            )}
        </>
    );
}

export default Profile_Medias;

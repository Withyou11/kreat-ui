import { useState, useEffect } from 'react';
import ProfileHeader from '~/components/ProfileHeader';
import styles from './Profile_Medias.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'cloudinary-react';
import axios from 'axios';
function Profile_Medias() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [data, setData] = useState({});
    const [listImage, setListImage] = useState([]);
    const cx = classNames.bind(styles);
    const handleClick = (image) => {
        setSelectedImage(image);
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
                console.log(res.data.listURL);
                setData(res.data);
                setListImage(res.data.listURL);
            })
            .catch(() => {});
    }, []);

    const handleClose = () => {
        setSelectedImage(null);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ProfileHeader data={data} />
            <div className={cx('wrapper')}>
                {listImage.map((image, index) => (
                    <div key={index} className={cx('image-item')}>
                        <Image
                            className={cx('image')}
                            cloudName="dzuzcewvj"
                            publicId={image.url.visualUrl}
                            crop="scale"
                            onClick={() => handleClick(image.url.visualUrl)}
                        />
                    </div>
                ))}
            </div>
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

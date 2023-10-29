import styles from './ThreeMedia.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Image } from 'cloudinary-react';
import OverlayImage from '../OverlayImage';

function ThreeMedia({ data }) {
    const cx = classNames.bind(styles);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const handleSelectImage = (imageIndex) => {
        setSelectedImageIndex(imageIndex);
    };

    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('image')}
                cloudName="dzuzcewvj"
                publicId={data[0].url}
                onClick={() => handleSelectImage(0)}
            />
            <div className={cx('remaining')}>
                <Image
                    className={cx('image1')}
                    cloudName="dzuzcewvj"
                    publicId={data[1].url}
                    onClick={() => handleSelectImage(1)}
                />
                <Image
                    className={cx('image1')}
                    cloudName="dzuzcewvj"
                    publicId={data[2].url}
                    onClick={() => handleSelectImage(2)}
                />
            </div>
            {selectedImageIndex !== null && (
                <OverlayImage
                    data={data}
                    selectedImageIndex={selectedImageIndex}
                    setSelectedImageIndex={setSelectedImageIndex}
                ></OverlayImage>
            )}
        </div>
    );
}

export default ThreeMedia;

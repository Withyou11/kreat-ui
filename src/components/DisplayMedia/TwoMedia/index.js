import styles from './TwoMedia.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Image } from 'cloudinary-react';
import OverlayImage from '../OverlayImage';

function TwoMedia({ data }) {
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
            <Image
                className={cx('image')}
                cloudName="dzuzcewvj"
                publicId={data[1].url}
                onClick={() => handleSelectImage(1)}
            />
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

export default TwoMedia;

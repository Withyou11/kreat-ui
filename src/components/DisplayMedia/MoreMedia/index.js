import styles from './MoreMedia.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Image } from 'cloudinary-react';
import OverlayImage from '../OverlayImage';

function MoreMedia({ data }) {
    const cx = classNames.bind(styles);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const handleSelectImage = (imageIndex) => {
        setSelectedImageIndex(imageIndex);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('column')}>
                <Image
                    className={cx('image')}
                    cloudName="dzuzcewvj"
                    publicId={data[0].url}
                    onClick={() => handleSelectImage(0)}
                />
                <Image
                    className={cx('image')}
                    cloudName="dzuzcewvj"
                    publicId={data[2].url}
                    onClick={() => handleSelectImage(2)}
                />
            </div>
            <div className={cx('column')}>
                <Image
                    className={cx('image')}
                    cloudName="dzuzcewvj"
                    publicId={data[1].url}
                    onClick={() => handleSelectImage(1)}
                />
                <div className={cx('specialImage')}>
                    <p className={cx('number')}>+ {data.length - 4}</p>
                    <Image
                        className={cx('image1')}
                        cloudName="dzuzcewvj"
                        publicId={data[3].url}
                        onClick={() => handleSelectImage(3)}
                    />
                </div>
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

export default MoreMedia;

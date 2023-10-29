import styles from './OverlayImage.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { Image } from 'cloudinary-react';
import Button from '~/components/Button';
import { faChevronCircleLeft, faChevronCircleRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function OverlayImage({ data, selectedImageIndex, setSelectedImageIndex }) {
    const cx = classNames.bind(styles);

    const goToPrevImage = (e) => {
        e.stopPropagation();
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        } else {
            setSelectedImageIndex(data.length - 1);
        }
    };

    const goToNextImage = (e) => {
        e.stopPropagation();
        if (selectedImageIndex < data.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        } else setSelectedImageIndex(0);
    };

    const keyGotoPrev = (e) => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        } else {
            setSelectedImageIndex(data.length - 1);
        }
    };

    const keyGotoNext = (e) => {
        if (selectedImageIndex < data.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        } else setSelectedImageIndex(0);
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            keyGotoPrev();
        } else if (event.key === 'ArrowRight') {
            keyGotoNext();
        } else if (event.key === 'Escape') {
            handleCloseImage();
        }
    });

    const handleCloseImage = () => {
        setSelectedImageIndex(null);
    };
    return (
        <div className={cx('overlay')} onClick={handleCloseImage}>
            <Button
                leftIcon={<FontAwesomeIcon icon={faChevronCircleLeft} />}
                smallest
                onClick={goToPrevImage}
                className={cx('prev-button')}
            ></Button>
            <Image
                className={cx('overlay-image')}
                cloudName="dzuzcewvj"
                publicId={data[selectedImageIndex].url}
                crop="scale"
                alt="selected media"
            />
            <p className={cx('process')}>
                {selectedImageIndex + 1} / {data.length}
            </p>
            <Button
                leftIcon={<FontAwesomeIcon icon={faChevronCircleRight} />}
                smallest
                onClick={goToNextImage}
                className={cx('next-button')}
            ></Button>
        </div>
    );
}

export default OverlayImage;

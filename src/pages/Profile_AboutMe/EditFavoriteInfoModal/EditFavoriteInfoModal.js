import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

import styles from './EditFavoriteInfoModal.module.scss';

const cx = classNames.bind(styles);

function EditFavoriteInfoModal({ onClose, favoriteInfo, onSave }) {
    // console.log(favoriteInfo);
    const [data, setData] = useState(favoriteInfo);
    const handleChange = (event, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: event.target.value,
        }));
    };

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose} animation={false} centered>
            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>Update your favorite:</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <form>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="hobbies">
                            Hobbies:
                        </label>
                        <textarea
                            id="hobbies"
                            value={data.hobbies}
                            onChange={(event) => handleChange(event, 'hobbies')}
                            className={cx('form-control1')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteMusicBands">
                            Favourite Music Bands / Artists:
                        </label>
                        <input
                            type="text"
                            id="favoriteMusicBands"
                            value={data.favoriteMusicBands}
                            onChange={(event) => handleChange(event, 'favoriteMusicBands')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteTVShows">
                            Favourite TV Shows:
                        </label>
                        <input
                            type="text"
                            id="favoriteTVShows"
                            value={data.favoriteTVShows}
                            onChange={(event) => handleChange(event, 'favoriteTVShows')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteBooks">
                            Favourite Books:
                        </label>
                        <input
                            type="text"
                            id="favoriteBooks"
                            value={data.favoriteBooks}
                            onChange={(event) => handleChange(event, 'favoriteBooks')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteMovies">
                            Favourite Movies:
                        </label>
                        <input
                            type="text"
                            id="favoriteMovies"
                            value={data.favoriteMovies}
                            onChange={(event) => handleChange(event, 'favoriteMovies')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteSports">
                            Favourite Sports:
                        </label>
                        <input
                            type="text"
                            id="favoriteSports"
                            value={data.favoriteSports}
                            onChange={(event) => handleChange(event, 'favoriteSports')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="favoriteGames">
                            Favourite Games:
                        </label>
                        <input
                            type="text"
                            id="favoriteGames"
                            value={data.favoriteGames}
                            onChange={(event) => handleChange(event, 'favoriteGames')}
                            className={cx('form-control')}
                        />
                    </div>
                </form>

                <button className={cx('buttonDone')} onClick={handleSave}>
                    Update
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default EditFavoriteInfoModal;

import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

import styles from './EditFavoriteInfoModal.module.scss';

function EditFavoriteInfoModal({ onClose, favoriteInfo, onSave }) {
    const cx = classNames.bind(styles);
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
        <Modal style={{ marginLeft: '-6.8%' }} show={true} onHide={onClose} animation={false}>
            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>{dict.Update_your_favorite}</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <form>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="hobbies">
                            {dict.Hobbies}
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
                            {dict.Favourite_Music_Bands}
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
                            {dict.Favourite_TV_Shows}
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
                            {dict.Favourite_Books}
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
                            {dict.Favourite_Books}
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
                            {dict.Favourite_Sports}
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
                            {dict.Favourite_Games}
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
                    {dict.Update}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default EditFavoriteInfoModal;

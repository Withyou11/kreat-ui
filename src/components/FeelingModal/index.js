import styles from './FeelingModal.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function FeelingModal({ onClose, visible, handleFeelingChange }) {
    const feelingsList = [
        'Happy',
        'Upset',
        'Excited',
        'Disappointed',
        'Surprised',
        'Emotional',
        'Optimistic',
        'Skeptical',
        'Glad',
        'Amazed',
        'Regretful',
    ];
    const [selectedFeeling, setSelectedFeeling] = useState('');
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

    const handleCompleteFeeling = (event) => {
        event.preventDefault();
        onClose();
    };

    const handleFeelingClick = (feeling) => {
        setSelectedFeeling(feeling);
    };

    function handleClose() {
        setSelectedFeeling('');
        onClose();
    }
    useEffect(() => {
        handleFeelingChange(selectedFeeling);
        // eslint-disable-next-line
    }, [selectedFeeling]);

    return (
        <Modal show={visible} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <h3 className={cx('search-title')}>
                    {dict.Feeling} {selectedFeeling || ''}
                </h3>
                <button className={cx('delete-image-button')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                </button>
                <div className={cx('feelingContainer')}>
                    {feelingsList.map((feeling, index) => (
                        <button className={cx('feeling')} key={index} onClick={() => handleFeelingClick(feeling)}>
                            {feeling}
                        </button>
                    ))}
                </div>
                <button className={cx('buttonDone')} onClick={(event) => handleCompleteFeeling(event)}>
                    {dict.Done}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default FeelingModal;

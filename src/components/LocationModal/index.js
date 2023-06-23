import styles from './LocationModal.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDebounce } from '~/hooks';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ListLocation from '../ListLocation';
import Modal from 'react-bootstrap/Modal';

function LocationModal({ onClose, visible, handleAtLocationChange }) {
    const APIKey = 'kreat';
    const cx = classNames.bind(styles);
    const inputRef = useRef();

    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const debouncedValue = useDebounce(searchText, 600);
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchText(e.target.value);
        }
    };
    const handleCompleteLocation = (event) => {
        event.preventDefault();

        onClose();
    };
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResults([]);
            return;
        }
        axios
            .get(`http://api.geonames.org/searchJSON?q=${debouncedValue}&maxRows=10&username=${APIKey}`)
            .then((res) => {
                setSearchResults(res.data.geonames);
            })
            .catch(() => {});
    }, [debouncedValue]);
    function handleClose() {
        onClose();
    }
    useEffect(() => {
        handleAtLocationChange(selectedLocation);
    }, [selectedLocation]);
    return (
        <Modal show={visible} onHide={handleClose} animation={false}>
            <Modal.Body>
                <h3 className={cx('search-title')}>Location: {selectedLocation || ''}</h3>
                <button className={cx('delete-image-button')} onClick={handleClose}>
                    <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                </button>
                <Tippy
                    placement="bottom"
                    interactive
                    visible={true}
                    render={(attr) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attr}>
                            <ListLocation data={searchResults} select={setSelectedLocation} />
                        </div>
                    )}
                    onClickOutside={onClose}
                >
                    <div className={cx('search')}>
                        <input
                            className={cx('input')}
                            ref={inputRef}
                            value={searchText}
                            placeholder="Enter location..."
                            spellCheck="false"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </Tippy>
                <button className={cx('buttonDone')} onClick={(event) => handleCompleteLocation(event)}>
                    Done
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default LocationModal;

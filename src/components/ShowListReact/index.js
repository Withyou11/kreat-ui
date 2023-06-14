import { useEffect, useState } from 'react';
import styles from './ShowListReact.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '../AccountItem';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ShowListReact({ data, visible, onClose }) {
    const [listReact, setListReact] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/${data}/get_all_reaction`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setListReact(res.data.listReaction);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const cx = classNames.bind(styles);
    function handleClose() {
        onClose();
    }
    return (
        <Modal show={visible} onHide={handleClose} animation={false}>
            <Modal.Body>
                <div className={cx('header')}>
                    <Button
                        className={cx('close-button')}
                        leftIcon={<FontAwesomeIcon icon={faTimes} />}
                        smallest
                        onClick={handleClose}
                    ></Button>
                </div>
                {listReact.map((account) => (
                    <div key={Math.random()}>
                        <AccountItem data={account} mutualFriends={account.mutualFriends}></AccountItem>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default ShowListReact;

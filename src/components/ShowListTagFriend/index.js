import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ShowListTagFriend.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '../AccountItem';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
function ShowListTagFriend({ data, visible, onClose }) {
    const cx = classNames.bind(styles);
    const [listFriend, setListFriend] = useState([]);
    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/posts/${data}/get_all_tagged_friend`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setListFriend(res.data.listTaggedFriend);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    function handleClose() {
        onClose(false);
    }

    return (
        <Modal show={visible} onHide={handleClose} animation={false} centered>
            <Modal.Body>
                <div className={cx('header')}>
                    <Button
                        className={cx('close-button')}
                        leftIcon={<FontAwesomeIcon icon={faTimes} />}
                        smallest
                        onClick={handleClose}
                    ></Button>
                </div>
                {listFriend.map((account, index) => (
                    <div key={index}>
                        <AccountItem data={account.personalInfo} mutualFriends={account.mutualFriends}></AccountItem>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default ShowListTagFriend;

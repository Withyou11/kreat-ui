import styles from './ShowListTagFriend.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '../AccountItem';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
function ShowListTagFriend({ data, visible, onClose }) {
    const cx = classNames.bind(styles);
    function handleClose() {
        onClose(false);
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
                {data.map((account) => (
                    <div key={Math.random()}>
                        <AccountItem data={account}></AccountItem>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
    );
}

export default ShowListTagFriend;

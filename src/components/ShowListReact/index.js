import styles from './ShowListReact.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccountItem from '../AccountItem';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function ShowListReact({ data, visible, onClose }) {
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
                {data.map((account) => (
                    <div key={Math.random()}>
                        <AccountItem data={account} react={account.reactType}></AccountItem>
                    </div>
                ))}
            </Modal.Body>
        </Modal>
        // <div className={cx('wrapper')}>
        //     <div className={cx('header')}>
        //         <Button
        //             className={cx('close-button')}
        //             leftIcon={<FontAwesomeIcon icon={faTimes} />}
        //             smallest
        //             onClick={handleClose}
        //         ></Button>
        //     </div>
        // {data.map((account) => (
        //     <div key={Math.random()}>
        //         <AccountItem data={account} react={account.reactType}></AccountItem>
        //     </div>
        // ))}
        // </div>
    );
}

export default ShowListReact;

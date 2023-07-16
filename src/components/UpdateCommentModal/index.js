import styles from './UpdateCommentModal.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UpdateCommentModal({ data, onClose, visible, setComments, comments }) {
    const cx = classNames.bind(styles);
    const [content, setContent] = useState(data.commentContent);

    const handleUpdate = (event) => {
        event.preventDefault();
        const commentData = {
            _id: data._id,
            commentContent: content,
            avatar: data.avatar,
            fullName: data.fullName,
            id_account: data.id_account,
            listReaction: data.listReaction,
            createdAt: data.createdAt,
        };
        axios
            .patch('http://localhost:3000/accounts/update_comment_post', commentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                const updatedComment = commentData;
                const postIndex = comments.findIndex((comment) => comment._id === data._id);
                if (postIndex !== -1) {
                    setComments((prevList) => {
                        const newList = [...prevList];
                        newList[postIndex] = updatedComment;
                        return newList;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        onClose();
    };

    function handleClose() {
        onClose();
    }

    function handleChange(e) {
        setContent(e.target.value);
    }

    return (
        <Modal style={{ marginLeft: '-6.8%' }} show={true} onHide={handleClose} animation={false}>
            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>Update your comment:</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <textarea
                    type="text"
                    id="fullName"
                    value={content}
                    onChange={(e) => handleChange(e)}
                    className={cx('textarea')}
                />
                <button className={cx('buttonDone')} onClick={(event) => handleUpdate(event)}>
                    Update
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateCommentModal;

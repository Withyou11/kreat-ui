import styles from './UpdateCommentModal.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useState } from 'react';
import { faCamera, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'cloudinary-react';

function UpdateCommentModal({ data, onClose, visible, setComments, comments }) {
    console.log(comments);
    const cx = classNames.bind(styles);
    const [content, setContent] = useState(data.commentContent);
    const [chosenImage, setChosenImage] = useState();

    const handleChangeImage = (e) => {
        e.preventDefault();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            setChosenImage(file);
        });
        fileInput.click();
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        const promises = [];
        let visualData = [];
        if (chosenImage) {
            const file = chosenImage;
            const reader = new FileReader();
            const promise = new Promise((resolve, reject) => {
                reader.onload = function (event) {
                    const base64Data = event.target.result;
                    resolve(base64Data);
                };
                reader.onerror = function (error) {
                    reject(error);
                };
            });
            reader.readAsDataURL(file);
            promises.push(promise);
        }

        Promise.all(promises)
            .then((base64DataArray) => {
                const visualList = {
                    data: base64DataArray,
                };
                // eslint-disable-next-line
                visualList.data.map((visual) => {
                    visualData.push({ type: 'image', data: visual });
                });
                const commentData = visualData[0]?.data
                    ? {
                          _id: data._id,
                          commentContent: content,
                          commentImage: visualData[0]?.data,
                          avatar: data.avatar,
                          fullName: data.fullName,
                          id_account: data.id_account,
                          listReaction: data.listReaction,
                          createdAt: data.createdAt,
                      }
                    : {
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
                        console.log(res);
                        onClose();

                        const updatedComment = {
                            _id: res.data.comment._id,
                            commentContent: res.data.comment.commentContent,
                            commentImage: res.data.comment.commentImage,
                            avatar: res.data.comment.avatar,
                            fullName: res.data.comment.fullName,
                            id_account: res.data.comment.id_account,
                            listReaction: res.data.comment.listReaction,
                            createdAt: res.data.comment.createdAt,
                        };
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
            })
            .catch((error) => {
                console.error(error);
            });
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
                <div className={cx('imageContainer')}>
                    {data.commentImage && !chosenImage && (
                        <Image className={cx('image')} cloudName="dzuzcewvj" publicId={data.commentImage} />
                    )}
                    {!data.commentImage && !chosenImage && (
                        <p style={{ margin: '10px auto' }}>You haven't selected any photos yet</p>
                    )}
                    {chosenImage && (
                        <img className={cx('image')} src={URL.createObjectURL(chosenImage)} alt="comment" />
                    )}
                    <button className={cx('chooseImageBtn')} onClick={handleChangeImage}>
                        <FontAwesomeIcon
                            icon={faCamera}
                            style={{ backgroundColor: 'transparent', fontSize: '30px', padding: '10px' }}
                        ></FontAwesomeIcon>
                    </button>
                </div>
                <button className={cx('buttonDone')} onClick={(event) => handleUpdate(event)}>
                    Update
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateCommentModal;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ListComments.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from '../Comment';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faImage } from '@fortawesome/free-regular-svg-icons';

function ListComments({ id_post }) {
    const cx = classNames.bind(styles);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const handleMediaDelete = (media) => {
        setSelectedImage('');
        URL.revokeObjectURL(media.preview);
    };

    const addImage = (e) => {
        e.preventDefault();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Chấp nhận tệp hình ảnh
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            setSelectedImage(file);
        });
        fileInput.click();
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/posts/${id_post}/get_all_comment`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setComments(res.data.listComment);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id_post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const promises = [];
        let visualData = [];
        if (selectedImage) {
            const file = selectedImage; // Lấy tệp hình ảnh đã chọn
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
                const body = {
                    id_post: id_post,
                    commentContent: newComment,
                    commentImage: visualData[0]?.data,
                };

                axios
                    .post('http://localhost:3000/accounts/comment_post', body, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    })
                    .then((res) => {
                        setComments([res.data.newComment, ...comments]);
                        setNewComment('');
                        setSelectedImage('');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });

        // axios
        //     .post(`http://localhost:3000/accounts/comment_post`, body, {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        //         },
        //     })
        //     .then((res) => {
        //         setComments([res.data.newComment, ...comments]);
        //         setNewComment('');
        //         setSelectedImage('');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-comment')}>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <Comment data={comment} comments={comments} setComments={setComments}></Comment>
                    </div>
                ))}
            </div>
            <div className={cx('comment-input-bar')}>
                <form className={cx('form')} onSubmit={handleSubmit}>
                    <div className={cx('comment-content')}>
                        <input
                            className={cx('input')}
                            type="text"
                            placeholder="Write your comment here..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        {selectedImage && (
                            <div className={cx('image-container')}>
                                <div className={cx('post-image')} key={selectedImage.name}>
                                    <img
                                        id="preview"
                                        key={selectedImage.name}
                                        src={URL.createObjectURL(selectedImage)}
                                        alt={selectedImage.name}
                                    />
                                    <button
                                        className={cx('delete-image-button')}
                                        onClick={() => handleMediaDelete(selectedImage)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx('delete-user-icon')}
                                            icon={faTimes}
                                        ></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={addImage} type="button">
                        <FontAwesomeIcon
                            icon={faImage}
                            className={cx('add-user-icon')}
                            style={{ color: 'green' }}
                        ></FontAwesomeIcon>
                    </button>
                    <button className={cx('submit')} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ListComments;

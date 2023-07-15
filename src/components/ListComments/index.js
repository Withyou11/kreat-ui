import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ListComments.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Comment from '../Comment';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ListComments({ id_post }) {
    const cx = classNames.bind(styles);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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
        const body = {
            id_post: id_post,
            commentContent: newComment,
        };

        axios
            .post(`http://localhost:3000/accounts/comment_post`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setComments([res.data.newComment, ...comments]);
                setNewComment('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-comment')}>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <Comment data={comment} setComments={setComments}></Comment>
                    </div>
                ))}
            </div>
            <div className={cx('comment-input-bar')}>
                <form onSubmit={handleSubmit}>
                    <input
                        className={cx('input')}
                        type="text"
                        placeholder="Write your comment here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className={cx('submit')} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ListComments;

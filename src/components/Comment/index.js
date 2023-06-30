import styles from './Comment.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import generateReactionList from '../General/generateReactionList';
import reactIcons from '../General/reactIcons';
import ShowListReact from '../ShowListReact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUp1 } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';
import { Image } from 'cloudinary-react';
import axios from 'axios';

function Comment({ data }) {
    function handleChooseReaction() {}
    function handleCancelReaction() {}
    const [isReactModalOpen, setIsReactModalOpen] = useState(false);
    const handleReactButtonClick = (event) => {
        setIsReactModalOpen(true);
    };
    function handleCloseReactList() {
        setIsReactModalOpen(false);
    }

    const [reactionList, setReactionList] = useState(data.listReaction);

    const [reactionAmount, setReactionAmout] = useState([]);
    const currentUser = localStorage.getItem('accountId');

    const [totalReactions, setTotalReactions] = useState(0);
    const [topReactions, setTopReactions] = useState([]);
    useEffect(() => {
        generateReactionList(setReactionAmout, reactionList);
    }, [reactionList]);
    useEffect(() => {
        const newTotalReactions = reactionAmount.reduce((total, reaction) => total + reaction.count, 0);
        setTotalReactions(newTotalReactions);

        const newTopReactions = reactionAmount
            .filter((reaction) => reaction.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 3);
        setTopReactions(newTopReactions);
    }, [reactionAmount]);
    const renderIcon = (item) => {
        return reactIcons.get(item.type);
    };
    const handleIncreaseItems = (reaction) => {
        let id = localStorage.getItem('accountId');
        let newItem = {
            _id: data.listReaction[0]?._id,
            id_account: id,
            reactType: reaction,
        };
        const index = reactionList.findIndex((item) => item.id_account === id);
        if (index !== -1) {
            handleRemoveItem();
        }
        setReactionList((prevItems) => [...prevItems, newItem]);
    };

    const cx = classNames.bind(styles);
    const [currentUserReact, setCurrentUserReact] = useState('');
    function checkCurrentUserReact(currentUser) {
        let foundReact = false;

        reactionList?.forEach((userReact) => {
            if (userReact.id_account === currentUser) {
                setCurrentUserReact(userReact.reactType);
                foundReact = true;
            }
        });

        return foundReact;
    }
    const handleRemoveItem = () => {
        setReactionList((prevItems) =>
            prevItems.filter((item) => item.id_account !== localStorage.getItem('accountId')),
        );
    };

    function handleCancelReaction() {
        // call API cancel here
        handleRemoveItem();
        setCurrentUserReact('');
        axios
            .delete(`http://localhost:3000/accounts/${data._id}/unreact_comment`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });
    }
    function handleChooseReaction(reaction) {
        handleIncreaseItems(reaction);
        if (checkCurrentUserReact(currentUser)) {
            const body = {
                id_comment: data._id,
                reactType: reaction,
            };
            axios
                .patch(`http://localhost:3000/accounts/update_react`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                });
        } else {
            const body = {
                id_comment: data._id,
                reactType: reaction,
            };
            axios
                .post(`http://localhost:3000/accounts/react`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                });
        }
        setCurrentUserReact(reaction);
    }

    useEffect(() => {
        checkCurrentUserReact(currentUser);
        // eslint-disable-next-line
    }, []);

    return (
        <div className={cx('comment-container')}>
            <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" alt="avatar" />
            <div className={cx('comment-main')}>
                <div className={cx('comment-info-main')}>
                    <h4 className={cx('name')}>{data.fullName}</h4>
                    {/* <p className={cx('time')}>{data.datetime}</p> */}
                </div>
                <div className={cx('comment-content')}>{data.commentContent}</div>
                <div className={cx('react-button')}>
                    <div className={cx('hover-reaction')}>
                        <Button
                            className={cx('btn-like')}
                            leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                            smallest
                            onClick={() => handleChooseReaction('like')}
                        ></Button>
                        <Button
                            className={cx('btn-love')}
                            leftIcon={<FontAwesomeIcon icon={faHeart} />}
                            smallest
                            onClick={() => handleChooseReaction('love')}
                        ></Button>
                        <Button
                            haha
                            smallest
                            className={cx('btn-haha')}
                            onClick={() => handleChooseReaction('haha')}
                        ></Button>
                        <Button
                            wow
                            smallest
                            className={cx('btn-haha')}
                            onClick={() => handleChooseReaction('wow')}
                        ></Button>
                        <Button
                            sad
                            smallest
                            className={cx('btn-haha')}
                            onClick={() => handleChooseReaction('sad')}
                        ></Button>
                        <Button
                            angry
                            smallest
                            className={cx('btn-haha')}
                            onClick={() => handleChooseReaction('angry')}
                        ></Button>
                    </div>
                    {currentUserReact === '' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('like-button')}
                                leftIcon={<FontAwesomeIcon icon={faThumbsUp1} />}
                                outline
                                smallest
                                onClick={() => handleChooseReaction('like')}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'like' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('liked-button')}
                                leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'love' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('loved-button')}
                                leftIcon={<FontAwesomeIcon icon={faHeart} />}
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'haha' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('haha-button')}
                                haha
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'wow' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('haha-button')}
                                wow
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'sad' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('haha-button')}
                                sad
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                    {currentUserReact === 'angry' && (
                        <div className={cx('action-button')}>
                            <Button
                                className={cx('angry-button')}
                                angry
                                outline
                                smallest
                                onClick={handleCancelReaction}
                            ></Button>
                        </div>
                    )}
                </div>
                <div className={cx('list-reaction')} onClick={(e) => handleReactButtonClick(e)}>
                    {topReactions.map((reaction) => {
                        return renderIcon(reaction);
                    })}
                    {totalReactions > 0 && (
                        <span style={{ margin: '-2px 8px', fontSize: '1.8rem' }}>{totalReactions}</span>
                    )}
                </div>
            </div>
            {isReactModalOpen && (
                <ShowListReact
                    data={data.comment._id}
                    visible={isReactModalOpen}
                    onClose={handleCloseReactList}
                ></ShowListReact>
            )}
        </div>
    );
}

export default Comment;

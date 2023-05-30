import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import ListComments from '../ListComments';
import ShowListTagFriend from '../ShowListTagFriend';
import reactIcons from '../General/reactIcons';
import generateReactionList from '../General/generateReactionList';
import { Carousel } from 'react-bootstrap';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import axios from 'axios';
import { faHeart, faThumbsUp, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faComment, faShareFromSquare, faThumbsUp as faThumbsUp1 } from '@fortawesome/free-regular-svg-icons';
import ShowListReact from '../ShowListReact';

function Post({ data }) {
    const cx = classNames.bind(styles);
    const reactionList = data.listReaction;
    const currentUser = 'Dan Cortese';
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isReactModalOpen, setIsReactModalOpen] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);

    const handleCommentClick = (id) => {
        axios
            .get(`http://localhost:3000/posts/${id}/get_all_comment`)
            .then((res) => {
                setComments(res.data.listComment);
            })
            .catch((error) => {
                console.log(error);
            });
        setShowComment(true);
    };
    function handleCloseReactList() {
        setIsReactModalOpen(false);
    }
    const [currentUserReact, setCurrentUserReact] = useState('');
    function checkCurrentUserReact(currentUser) {
        // data.listReaction.forEach((userReact) => {
        //     if (userReact.fullName === currentUser) {
        //         setCurrentUserReact(userReact.reactType);
        //         return;
        //     }
        // });
    }

    const handleTagButtonClick = (event) => {
        event.preventDefault();
        setIsTagModalOpen(true);
    };

    const handleReactButtonClick = (event) => {
        event.preventDefault();
        setIsReactModalOpen(true);
    };
    let reactionAmount = [];
    generateReactionList(reactionAmount, reactionList);

    var totalReactions = reactionAmount.reduce((total, reaction) => total + reaction.count, 0);
    var topReactions = reactionAmount
        .filter((reaction) => reaction.count > 0) // Lọc các cảm xúc có count > 0
        .sort((a, b) => b.count - a.count) // Sắp xếp các cảm xúc theo count giảm dần
        .slice(0, 3); // Lấy ra 3 cảm xúc đầu tiên
    const renderIcon = (item) => {
        return reactIcons.get(item.type);
    };

    function handleCancelReaction() {
        // call API cancel here
        setCurrentUserReact('');
    }

    function handleChooseReaction(reaction) {
        // call API add/update react here
        setCurrentUserReact(reaction);
    }

    useEffect(() => {
        checkCurrentUserReact(currentUser);
        // eslint-disable-next-line
    }, [currentUser, data.listIdAccountReact]);

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('post-info')}>
                    <img className={cx('avatar')} src={data.post.avatar} alt="avatar" />
                    <div className={cx('post-info-main')}>
                        <h4 className={cx('name')}>{data.post.fullName}</h4>
                        <div className={cx('time-location')}>
                            <p className={cx('time')}>{data.createdAt}</p>
                            <FontAwesomeIcon className={cx('privacy')} icon={faUserGroup}></FontAwesomeIcon>
                            <p className={cx('location')}>{data.post.location}</p>
                        </div>
                    </div>
                    {data.post.id_friendTag.length > 0 && (
                        <div className={cx('friend')} onClick={(e) => handleTagButtonClick(e)}>
                            <p className={cx('friend-number')}>{data.post.id_friendTag.length} people</p>
                        </div>
                    )}
                </div>

                <div className={cx('post-content')}>
                    <div className={cx('post-content-text')}>
                        <p className={cx('post-text')}>{data.post.postContent}</p>
                    </div>
                    <div className={cx('post-content-image')}>
                        {data.post.id_visualMedia.length > 1 && (
                            <Carousel>
                                {data.post.id_visualMedia.map((image) => (
                                    <Carousel.Item key={image}>
                                        <img className={cx('image')} src={image} alt={`Post`} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        {data.post.id_visualMedia.length === 1 && (
                            <img className={cx('image')} src={data.image} alt={`Post`} />
                        )}
                    </div>
                </div>
                {data.shareId && (
                    <div className={cx('share-content')}>
                        <div className={cx('post-content')}>
                            <div className={cx('post-content-image')} style={{ marginTop: '12px', width: '95%' }}>
                                {data.shareContent.image.length > 1 && (
                                    <Carousel>
                                        {data.shareContent.image.map((image) => (
                                            <Carousel.Item key={image}>
                                                <img className={cx('image')} src={image} alt={`Post`} />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                )}
                                {data.shareContent.image.length === 1 && (
                                    <img className={cx('image')} src={data.shareContent.image} alt={`Post`} />
                                )}
                            </div>
                            <div className={cx('post-info')}>
                                <img className={cx('avatar')} src={data.shareContent.avatar} alt="avatar" />
                                <div className={cx('post-info-main')}>
                                    <h4 className={cx('name')}>{data.shareContent.nameAccount}</h4>
                                    <div className={cx('time-location')}>
                                        <p className={cx('time')}>{data.shareContent.dateTime.slice(0, 10)}</p>
                                        <FontAwesomeIcon className={cx('privacy')} icon={faUserGroup}></FontAwesomeIcon>
                                        <p className={cx('location')}>{data.shareContent.location}</p>
                                    </div>
                                </div>
                                {data.shareContent.nameFriendTag.length > 0 && (
                                    <div className={cx('friend')} onClick={(e) => handleTagButtonClick(e)}>
                                        <p className={cx('friend-number')}>
                                            {data.shareContent.nameFriendTag.length} people
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={cx('post-content-text')}>
                                <p className={cx('post-text')}>{data.shareContent.postText}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className={cx('interaction-number')}>
                    <div className={cx('react-number')} onClick={(e) => handleReactButtonClick(e)}>
                        {topReactions.map((reaction) => {
                            return renderIcon(reaction);
                        })}
                        <p
                            style={{
                                display: 'inline-block',
                                fontSize: '2rem',
                                marginLeft: '12px',
                                paddingBottom: '4px',
                                lineHeight: '3rem',
                                opacity: '0.7',
                            }}
                        >
                            {totalReactions}
                        </p>
                    </div>
                    <div className={cx('comment-number')}>
                        <p>{data.amountComment} comments</p>
                    </div>
                </div>
                <div className={cx('action-buttons')}>
                    <div className={cx('react-btn')}>
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
                                    large
                                    onClick={() => handleChooseReaction('like')}
                                >
                                    Like
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'like' && (
                            <div className={cx('action-button')}>
                                <Button
                                    className={cx('liked-button')}
                                    leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                                    outline
                                    large
                                    onClick={handleCancelReaction}
                                >
                                    Like
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'love' && (
                            <div className={cx('action-button')}>
                                <Button
                                    className={cx('loved-button')}
                                    leftIcon={<FontAwesomeIcon icon={faHeart} />}
                                    outline
                                    large
                                    onClick={handleCancelReaction}
                                >
                                    Love
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'haha' && (
                            <div className={cx('action-button')}>
                                <Button className={cx('haha-button')} haha outline large onClick={handleCancelReaction}>
                                    Haha
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'wow' && (
                            <div className={cx('action-button')}>
                                <Button className={cx('haha-button')} wow outline large onClick={handleCancelReaction}>
                                    Wow
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'sad' && (
                            <div className={cx('action-button')}>
                                <Button className={cx('haha-button')} sad outline large onClick={handleCancelReaction}>
                                    Sad
                                </Button>
                            </div>
                        )}
                        {currentUserReact === 'angry' && (
                            <div className={cx('action-button')}>
                                <Button
                                    className={cx('angry-button')}
                                    angry
                                    outline
                                    large
                                    onClick={handleCancelReaction}
                                >
                                    Angry
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className={cx('action-button')}>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faComment} />}
                            outline
                            large
                            onClick={() => handleCommentClick(data.post._id)}
                        >
                            Comment
                        </Button>
                    </div>
                    <div className={cx('action-button')}>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faShareFromSquare} />}
                            outline
                            large
                            onClick={() => {
                                alert('clicked');
                            }}
                        >
                            Share
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
            {showComment && <ListComments data={comments}></ListComments>}
            {isTagModalOpen && (
                <ShowListTagFriend
                    data={data.post.id_friendTag}
                    visible={isTagModalOpen}
                    onClose={setIsTagModalOpen}
                ></ShowListTagFriend>
            )}
            {isReactModalOpen && (
                <ShowListReact
                    data={data.listIdAccountReact}
                    visible={isReactModalOpen}
                    onClose={handleCloseReactList}
                ></ShowListReact>
            )}
        </div>
    );
}

export default Post;

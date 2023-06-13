import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { Image } from 'cloudinary-react';
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
import { faHeart, faThumbsUp, faUserGroup, faEarthAmericas, faLock } from '@fortawesome/free-solid-svg-icons';
import { faComment, faShareFromSquare, faThumbsUp as faThumbsUp1 } from '@fortawesome/free-regular-svg-icons';
import ShowListReact from '../ShowListReact';
import { useNavigate } from 'react-router-dom';
import RenderUserReact from '../RenderUserReact/RenderUserReact';
import ShareModal from '../ShareModal';
function Post({ data }) {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const [reactionList, setReactionList] = useState(data.listReaction);
    const currentUser = localStorage.getItem('accountId');
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isReactModalOpen, setIsReactModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [comments, setComments] = useState([]);

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const diff = (now.getTime() - date.getTime()) / 1000; // Đổi thành giây

        if (diff < 60) {
            // Dưới 1 phút
            return `${Math.floor(diff)} seconds ago`;
        } else if (diff < 60 * 60) {
            // Dưới 1 giờ
            if (diff < 120) return `1 minute ago`;
            else {
                return `${Math.floor(diff / 60)} minutes ago`;
            }
        } else if (diff < 24 * 60 * 60) {
            if (diff < 60 * 60 * 2) return `1 hour ago`;
            // Dưới 1 ngày
            return `${Math.floor(diff / (60 * 60))} hours ago`;
        } else if (diff < 2 * 24 * 60 * 60) {
            // Từ 1 ngày tới 2 ngày
            return `Yesterday at ${formatTime(date)}`;
        } else {
            // Hơn 2 ngày
            return formatDateToString(date);
        }
    }

    function formatTime(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${hours}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    function formatDateToString(date) {
        const year = date.getFullYear();
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        // const time = formatTime(date);

        return `${year}-${month}-${day} `;
    }

    function padZero(number) {
        return number.toString().padStart(2, '0');
    }

    const handleGoTimelines = () => {
        if (data.id_account === localStorage.getItem('accountId')) {
            localStorage.removeItem('anotherAccountId');
            localStorage.removeItem('anotherAccountName');
            localStorage.removeItem('anotherAccountAvatar');
            navigate(`/timelines`);
        } else {
            localStorage.setItem('anotherAccountId', data.id_account);
            localStorage.setItem('anotherAccountName', data.fullName);
            localStorage.setItem('anotherAccountAvatar', data.avatar);
            navigate(`/timelines/${data.id_account}`);
        }
    };

    const handleCommentClick = (id) => {
        axios
            .get(`http://localhost:3000/posts/${id}/get_all_comment`, {
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
        setShowComment(true);
    };
    function handleCloseReactList() {
        setIsReactModalOpen(false);
    }
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

    const handleTagButtonClick = (event) => {
        event.preventDefault();
        setIsTagModalOpen(true);
    };

    const handleReactButtonClick = (event) => {
        event.preventDefault();
        setIsReactModalOpen(true);
    };

    const handleShowShareModal = (e) => {
        e.preventDefault();
        if (data.postPrivacy !== 'public' || data.isShared) {
            alert('You are not allowed to share this post');
        } else {
            setIsShareModalOpen(true);
        }
    };

    function handleCloseShareModal() {
        setIsShareModalOpen(false);
    }

    const [totalReactions, setTotalReactions] = useState(0);
    const [topReactions, setTopReactions] = useState([]);
    const [reactionAmount, setReactionAmout] = useState([]);

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

    const handleRemoveItem = () => {
        setReactionList((prevItems) =>
            prevItems.filter((item) => item.id_account !== localStorage.getItem('accountId')),
        );
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

    function handleCancelReaction() {
        // call API cancel here
        handleRemoveItem();
        setCurrentUserReact('');
        axios
            .delete(`http://localhost:3000/accounts/${data._id}/unreact_post`, {
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
                id_post: data._id,
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
                id_post: data._id,
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
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('post-info')}>
                    <Image
                        onClick={handleGoTimelines}
                        className={cx('avatar')}
                        cloudName="dzuzcewvj"
                        publicId={data?.avatar}
                    />
                    <div className={cx('post-info-main')}>
                        <h4 className={cx('name')}>
                            {data?.fullName}
                            {data?.postFeeling && (
                                <div style={{ display: 'inline' }}>
                                    <span
                                        style={{
                                            opacity: 0.6,
                                            fontSize: '1.7rem',
                                            marginLeft: '8px',
                                            marginRight: '4px',
                                        }}
                                    >
                                        is feeling
                                    </span>
                                    <span style={{ fontSize: '1.7rem' }}> {data?.postFeeling}</span>
                                </div>
                            )}
                        </h4>
                        <div className={cx('time-location')}>
                            <p className={cx('time')}>{formatDate(data?.createdAt)}</p>
                            {data?.postPrivacy === 'friend' && (
                                <FontAwesomeIcon className={cx('privacy')} icon={faUserGroup}></FontAwesomeIcon>
                            )}
                            {data?.postPrivacy === 'public' && (
                                <FontAwesomeIcon className={cx('privacy')} icon={faEarthAmericas}></FontAwesomeIcon>
                            )}
                            {data?.postPrivacy === 'private' && (
                                <FontAwesomeIcon className={cx('privacy')} icon={faLock}></FontAwesomeIcon>
                            )}
                            <p className={cx('location')}>{data?.location}</p>
                        </div>
                    </div>
                    {data?.id_friendTag?.length > 0 && (
                        <div className={cx('friend')} onClick={(e) => handleTagButtonClick(e)}>
                            <p className={cx('friend-number')}>{data?.id_friendTag.length} people</p>
                        </div>
                    )}
                </div>

                <div className={cx('post-content')}>
                    <div className={cx('post-content-text')}>
                        <p className={cx('post-text')}>{data?.postContent}</p>
                    </div>
                    <div className={cx('post-content-image')}>
                        {data?.id_visualMedia?.length > 1 && (
                            <Carousel>
                                {data?.id_visualMedia?.map((image) => (
                                    <Carousel.Item key={Math.random()}>
                                        <Image
                                            className={cx('image')}
                                            cloudName="dzuzcewvj"
                                            publicId={image.url}
                                            crop="scale"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        {data?.id_visualMedia?.length === 1 && (
                            <Image
                                className={cx('image')}
                                cloudName="dzuzcewvj"
                                publicId={data.id_visualMedia[0].url}
                            />
                        )}
                    </div>
                </div>
                {data?.shareContent?.shared_id_account && (
                    <div className={cx('share-content')}>
                        <div className={cx('post-content')}>
                            <div className={cx('post-content-image1')} style={{ marginTop: '12px', width: '640px' }}>
                                {data?.shareContent?.shared_id_visualMedia.length > 1 && (
                                    <Carousel>
                                        {data?.shareContent.shared_id_visualMedia.map((image) => (
                                            <Carousel.Item key={Math.random()}>
                                                <Image
                                                    className={cx('image')}
                                                    cloudName="dzuzcewvj"
                                                    publicId={image.url}
                                                    crop="scale"
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                )}
                                {data?.shareContent.shared_id_visualMedia.length === 1 && (
                                    <Image
                                        className={cx('image')}
                                        cloudName="dzuzcewvj"
                                        publicId={data.shareContent.shared_id_visualMedia[0].url}
                                    />
                                )}
                            </div>
                            <div className={cx('post-info')}>
                                <Image
                                    className={cx('avatar')}
                                    cloudName="dzuzcewvj"
                                    publicId={data?.shareContent.shared_avatar}
                                />
                                <div className={cx('post-info-main')}>
                                    <h4 className={cx('name')}>{data?.shareContent.shared_fullName}</h4>
                                    <div className={cx('time-location')}>
                                        <p className={cx('time')}>{formatDate(data?.shareContent.shared_createdAt)}</p>
                                        <FontAwesomeIcon
                                            className={cx('privacy')}
                                            icon={faEarthAmericas}
                                        ></FontAwesomeIcon>
                                        <p className={cx('location')}>{data?.shareContent.shared_location}</p>
                                    </div>
                                </div>
                                {data?.shareContent.shared_id_friendTag.length > 0 && (
                                    <div className={cx('friend')} onClick={(e) => handleTagButtonClick(e)}>
                                        <p className={cx('friend-number')}>
                                            {data?.shareContent.shared_id_friendTag.length} people
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={cx('post-content-text')}>
                                <p className={cx('post-text')}>{data?.shareContent.shared_postContent}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className={cx('interaction-number')}>
                    {totalReactions > 0 ? (
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
                    ) : (
                        <div className={cx('react-number')}></div>
                    )}
                    <div className={cx('comment-number')}>
                        <p>{data.commentAmount} comments</p>
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
                        <RenderUserReact
                            currentUserReact={currentUserReact}
                            handleCancelReaction={handleCancelReaction}
                            handleChooseReaction={handleChooseReaction}
                        />
                    </div>
                    <div className={cx('action-button')}>
                        <Button
                            leftIcon={<FontAwesomeIcon icon={faComment} />}
                            outline
                            large
                            onClick={() => handleCommentClick(data?._id)}
                        >
                            Comment
                        </Button>
                    </div>
                    <div className={cx('action-button')}>
                        <Button
                            className={cx('share-button')}
                            leftIcon={<FontAwesomeIcon icon={faShareFromSquare} />}
                            outline
                            large
                            onClick={handleShowShareModal}
                        >
                            Share
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
            {showComment && <ListComments data={comments}></ListComments>}
            {isTagModalOpen && (
                <ShowListTagFriend
                    data={data?._id}
                    visible={isTagModalOpen}
                    onClose={setIsTagModalOpen}
                ></ShowListTagFriend>
            )}
            {isReactModalOpen && (
                <ShowListReact
                    data={data?._id}
                    visible={isReactModalOpen}
                    onClose={handleCloseReactList}
                ></ShowListReact>
            )}
            {isShareModalOpen && (
                <ShareModal data={data} visible={isShareModalOpen} onClose={handleCloseShareModal}></ShareModal>
            )}
        </div>
    );
}

export default Post;

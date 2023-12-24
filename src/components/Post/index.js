import styles from './Post.module.scss';
import classNames from 'classnames/bind';
import { Image, Video } from 'cloudinary-react';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '~/components/Button';
import ListComments from '../ListComments';
import ShowListTagFriend from '../ShowListTagFriend';
import reactIcons from '../General/reactIcons';
import generateReactionList from '../General/generateReactionList';
import { Carousel } from 'react-bootstrap';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import axios from 'axios';
import {
    faHeart,
    faThumbsUp,
    faUserGroup,
    faEarthAmericas,
    faLock,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { faComment, faShareFromSquare } from '@fortawesome/free-regular-svg-icons';
import ShowListReact from '../ShowListReact';
import { useNavigate } from 'react-router-dom';
import RenderUserReact from '../RenderUserReact/RenderUserReact';
import ShareModal from '../ShareModal';
import UpdatePostModal from '../UpdatePostModal';
import { io } from 'socket.io-client';
import TwoMedia from '../DisplayMedia/TwoMedia';
import ThreeMedia from '../DisplayMedia/ThreeMedia';
import FourMedia from '../DisplayMedia/FourMedia';
import MoreMedia from '../DisplayMedia/MoreMedia';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function Post({ data, results, setResults }) {
    const [dict, setDict] = useState({});
    useEffect(() => {
        switch (localStorage.getItem('language')) {
            case 'english':
                setDict(enDict);
                break;
            case 'vietnamese':
                setDict(viDict);
                break;
        }
    }, []);

    const menuRef = useRef(null);
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const [reactionList, setReactionList] = useState(data.listReaction);
    const currentUser = localStorage.getItem('accountId');
    const [isTagModalOpen, setIsTagModalOpen] = useState(false);
    const [isReactModalOpen, setIsReactModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isUpdatePostModalOpen, setIsUpdatePostModalOpen] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleSelectImage = (image) => {
        setSelectedImage(image);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleCloseImage = () => {
        setSelectedImage(null);
    };
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const diff = (now.getTime() - date.getTime()) / 1000; // Đổi thành giây

        if (diff < 60) {
            // Dưới 1 phút
            return `${Math.floor(diff)} ${dict.secsAgo}`;
        } else if (diff < 60 * 60) {
            // Dưới 1 giờ
            if (diff < 120) return `1 ${dict.minAgo}`;
            else {
                return `${Math.floor(diff / 60)} ${dict.minsAgo}`;
            }
        } else if (diff < 24 * 60 * 60) {
            if (diff < 60 * 60 * 2) return `1 ${dict.hourAgo}`;
            // Dưới 1 ngày
            return `${Math.floor(diff / (60 * 60))} ${dict.hoursAgo}`;
        } else if (diff < 2 * 24 * 60 * 60) {
            // Từ 1 ngày tới 2 ngày
            return `${dict.yesterday} ${formatTime(date)}`;
        } else {
            // Hơn 2 ngày
            return formatDateToString(date);
        }
    }
    const [showMenu, setShowMenu] = useState(false);
    function handleShowAction(e) {
        e.stopPropagation();
        e.preventDefault();
        setShowMenu(!showMenu);
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

    const handleGoTimelines = (id, isShared) => {
        if (!isShared) {
            if (id === localStorage.getItem('accountId')) {
                localStorage.setItem('anotherAccountId', '');
                localStorage.setItem('anotherAccountName', '');
                localStorage.setItem('anotherAccountAvatar', '');
                localStorage.setItem('friendStatus', '');
                localStorage.setItem('idFriendRequest', '');
                navigate(`/timelines`);
            } else {
                localStorage.setItem('anotherAccountId', data.id_account);
                localStorage.setItem('anotherAccountName', data.fullName);
                localStorage.setItem('anotherAccountAvatar', data.avatar);
                navigate(`/timelines/${id}`);
                window.location.reload();
            }
        } else {
            localStorage.setItem('anotherAccountId', id);
            localStorage.setItem('anotherAccountName', data.shareContent.shared_fullName);
            localStorage.setItem('anotherAccountAvatar', data.shareContent.shared_avatar);
            navigate(`/timelines/${id}`);
            window.location.reload();
        }
    };

    const handleCommentClick = (id) => {
        setShowComment(!showComment);
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

    // share modal
    const handleShowShareModal = (e) => {
        e.preventDefault();
        if (data.postPrivacy !== 'public' || data.isShared) {
            alert(`${dict.You_are_not_allowed_to_share_this_post}`);
        } else {
            setIsShareModalOpen(true);
        }
    };

    function handleCloseShareModal() {
        setIsShareModalOpen(false);
    }

    // update post modal

    const handleShowUpdatePostModal = (e) => {
        e.preventDefault();
        setIsUpdatePostModalOpen(true);
    };

    function handleCloseUpdatePostModal() {
        setIsUpdatePostModalOpen(false);
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
            .delete(`https://kreat-api.onrender.com/accounts/${data._id}/unreact_post`, {
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
                .patch(`https://kreat-api.onrender.com/accounts/update_react`, body, {
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
                .post(`https://kreat-api.onrender.com/accounts/react`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    io('https://kreat-socket.onrender.com').emit(
                        'sendNotification',
                        res.data.id_notification_receivers,
                    );
                })
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

    const handleDeletePost = (id) => {
        if (window.confirm(`Are you sure to delete this post?`)) {
            axios
                .delete(`https://kreat-api.onrender.com/posts/${id}/delete_post`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    setShowMenu(false);
                    setResults((results) => results.filter((post) => post._id !== id));
                })
                .catch(() => {});
        } else {
            setShowMenu(false);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('post-info')}>
                    <Image
                        onClick={() => handleGoTimelines(data.id_account, false)}
                        className={cx('avatar')}
                        cloudName="dzuzcewvj"
                        publicId={data?.avatar}
                    />
                    <div className={cx('post-info-main')}>
                        <div className={cx('name-container')}>
                            <h4 onClick={() => handleGoTimelines(data.id_account, false)} className={cx('name')}>
                                {data?.fullName}
                            </h4>
                            <p>
                                {data?.postFeeling && (
                                    <span style={{ display: 'inline' }}>
                                        <span
                                            style={{
                                                opacity: 0.6,
                                                fontSize: '1.7rem',
                                                marginLeft: '8px',
                                                marginRight: '4px',
                                            }}
                                        >
                                            {dict.is_feeling}
                                        </span>
                                        <span style={{ fontSize: '1.7rem' }}> {dict[data.postFeeling]}</span>
                                    </span>
                                )}
                            </p>
                        </div>
                        {data?.id_friendTag?.length > 0 && (
                            <div className={cx('with-friend-container')}>
                                <p style={{ marginRight: '4px', flexWrap: 'nowrap' }}>{dict.with}</p>
                                <p onClick={(e) => handleTagButtonClick(e)} className={cx('listTagFriend')}>
                                    {data.id_friendTag.map((friend) => friend.fullName).join(', ')}
                                </p>
                            </div>
                        )}
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
                    <div className={cx('actionButtonContainer')}>
                        <div className={cx('actionButton')}>
                            {data?.id_account === localStorage.getItem('accountId') && (
                                <button onClick={handleShowAction} className={cx('actionOnPost')}>
                                    <FontAwesomeIcon icon={faEllipsis} style={{ fontSize: '2rem' }} />
                                </button>
                            )}
                            {showMenu && (
                                <div ref={menuRef} className={cx('menu')}>
                                    <button className={cx('menu-item')} onClick={handleShowUpdatePostModal}>
                                        {dict.Update_post}
                                    </button>
                                    <button className={cx('menu-item')} onClick={() => handleDeletePost(data._id)}>
                                        {dict.Delete_post}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className={cx('post-content')}>
                    <div className={cx('post-content-text')}>
                        <p className={cx('post-text')}>{data?.postContent}</p>
                    </div>
                    <div className={cx('post-content-image')}>
                        {data?.id_visualMedia?.length === 1 && data.id_visualMedia[0].type === 'video' && (
                            <Video
                                publicId={data.id_visualMedia[0].url}
                                cloudName="dzuzcewvj"
                                width="100%"
                                height="360px"
                                controls
                                sourceTypes={['webm', 'mp4']}
                            ></Video>
                        )}
                        {data?.id_visualMedia?.length === 1 && data.id_visualMedia[0].type === 'image' && (
                            <Image
                                className={cx('image')}
                                cloudName="dzuzcewvj"
                                publicId={data.id_visualMedia[0].url}
                                onClick={() => handleSelectImage(data.id_visualMedia[0].url)}
                            />
                        )}
                        {data?.id_visualMedia?.length > 1 && localStorage.getItem('display') === 'slider' && (
                            <Carousel>
                                {data?.id_visualMedia?.map((image) => (
                                    <Carousel.Item key={Math.random()}>
                                        <Image
                                            className={cx('image')}
                                            cloudName="dzuzcewvj"
                                            publicId={image.url}
                                            onClick={() => handleSelectImage(image.url)}
                                            crop="scale"
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                        {data?.id_visualMedia?.length === 2 && localStorage.getItem('display') === 'grid' && (
                            <TwoMedia data={data.id_visualMedia}></TwoMedia>
                        )}
                        {data?.id_visualMedia?.length === 3 && localStorage.getItem('display') === 'grid' && (
                            <ThreeMedia data={data.id_visualMedia}></ThreeMedia>
                        )}
                        {data?.id_visualMedia?.length === 4 && localStorage.getItem('display') === 'grid' && (
                            <FourMedia data={data.id_visualMedia}></FourMedia>
                        )}
                        {data?.id_visualMedia?.length > 4 && localStorage.getItem('display') === 'grid' && (
                            <MoreMedia data={data.id_visualMedia}></MoreMedia>
                        )}
                    </div>
                </div>
                {data?.shareContent?.shared_id_account && (
                    <div className={cx('share-content')}>
                        <div className={cx('post-content')}>
                            <div className={cx('post-content-image1')} style={{ marginTop: '12px', width: '640px' }}>
                                {data?.shareContent.shared_id_visualMedia.length === 1 &&
                                    data?.shareContent.shared_id_visualMedia[0].type === 'image' && (
                                        <Image
                                            className={cx('image')}
                                            cloudName="dzuzcewvj"
                                            publicId={data.shareContent.shared_id_visualMedia[0].url}
                                            onClick={() =>
                                                handleSelectImage(data.shareContent.shared_id_visualMedia[0].url)
                                            }
                                        />
                                    )}
                                {data?.shareContent.shared_id_visualMedia.length === 1 &&
                                    data?.shareContent.shared_id_visualMedia[0].type === 'video' && (
                                        <Video
                                            publicId={data.shareContent.shared_id_visualMedia[0].url}
                                            cloudName="dzuzcewvj"
                                            width="100%"
                                            height="360"
                                            controls
                                            // poster="your-poster-image-public-id"
                                            sourceTypes={['webm', 'mp4']}
                                        ></Video>
                                    )}
                                {data?.shareContent?.shared_id_visualMedia.length > 1 &&
                                    localStorage.getItem('display') === 'slider' && (
                                        <Carousel>
                                            {data?.shareContent.shared_id_visualMedia.map((image) => (
                                                <Carousel.Item key={Math.random()}>
                                                    <Image
                                                        className={cx('image')}
                                                        cloudName="dzuzcewvj"
                                                        publicId={image.url}
                                                        onClick={() => handleSelectImage(image.url)}
                                                        crop="scale"
                                                    />
                                                </Carousel.Item>
                                            ))}
                                        </Carousel>
                                    )}
                                {data?.shareContent?.shared_id_visualMedia.length === 2 &&
                                    localStorage.getItem('display') === 'grid' && (
                                        <TwoMedia data={data.shareContent.shared_id_visualMedia}></TwoMedia>
                                    )}
                                {data?.shareContent?.shared_id_visualMedia.length === 3 &&
                                    localStorage.getItem('display') === 'grid' && (
                                        <ThreeMedia data={data.shareContent.shared_id_visualMedia}></ThreeMedia>
                                    )}
                                {data?.shareContent?.shared_id_visualMedia.length === 4 &&
                                    localStorage.getItem('display') === 'grid' && (
                                        <FourMedia data={data.shareContent.shared_id_visualMedia}></FourMedia>
                                    )}
                                {data?.shareContent?.shared_id_visualMedia.length > 4 &&
                                    localStorage.getItem('display') === 'grid' && (
                                        <MoreMedia data={data.shareContent.shared_id_visualMedia}></MoreMedia>
                                    )}
                            </div>
                            <div className={cx('post-info')}>
                                <Image
                                    onClick={() => handleGoTimelines(data.shareContent.shared_id_account, true)}
                                    className={cx('avatar')}
                                    cloudName="dzuzcewvj"
                                    publicId={data?.shareContent.shared_avatar}
                                />
                                <div className={cx('post-info-main')}>
                                    <div className={cx('name-container')}>
                                        <h4 className={cx('name')}>{data?.shareContent.shared_fullName}</h4>
                                        <p>
                                            {data?.shareContent.shared_postFeeling && (
                                                <span style={{ display: 'inline' }}>
                                                    <span
                                                        style={{
                                                            opacity: 0.6,
                                                            fontSize: '1.7rem',
                                                            marginLeft: '8px',
                                                            marginRight: '4px',
                                                        }}
                                                    >
                                                        {dict.is_feeling}
                                                    </span>
                                                    <span style={{ fontSize: '1.7rem' }}>
                                                        {' '}
                                                        {dict[data?.shareContent.shared_postFeeling]}
                                                    </span>
                                                </span>
                                            )}
                                        </p>
                                    </div>
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
                                            {data?.shareContent.shared_id_friendTag.length} {dict.people}
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
                        <div className={cx('react-number-container')} onClick={(e) => handleReactButtonClick(e)}>
                            {topReactions.map((reaction) => {
                                return renderIcon(reaction);
                            })}
                            <p
                                className={cx('react-number')}
                                style={{
                                    display: 'inline-block',
                                    fontSize: '2rem',
                                    marginLeft: '12px',
                                    paddingBottom: '4px',
                                    lineHeight: '3rem',
                                    opacity: '0.7',
                                    cursor: 'pointer',
                                }}
                            >
                                {totalReactions}
                            </p>
                        </div>
                    ) : (
                        <div className={cx('react-number')}></div>
                    )}
                    <div onClick={() => handleCommentClick(data?._id)} className={cx('comment-number')}>
                        {data.commentAmount !== 1 ? (
                            <p>
                                {data.commentAmount} {dict.comments}
                            </p>
                        ) : (
                            <p>
                                {data.commentAmount} {dict.comment}
                            </p>
                        )}
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
                            className={cx('share-button')}
                            leftIcon={<FontAwesomeIcon icon={faComment} />}
                            outline
                            onClick={() => handleCommentClick(data?._id)}
                        >
                            {dict.Comment}
                        </Button>
                    </div>
                    <div className={cx('action-button')}>
                        <Button
                            className={cx('share-button')}
                            leftIcon={<FontAwesomeIcon icon={faShareFromSquare} />}
                            outline
                            onClick={handleShowShareModal}
                        >
                            {dict.Share}
                        </Button>
                    </div>
                </div>
            </PopperWrapper>
            {showComment && <ListComments id_post={data._id}></ListComments>}
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
            {isUpdatePostModalOpen && (
                <UpdatePostModal
                    data={data}
                    visible={isUpdatePostModalOpen}
                    onClose={handleCloseUpdatePostModal}
                    setResults={setResults}
                    results={results}
                ></UpdatePostModal>
            )}
            {selectedImage && (
                <div className={cx('overlay')} onClick={handleCloseImage}>
                    <Image
                        className={cx('overlay-image')}
                        cloudName="dzuzcewvj"
                        publicId={selectedImage}
                        crop="scale"
                        alt="selected media"
                    />
                </div>
            )}
        </div>
    );
}

export default Post;

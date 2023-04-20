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

    console.log(isReactModalOpen);
    const reactionList = data.listReact;
    let reactionAmount = [];
    generateReactionList(reactionAmount, reactionList);

    var totalReactions = reactionAmount.reduce((total, reaction) => total + reaction.count, 0);
    var topReactions = reactionAmount
        .filter((reaction) => reaction.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
    const renderIcon = (item) => {
        return reactIcons.get(item.type);
    };

    const cx = classNames.bind(styles);
    const currentUser = 'Dan Cortese';
    var [currentUserReact, setCurrentUserReact] = useState('');
    function checkCurrentUserReact(currentUser) {
        data.listReact.forEach((userReact) => {
            if (userReact.nameAccount === currentUser) {
                setCurrentUserReact(userReact.reactType);
                return;
            }
        });
    }

    function handleCancelReaction() {
        // call API cancel here
        setCurrentUserReact('');
    }

    function handleChooseReaction(reaction) {
        // call API add/update react here
        setCurrentUserReact(reaction);
    }

    return (
        <div className={cx('comment-container')}>
            <img className={cx('avatar')} src={data.avatar} alt="avatar" />
            <div className={cx('comment-main')}>
                <div className={cx('comment-info-main')}>
                    <h4 className={cx('name')}>{data.nameAccount}</h4>
                    <p className={cx('time')}>{data.datetime}</p>
                </div>
                <div className={cx('comment-content')}>{data.contentComment}</div>
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
                    data={data.listReact}
                    visible={isReactModalOpen}
                    onClose={handleCloseReactList}
                ></ShowListReact>
            )}
        </div>
    );
}

export default Comment;

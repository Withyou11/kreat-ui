import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUp1 } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { useState, useEffect, memo } from 'react';
import styles from './RenderUserReact.module.scss';
import classNames from 'classnames/bind';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

const RenderUserReact = ({ currentUserReact, handleCancelReaction, handleChooseReaction }) => {
    const [userReactContent, setUserReactContent] = useState(null);
    const cx = classNames.bind(styles);
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

    useEffect(() => {
        if (currentUserReact === 'like') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button
                        className={cx('liked-button')}
                        leftIcon={<FontAwesomeIcon icon={faThumbsUp} />}
                        outline
                        onClick={handleCancelReaction}
                    >
                        {dict.like}
                    </Button>
                </div>,
            );
        } else if (currentUserReact === 'love') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button
                        className={cx('loved-button')}
                        leftIcon={<FontAwesomeIcon icon={faHeart} />}
                        outline
                        onClick={handleCancelReaction}
                    >
                        {dict.love}
                    </Button>
                </div>,
            );
        } else if (currentUserReact === 'haha') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button className={cx('haha-button')} haha outline onClick={handleCancelReaction}>
                        Haha
                    </Button>
                </div>,
            );
        } else if (currentUserReact === 'wow') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button className={cx('haha-button')} wow outline onClick={handleCancelReaction}>
                        Wow
                    </Button>
                </div>,
            );
        } else if (currentUserReact === 'sad') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button className={cx('haha-button')} sad outline onClick={handleCancelReaction}>
                        {dict.sad}
                    </Button>
                </div>,
            );
        } else if (currentUserReact === 'angry') {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button className={cx('angry-button')} angry outline onClick={handleCancelReaction}>
                        {dict.angry}
                    </Button>
                </div>,
            );
        } else {
            setUserReactContent(
                <div className={cx('action-button')}>
                    <Button
                        className={cx('like-button')}
                        leftIcon={<FontAwesomeIcon icon={faThumbsUp1} />}
                        outline
                        onClick={() => handleChooseReaction('like')}
                    >
                        {dict.like}
                    </Button>
                </div>,
            );
        }
    }, [currentUserReact]);

    return userReactContent;
};

export default memo(RenderUserReact);

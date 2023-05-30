import { useState, useEffect } from 'react';
import Button from '~/components/Button';
import styles from './FriendRequestItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

function FriendRequestItem({ data }) {
    const cx = classNames.bind(styles);
    const onConfirm = (e) => {
        e.preventDefault();
    };
    const onCancel = (e) => {
        e.preventDefault();
    };
    return (
        <Link style={{ textDecoration: 'none' }} to={`/@${data.email}`} className={cx('wrapper')}>
            <div className={cx('info')}>
                <img className={cx('avatar')} src={data.avatar} alt="avatar"></img>
                <p className={cx('name')}>{data.fullname}</p>
            </div>
            <div className={cx('friend-container')}>
                <div className={cx('friend')}>
                    <p className={cx('amount')}>{data.friendAmount}</p>
                    <p>Friends</p>
                </div>
                <div className={cx('friend')}>
                    <p className={cx('amount')}>{data.mutualFriendAmount}</p>
                    <p>Mutual friends</p>
                </div>
            </div>
            <div className={cx('action')}>
                <Button primary onClick={onConfirm}>
                    Confirm
                </Button>
                <Button outline onClick={onCancel}>
                    Delete
                </Button>
            </div>
        </Link>
    );
}

export default FriendRequestItem;

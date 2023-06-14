import axios from 'axios';
import Button from '~/components/Button';
import styles from './FriendRequestItem.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Image } from 'cloudinary-react';
function FriendRequestItem({ data }) {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const onConfirm = (e) => {
        e.stopPropagation();
        e.preventDefault();
        axios
            .delete(`http://localhost:3000/accounts/${data._id}/accept_friend_request`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch(() => {});
    };
    const onCancel = (e) => {
        e.stopPropagation();
        e.preventDefault();
        axios
            .delete(`http://localhost:3000/accounts/${data.id_friendRequest}/decline_friend_request`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch(() => {});
    };
    const handleGoTimeline = () => {
        localStorage.setItem('anotherAccountId', data.id_account);
        localStorage.setItem('anotherAccountName', data.fullName);
        localStorage.setItem('anotherAccountAvatar', data.avatar);
        navigate(`/timelines/${data.id_account}`);
    };
    return (
        <div onClick={handleGoTimeline} style={{ textDecoration: 'none' }} className={cx('wrapper')}>
            <div className={cx('info')}>
                <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} />
                <p className={cx('name')}>{data.fullName}</p>
            </div>
            <div className={cx('friend-container')}>
                <div className={cx('friend')}>
                    <p className={cx('amount')}>{data.friendAmount}</p>
                    <p>Friends</p>
                </div>
                <div className={cx('friend')}>
                    <p className={cx('amount')}>{data.mutualFriends}</p>
                    <p>Mutual friends</p>
                </div>
            </div>
            <div className={cx('aboutContainer')}>
                <p className={cx('about')}>{data.aboutMe}</p>
            </div>
            <div className={cx('action')}>
                <Button primary onClick={onConfirm}>
                    Confirm
                </Button>
                <Button outline onClick={onCancel}>
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default FriendRequestItem;

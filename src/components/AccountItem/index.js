import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import reactIcons from '../General/reactIcons';
import axios from 'axios';
import { io } from 'socket.io-client';

function AccountItem({ data, button, active, inactive, user, onUserSelect, mutualFriends, setFriendSuggestionList }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    function handleAddFriend(e) {
        e.stopPropagation();
        e.preventDefault();
        const receiver = {
            id_receiver: data.id_account,
        };
        axios
            .post(`https://kreat-api.onrender.com/accounts/send_friend_request`, receiver, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                io('https://kreat-socket.onrender.com').emit('sendNotification', res.data.id_notification_receivers);

                setFriendSuggestionList((results) =>
                    results.filter((account) => account.id_account !== data.id_account),
                );
            })
            .catch(() => {});
    }
    const handleGoTimelines = () => {
        localStorage.setItem('anotherAccountId', data.id_account);
        localStorage.setItem('anotherAccountName', data.fullName);
        localStorage.setItem('anotherAccountAvatar', data.avatar);
        navigate(`/timelines/${data.id_account}`);
    };

    function handleOpenChatBox(e) {
        onUserSelect(user);
    }

    if (!active && !inactive) {
        return (
            <div
                onClick={handleGoTimelines}
                style={{ textDecoration: 'none' }}
                to={`/timelines/${data.id_account}`}
                className={cx('wrapper')}
            >
                {/* <img className={cx('avatar')} src={data.avatar} alt="Avatar" /> */}
                <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{data.fullName}</h4>
                    <p className={cx('amount-common-friend')}>
                        {mutualFriends}
                        <span> mutual friends</span>
                    </p>
                </div>
                {button && (
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                        smallest
                        onClick={handleAddFriend}
                    ></Button>
                )}
                {data.reactType && <div style={{ margin: '10px 30px' }}>{reactIcons.get(data.reactType)}</div>}
            </div>
        );
    } else {
        return (
            <button className={cx('wrapper')} onClick={handleOpenChatBox}>
                <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{data.fullName}</h4>
                </div>
                {active && <FontAwesomeIcon style={{ color: '#00AB11', fontSize: '10px' }} icon={faCircle} />}
                {inactive && <FontAwesomeIcon style={{ color: '#D3D3D3', fontSize: '10px' }} icon={faCircle} />}
            </button>
        );
    }
}

export default AccountItem;

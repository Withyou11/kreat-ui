import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import styles from './FriendItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'cloudinary-react';
import axios from 'axios';
function FriendItem({ data }) {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleGoTimeline = () => {
        localStorage.setItem('anotherAccountId', data.id_account);
        localStorage.setItem('anotherAccountName', data.fullName);
        localStorage.setItem('anotherAccountAvatar', data.avatar);
        navigate(`/timelines/${data.id_account}`);
    };
    function handleShowAction(e) {
        e.stopPropagation();
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    function handleUnfriend(e) {
        e.stopPropagation();
        e.preventDefault();
        axios
            .delete(`http://localhost:3000/accounts/${data.id_account}/unfriend`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                window.location.reload();
            })
            .catch(() => {});
    }

    function handleReport(e) {
        e.preventDefault();
    }

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

    return (
        <div onClick={handleGoTimeline} style={{ textDecoration: 'none' }} className={cx('wrapper')}>
            <div className={cx('info')}>
                <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} />
                <p className={cx('name')}>{data.fullName}</p>
                {!localStorage.getItem('anotherAccountId') && (
                    <Button
                        className={cx('action')}
                        leftIcon={<FontAwesomeIcon icon={faEllipsis} style={{ fontSize: '2.4rem' }} />}
                        onClick={handleShowAction}
                    ></Button>
                )}
                {showMenu && (
                    <div ref={menuRef} className={cx('menu')}>
                        <button className={cx('menu-item')} onClick={handleUnfriend}>
                            Unfriend
                        </button>
                        <button className={cx('menu-item')} onClick={handleReport}>
                            Report
                        </button>
                    </div>
                )}
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
            <p className={cx('about')}>{data.aboutMe}</p>
        </div>
    );
}
export default FriendItem;

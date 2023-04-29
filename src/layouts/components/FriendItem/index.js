import { useState, useRef, useEffect } from 'react';
import Button from '~/components/Button';
import styles from './FriendItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function FriendItem({ data }) {
    const cx = classNames.bind(styles);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    function handleShowAction(e) {
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    function handleUnfriend(e) {
        e.preventDefault();
        console.log('Unfriend:' + data.fullname);
    }

    function handleReport(e) {
        e.preventDefault();
        console.log('Report:' + data.fullname);
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
        <Link style={{ textDecoration: 'none' }} to={`/@${data.email}`} className={cx('wrapper')}>
            <div className={cx('info')}>
                <img className={cx('avatar')} src={data.avatar} alt="avatar"></img>
                <p className={cx('name')}>{data.fullname}</p>
                <Button
                    className={cx('action')}
                    leftIcon={<FontAwesomeIcon icon={faEllipsis} style={{ fontSize: '2.4rem' }} />}
                    smallest
                    onClick={handleShowAction}
                ></Button>
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
                    <p className={cx('amount')}>{data.mutualFriendAmount}</p>
                    <p>Mutual friends</p>
                </div>
            </div>
            <p className={cx('about')}>{data.about}</p>
        </Link>
    );
}
export default FriendItem;

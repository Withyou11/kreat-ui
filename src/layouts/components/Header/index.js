import classNames from 'classnames/bind';
import NewTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBell, faComments } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '~/assets/images/app_logo.png';
import { Image } from 'cloudinary-react';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListNotification from '~/components/ListNotification';
import ListChat from '~/components/ListChat';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function Header({ unviewAmount, setUnviewAmount, handleUserSelect }) {
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

    const cx = classNames.bind(styles);

    const MENU_ITEMS = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: dict.Your_Profile,
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: dict.Setting,
        },
        {
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            title: dict.Logout,
        },
    ];
    const [showListNotification, setShowListNotification] = useState(false);
    const [showListChats, setShowListChats] = useState(false);
    const navigation = useNavigate();

    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/accounts/unviewed_notification_and_message`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setUnviewAmount(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleGoNewsfeed = () => {
        localStorage.setItem('anotherAccountId', '');
        localStorage.setItem('anotherAccountName', '');
        localStorage.setItem('anotherAccountAvatar', '');
        localStorage.setItem('friendStatus', '');
        localStorage.setItem('idFriendRequest', '');
        navigation('/');
    };
    // Handle logic
    const handleMenuChange = () => {};
    const handleToggleNotification = () => {
        setUnviewAmount((prevData) => ({
            ...prevData,
            unviewedNotificationAmount: 0,
        }));
        setShowListChats(false);
        setShowListNotification(!showListNotification);
    };
    const handleToggleChats = () => {
        setShowListNotification(false);
        setShowListChats(!showListChats);
    };
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button onClick={handleGoNewsfeed} className={cx('logo-link')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                </button>
                <Search />

                <div className={cx('actions')}>
                    <NewTippy content="Chats">
                        <div style={{ position: 'relative' }}>
                            {unviewAmount?.unviewedMessageAmount > 0 && (
                                <div className={cx('amount-container')}>
                                    <p className={cx('amount')}>{unviewAmount?.unviewedMessageAmount}</p>
                                </div>
                            )}
                            <button onClick={handleToggleChats} className={cx('action_btn')}>
                                <FontAwesomeIcon icon={faComments} />
                            </button>
                            {showListChats && (
                                <ListChat setShowListChats={setShowListChats} handleUserSelect={handleUserSelect} />
                            )}
                        </div>
                    </NewTippy>
                    <NewTippy content="Notifications">
                        <div style={{ position: 'relative' }}>
                            {unviewAmount?.unviewedNotificationAmount > 0 && (
                                <div className={cx('amount-container')}>
                                    <p className={cx('amount')}>{unviewAmount?.unviewedNotificationAmount}</p>
                                </div>
                            )}
                            <button onClick={handleToggleNotification} className={cx('action_btn')}>
                                <FontAwesomeIcon icon={faBell} />
                            </button>
                            {showListNotification && (
                                <ListNotification setShowListNotification={setShowListNotification} />
                            )}
                        </div>
                    </NewTippy>
                    <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                        <div>
                            <Image
                                className={cx('user_avatar')}
                                cloudName="dzuzcewvj"
                                publicId={localStorage.getItem('avatar')}
                                alt="avatar"
                                crop="scale"
                            />
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

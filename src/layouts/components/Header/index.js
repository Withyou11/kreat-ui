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
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Your Profile',
        // to: '/profile',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Setting',
        // to: '/setting',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Logout',
        // to: '/login',
    },
];
function Header() {
    const navigation = useNavigate();
    // const accountContext = useContext(AccountContext);
    // const accountId = accountContext.accountId;
    // const setAccountId = accountContext.setAccountId;
    const handleGoNewsfeed = () => {
        localStorage.setItem('anotherAccountId', '');
        localStorage.setItem('anotherAccountName', '');
        localStorage.setItem('anotherAccountAvatar', '');
        // setAccountId('main');
        navigation('/');
    };
    // Handle logic
    const handleMenuChange = () => {};

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <button onClick={handleGoNewsfeed} className={cx('logo-link')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                </button>
                <Search />

                <div className={cx('actions')}>
                    <NewTippy content="Chats">
                        <button className={cx('action_btn')}>
                            <FontAwesomeIcon icon={faComments} />
                        </button>
                    </NewTippy>
                    <NewTippy content="Notifications">
                        <button className={cx('action_btn')}>
                            <FontAwesomeIcon icon={faBell} />
                        </button>
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
                        {/* <img className={cx('user_avatar')} src={localStorage.getItem('avatar')} alt="user" /> */}
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;

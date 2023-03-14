import classNames from 'classnames/bind';
import NewTippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faBell, faComments } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
// import Button from '~/components/Button';
import styles from './Header.module.scss';
import logo from '~/assets/images/app_logo.png';
import user_avatar from '~/assets/images/useravatar.png';
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
    // Handle logic
    const handleMenuChange = (menuItem) => {};

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo-link')}>
                    <img className={cx('logo')} src={logo} alt="logo" />
                </Link>
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
                        <img className={cx('user_avatar')} src={user_avatar} />
                    </Menu>
                    {/* <Button
                        text
                        onClick={() => {
                            alert('clicked');
                        }}
                    >
                        Sign up
                    </Button>
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                        outline
                        small
                        onClick={() => {
                            alert('clicked');
                        }}
                    >
                        Log in
                    </Button> */}
                </div>
            </div>
        </header>
    );
}

export default Header;

// ProfileHeader.jsx
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link, useLocation } from 'react-router-dom';

import styles from './ProfileHeader.module.scss';
import avatar1 from '~/assets/images/avatar1.jpg';
import profilebackground from '~/assets/images/profilebackground.jpg';

const cx = classNames.bind(styles);

function ProfileHeader() {
    const [activeTab, setActiveTab] = useState('timeline');
    const location = useLocation();

    function handleTabClick(tab) {
        setActiveTab(tab);
    }

    useEffect(() => {
        switch (location.pathname) {
            case '/about':
                setActiveTab('about');
                break;
            case '/friends':
                setActiveTab('friends');
                break;
            case '/medias':
                setActiveTab('medias');
                break;
            case '/timelines':
            default:
                setActiveTab('timeline');
                break;
        }
    }, [location.pathname]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <img className={cx('profile-background')} src={profilebackground} alt="profilebackground"></img>
                <div className={cx('tabs-info')}>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/timelines"
                        className={cx('tab', { active: activeTab === 'timeline' })}
                        onClick={() => handleTabClick('timeline')}
                    >
                        Timeline
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/about"
                        className={cx('tab', { active: activeTab === 'about' })}
                        onClick={() => handleTabClick('about')}
                    >
                        About
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/friends"
                        className={cx('tab', { active: activeTab === 'friends' })}
                        onClick={() => handleTabClick('friends')}
                    >
                        Friends
                    </Link>
                    <Link
                        style={{ textDecoration: 'none' }}
                        to="/medias"
                        className={cx('tab', { active: activeTab === 'medias' })}
                        onClick={() => handleTabClick('medias')}
                    >
                        Photos & Videos
                    </Link>
                </div>
                <div className={cx('info')}>
                    <img className={cx('avatar')} src={avatar1} alt="avatar"></img>
                    <p className={cx('fullname')}>James Spiegel</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;

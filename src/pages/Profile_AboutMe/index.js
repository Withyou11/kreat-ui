import styles from './Profile_AboutMe.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
function Profile_AboutMe(props) {
    const cx = classNames.bind(styles);

    return (
        <>
            <ProfileHeader />
            <div className={cx('about-container')}>
                <div className={cx('about-above')}>
                    <div className={cx('personal-info')}>
                        <div className={cx('header')}>
                            <h3 className={cx('header-text')}>Personal Info</h3>
                            <FontAwesomeIcon
                                icon={faPen}
                                style={{ color: 'var(--primary)', fontSize: '2rem' }}
                            ></FontAwesomeIcon>
                        </div>
                        <hr />
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>About me:</p>
                            <p className={cx('content')}>
                                Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency in
                                Pier 56
                            </p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Birthday:</p>
                            <p className={cx('content')}>December 14th, 1980</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Lives in:</p>
                            <p className={cx('content')}>California, USA</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Occupation:</p>
                            <p className={cx('content')}>UI/UX Designer</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Joined:</p>
                            <p className={cx('content')}>April 31st, 2014</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Gender:</p>
                            <p className={cx('content')}>Male</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Status:</p>
                            <p className={cx('content')}>Married</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Email:</p>
                            <p className={cx('content')}>james@gmail.com</p>
                        </div>
                        <div className={cx('personal-info-detail')}>
                            <p className={cx('title')}>Religion:</p>
                            <p className={cx('content')}>Christian</p>
                        </div>
                    </div>
                    <div className={cx('hobbies')}>
                        <div className={cx('header')}>
                            <h3 className={cx('header-text')}>Hobbies and Interests</h3>
                            <FontAwesomeIcon
                                icon={faPen}
                                style={{ color: 'var(--primary)', fontSize: '2.2rem' }}
                            ></FontAwesomeIcon>
                        </div>
                        <hr />
                        <div className={cx('hobby')}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className={cx('title')}>Hobbies:</p>
                                            <p className={cx('content')}>
                                                I like to ride the bike to work, swimming, and working out. I also like
                                                reading design magazines, go to museums, and binge watching a good tv
                                                show while it’s raining outside.
                                            </p>
                                        </td>
                                        <td>
                                            <p className={cx('title')}>Favourite Music Bands / Artists:</p>
                                            <p className={cx('content')}>
                                                Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className={cx('title')}>Favourite TV Shows:</p>
                                            <p className={cx('content')}>
                                                Breaking Good, RedDevil, People of Interest, The Running Dead, Found,
                                                American Guy.
                                            </p>
                                        </td>
                                        <td>
                                            <p className={cx('title')}>Favourite Books:</p>
                                            <p className={cx('content')}>
                                                The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard,
                                                Lord of the Wings, Amongst Gods, The Oracle, A Tale of Air and Water.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className={cx('title')}>Favourite Movies:</p>
                                            <p className={cx('content')}>
                                                Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad, Ferrum
                                                Man.
                                            </p>
                                        </td>
                                        <td>
                                            <p className={cx('title')}>Favourite Sports:</p>
                                            <p className={cx('content')}>
                                                Badminton, Basketball, Climbing, Archery, Swimming
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className={cx('title')}>Favourite Games:</p>
                                            <p className={cx('content')}>
                                                The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4,
                                                Grand Snatch Auto.
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className={cx('education')}>
                    <div className={cx('header')}>
                        <h3 className={cx('header-text')}>Education and Employement</h3>
                        <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: 'var(--primary)', fontSize: '2.2rem' }}
                        ></FontAwesomeIcon>
                    </div>
                    <hr />
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p className={cx('title')}>Primary school: Chapter House</p>
                                    <p className={cx('content')}>2001 - 2006</p>
                                </td>
                                <td>
                                    <p className={cx('title')}>Junior high school: St David’s College</p>
                                    <p className={cx('content')}>2007 - 2010</p>
                                </td>
                                <td>
                                    <p className={cx('title')}>High school: EF Academy</p>
                                    <p className={cx('content')}>2011 - 2013</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {' '}
                                    <p className={cx('title')}>University: HCM - UIT</p>
                                    <p className={cx('content')}>2013 - 2017</p>
                                </td>
                                <td>
                                    {' '}
                                    <p className={cx('title')}>UI/UX Designer</p>
                                    <p className={cx('content')}>2017 - 2020</p>
                                </td>
                                <td>
                                    {' '}
                                    <p className={cx('title')}>Senior UI/UX Designer</p>
                                    <p className={cx('content')}>2021 - Now</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Profile_AboutMe;

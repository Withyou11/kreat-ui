import { useState, useEffect } from 'react';
import styles from './Profile_AboutMe.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import EditPersonalInfoModal from './EditPersonalInfoModal/EditPersonalInfoModal';
import EditFavoriteInfoModal from './EditFavoriteInfoModal/EditFavoriteInfoModal';
import EditEducationInfoModal from './EditEducationInfoModal/EditEducationInfoModal';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function Profile_AboutMe(props) {
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

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    let id = '';
    if (localStorage.getItem('anotherAccountId') !== '') {
        id = localStorage.getItem('anotherAccountId');
    } else {
        id = localStorage.getItem('accountId');
    }
    const cx = classNames.bind(styles);
    useEffect(() => {
        axios
            .get(`https://kreat-api.onrender.com/accounts/${id}/about`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data.about);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const [isEditPersonalInfoModalOpen, setIsEditPersonalInfoModalOpen] = useState(false);

    const handleOpenEditPersonalInfoModal = () => {
        setIsEditPersonalInfoModalOpen(true);
    };

    const handleCloseEditPersonalInfoModal = () => {
        setIsEditPersonalInfoModalOpen(false);
    };

    const handleSavePersonalInfo = (updatedPersonalInfo) => {
        axios
            .patch(
                `https://kreat-api.onrender.com/accounts/update_personal_info`,
                {
                    aboutMe: updatedPersonalInfo.aboutMe,
                    birthday: updatedPersonalInfo.birthday,
                    liveIn: updatedPersonalInfo.liveIn,
                    occupation: updatedPersonalInfo.occupation,
                    gender: updatedPersonalInfo.gender,
                    maritalStatus: updatedPersonalInfo.maritalStatus,
                    religion: updatedPersonalInfo.religion,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            )
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
        handleCloseEditPersonalInfoModal();
    };

    const [isEditFavoriteInfoModalOpen, setIsEditFavoriteInfoModalOpen] = useState(false);

    const handleOpenEditFavoriteInfoModal = () => {
        setIsEditFavoriteInfoModalOpen(true);
    };

    const handleCloseEditFavoriteInfoModal = () => {
        setIsEditFavoriteInfoModalOpen(false);
    };

    const handleSaveFavoriteInfo = (updatedFavoriteInfo) => {
        axios
            .patch(
                `https://kreat-api.onrender.com/accounts/update_favorite_info`,
                {
                    hobbies: updatedFavoriteInfo.hobbies,
                    favoriteTVShows: updatedFavoriteInfo.favoriteTVShows,
                    favoriteMovies: updatedFavoriteInfo.favoriteMovies,
                    favoriteGames: updatedFavoriteInfo.favoriteGames,
                    favoriteMusicBands: updatedFavoriteInfo.favoriteMusicBands,
                    favoriteBooks: updatedFavoriteInfo.favoriteBooks,
                    favoriteSports: updatedFavoriteInfo.favoriteSports,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            )
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
        handleCloseEditFavoriteInfoModal();
    };

    const [isEditEducationInfoModalOpen, setIsEditEducationInfoModalOpen] = useState(false);

    const handleOpenEditEducationInfoModal = () => {
        setIsEditEducationInfoModalOpen(true);
    };

    const handleCloseEditEducationInfoModal = () => {
        setIsEditEducationInfoModalOpen(false);
    };

    const handleSaveEducationInfo = (updatedEducationInfo) => {
        axios
            .patch(
                `https://kreat-api.onrender.com/accounts/update_education_info`,
                {
                    primarySchool: updatedEducationInfo.primarySchool,
                    yearStartPrimarySchool: updatedEducationInfo.yearStartPrimarySchool,
                    yearEndPrimarySchool: updatedEducationInfo.yearEndPrimarySchool,
                    secondarySchool: updatedEducationInfo.secondarySchool,
                    yearStartSecondarySchool: updatedEducationInfo.yearStartSecondarySchool,
                    yearEndSecondarySchool: updatedEducationInfo.yearEndSecondarySchool,
                    highSchool: updatedEducationInfo.highSchool,
                    yearStartHighSchool: updatedEducationInfo.yearStartHighSchool,
                    yearEndHighSchool: updatedEducationInfo.yearEndHighSchool,
                    university: updatedEducationInfo.university,
                    yearStartUniversity: updatedEducationInfo.yearStartUniversity,
                    yearEndUniversity: updatedEducationInfo.yearEndUniversity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            )
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
        handleCloseEditEducationInfoModal();
    };

    return (
        <>
            <ProfileHeader />
            {!loading ? (
                <div className={cx('about-container')}>
                    <div className={cx('about-above')}>
                        <div className={cx('personal-info')}>
                            <div className={cx('header')}>
                                <h3 className={cx('header-text')}>{dict.Personal_Info}</h3>
                                {!localStorage.getItem('anotherAccountId') && (
                                    <FontAwesomeIcon
                                        onClick={handleOpenEditPersonalInfoModal}
                                        icon={faPen}
                                        style={{ cursor: 'pointer', color: 'var(--primary)', fontSize: '2rem' }}
                                    ></FontAwesomeIcon>
                                )}
                            </div>
                            <hr />
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.About_me}</p>
                                <p className={cx('content')}>{data.personalInfo?.aboutMe}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Birthday}</p>
                                <p className={cx('content')}> {data.personalInfo?.birthday}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Lives_in}</p>
                                <p className={cx('content')}> {data.personalInfo?.liveIn}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Occupation}</p>
                                <p className={cx('content')}> {data.personalInfo?.occupation}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Joined}</p>
                                <p className={cx('content')}>{data.peronalInfo?.joined}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Gender}</p>
                                <p className={cx('content')}>{data.personalInfo?.gender}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Status}</p>
                                <p className={cx('content')}>{data.personalInfo?.maritalStatus}</p>
                            </div>
                            <div className={cx('personal-info-detail')}>
                                <p className={cx('title')}>{dict.Religion}</p>
                                <p className={cx('content')}>{data.personalInfo?.religion}</p>
                            </div>
                        </div>
                        <div className={cx('hobbies')}>
                            <div className={cx('header')}>
                                <h3 className={cx('header-text')}>{dict.Hobbies_and_Interests}</h3>
                                {!localStorage.getItem('anotherAccountId') && (
                                    <FontAwesomeIcon
                                        onClick={handleOpenEditFavoriteInfoModal}
                                        icon={faPen}
                                        style={{ cursor: 'pointer', color: 'var(--primary)', fontSize: '2.2rem' }}
                                    ></FontAwesomeIcon>
                                )}
                            </div>
                            <hr />
                            <div className={cx('hobby')}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className={cx('title')}>{dict.Hobbies}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.hobbies}</p>
                                            </td>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_Music_Bands}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteMusicBands}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_TV_Shows}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteTVShows}</p>
                                            </td>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_Books}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteBooks}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_Movies}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteMovies}</p>
                                            </td>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_Sports}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteSports}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className={cx('title')}>{dict.Favourite_Games}</p>
                                                <p className={cx('content')}>{data.favoriteInfo?.favoriteGames}</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={cx('education')}>
                        <div className={cx('header')}>
                            <h3 className={cx('header-text')}>{dict.Education_and_Employement}</h3>
                            {!localStorage.getItem('anotherAccountId') && (
                                <FontAwesomeIcon
                                    onClick={handleOpenEditEducationInfoModal}
                                    icon={faPen}
                                    style={{ cursor: 'pointer', color: 'var(--primary)', fontSize: '2.2rem' }}
                                ></FontAwesomeIcon>
                            )}
                        </div>
                        <hr />
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={cx('title')}>
                                            {dict.Primary_school} {data.educationInfo?.primarySchool}
                                        </p>
                                        <p className={cx('content')}>
                                            {data.educationInfo?.yearStartPrimarySchool} -{' '}
                                            {data.educationInfo?.yearEndPrimarySchool}{' '}
                                        </p>
                                    </td>
                                    <td>
                                        <p className={cx('title')}>
                                            {dict.Secondary_school} {data.educationInfo?.secondarySchool}{' '}
                                        </p>
                                        <p className={cx('content')}>
                                            {data.educationInfo?.yearStartSecondarySchool} -{' '}
                                            {data.educationInfo?.yearEndSecondarySchool}
                                        </p>
                                    </td>
                                    <td>
                                        <p className={cx('title')}>
                                            {dict.High_school} {data.educationInfo?.highSchool}
                                        </p>
                                        <p className={cx('content')}>
                                            {data.educationInfo?.yearStartHighSchool} -{' '}
                                            {data.educationInfo?.yearEndHighSchool}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={cx('title')}>
                                            {dict.University} {data.educationInfo?.university}
                                        </p>
                                        <p className={cx('content')}>
                                            {data.educationInfo?.yearStartUniversity} -{' '}
                                            {data.educationInfo?.yearEndUniversity}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {isEditPersonalInfoModalOpen && (
                        <EditPersonalInfoModal
                            onClose={handleCloseEditPersonalInfoModal}
                            personalInfo={data.personalInfo}
                            onSave={handleSavePersonalInfo}
                        />
                    )}
                    {isEditFavoriteInfoModalOpen && (
                        <EditFavoriteInfoModal
                            onClose={handleCloseEditFavoriteInfoModal}
                            favoriteInfo={data.favoriteInfo}
                            onSave={handleSaveFavoriteInfo}
                        />
                    )}
                    {isEditEducationInfoModalOpen && (
                        <EditEducationInfoModal
                            onClose={handleCloseEditEducationInfoModal}
                            educationInfo={data.educationInfo}
                            onSave={handleSaveEducationInfo}
                        />
                    )}
                </div>
            ) : (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
        </>
    );
}

export default Profile_AboutMe;

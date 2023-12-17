import React, { useState, useEffect } from 'react';
import ChangePassword from '../ChangePassword';
import Header from '~/layouts/components/Header';
import styles from './Settings.module.scss';
import classNames from 'classnames/bind';
import DisplaySetting from '../DisplaySetting';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
import LanguageSetting from '../LanguageSetting';
function Settings() {
    const cx = classNames.bind(styles);

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

    const [activeTab, setActiveTab] = useState('changePassword');
    const [changePasswordActive, setChangePasswordActive] = useState(true);
    const [displaySettingsActive, setDisplaySettingsActive] = useState(false);
    const [languagesActive, setLanguagesActive] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'changePassword') {
            setChangePasswordActive(true);
            setDisplaySettingsActive(false);
            setLanguagesActive(false);
        } else if (tab === 'displaySettings') {
            setChangePasswordActive(false);
            setDisplaySettingsActive(true);
            setLanguagesActive(false);
        } else if (tab === 'language_Settings') {
            setChangePasswordActive(false);
            setDisplaySettingsActive(false);
            setLanguagesActive(true);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('settings')}>
                <div className={cx('sidebar')}>
                    <ul>
                        <li
                            className={cx('tab', { active: activeTab === 'changePassword' })}
                            onClick={() => handleTabClick('changePassword')}
                        >
                            {dict.Change_password}
                        </li>
                        <hr className={cx('hr')}></hr>
                        <li
                            className={cx('tab', { active: activeTab === 'displaySettings' })}
                            onClick={() => handleTabClick('displaySettings')}
                        >
                            {dict.Display_settings}
                        </li>
                        <hr className={cx('hr')}></hr>
                        <li
                            className={cx('tab', { active: activeTab === 'language_Settings' })}
                            onClick={() => handleTabClick('language_Settings')}
                        >
                            {dict.Language_settings}
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    {changePasswordActive && <ChangePassword />}
                    {displaySettingsActive && <DisplaySetting />}
                    {languagesActive && <LanguageSetting />}
                </div>
            </div>
        </div>
    );
}

export default Settings;

import React, { useState } from 'react';
import ChangePassword from '../ChangePassword';
import Header from '~/layouts/components/Header';
import styles from './Settings.module.scss';
import classNames from 'classnames/bind';
import DisplaySetting from '../DisplaySetting';
function Settings() {
    const cx = classNames.bind(styles);

    const [activeTab, setActiveTab] = useState('changePassword');
    const [changePasswordActive, setChangePasswordActive] = useState(true);
    const [displaySettingsActive, setDisplaySettingsActive] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'changePassword') {
            setChangePasswordActive(true);
            setDisplaySettingsActive(false);
        } else if (tab === 'displaySettings') {
            setChangePasswordActive(false);
            setDisplaySettingsActive(true);
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
                            Change password
                        </li>
                        <hr className={cx('hr')}></hr>
                        <li
                            className={cx('tab', { active: activeTab === 'displaySettings' })}
                            onClick={() => handleTabClick('displaySettings')}
                        >
                            Display settings
                        </li>
                    </ul>
                </div>
                <div className={cx('content')}>
                    {changePasswordActive && <ChangePassword />}
                    {displaySettingsActive && <DisplaySetting />}
                </div>
            </div>
        </div>
    );
}

export default Settings;

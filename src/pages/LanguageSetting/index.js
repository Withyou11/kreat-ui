import React, { useState, useEffect } from 'react';
import styles from './LanguageSetting.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function LanguageSetting() {
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

    const [selectedMode, setSelectedMode] = useState(localStorage.getItem('language'));
    const handleChangeMode = (e) => {
        setSelectedMode(e.target.value);
    };

    const handleSave = () => {
        const body = {
            language: selectedMode,
        };

        axios
            .patch(`https://kreat-api.onrender.com/accounts/update_setting`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                localStorage.setItem('language', selectedMode);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <h2>{dict.Change_language}</h2>
            <select
                className={cx('changeMode')}
                id="view-mode"
                value={selectedMode}
                onChange={(e) => handleChangeMode(e)}
            >
                <option value="english">{dict.English}</option>
                <option value="vietnamese">{dict.Vietnamese}</option>
            </select>
            <button className={cx('buttonDone')} onClick={handleSave}>
                {dict.Save}
            </button>
        </div>
    );
}

export default LanguageSetting;

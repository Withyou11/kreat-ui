import React, { useState, useEffect } from 'react';
import styles from './LanguageSetting.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

import SelectBar from '~/layouts/components/SelectBar';

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

    const options = [
        { value: 'english', id: 1, title: dict.English },
        { value: 'vietnamese', id: 2, title: dict.Vietnamese },
    ];

    const [title, setTitle] = useState(dict?.Uploads);

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
            <SelectBar
                options={options}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                title={title ? title : localStorage.getItem('language') === 'english' ? dict.English : dict.Vietnamese}
                setTitle={setTitle}
            />
            <button className={cx('buttonDone')} onClick={handleSave}>
                {dict.Save}
            </button>
        </div>
    );
}

export default LanguageSetting;

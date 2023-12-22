import React, { useState, useEffect } from 'react';
import styles from './DisplaySetting.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

import SelectBar from '~/layouts/components/SelectBar';

function DisplaySetting() {
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

    const [selectedMode, setSelectedMode] = useState(localStorage.getItem('display'));

    const options = [
        { value: 'Grid', id: 1, title: dict.Grid },
        { value: 'Slider', id: 2, title: dict.Slider },
    ];

    const [title, setTitle] = useState(dict?.Uploads);

    const handleSave = () => {
        const body = {
            postDisplay: selectedMode,
        };

        axios
            .patch(`https://kreat-api.onrender.com/accounts/update_setting`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                localStorage.setItem('display', selectedMode);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <h2>{dict.Change_display_style}</h2>
            <SelectBar
                options={options}
                selectedMode={selectedMode}
                setSelectedMode={setSelectedMode}
                title={title ? title : localStorage.getItem('display') === 'grid' ? dict.Grid : dict.Slider}
                setTitle={setTitle}
            />
            <button className={cx('buttonDone')} onClick={handleSave}>
                {dict.Save}
            </button>
        </div>
    );
}

export default DisplaySetting;

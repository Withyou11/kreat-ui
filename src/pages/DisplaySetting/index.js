import React, { useState, useEffect } from 'react';
import styles from './DisplaySetting.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
function DisplaySetting() {
    const cx = classNames.bind(styles);
    const [selectedMode, setSelectedMode] = useState(localStorage.getItem('display'));
    const handleChangeMode = (e) => {
        setSelectedMode(e.target.value);
    };

    useEffect(() => {
        const body = {
            postDisplay: selectedMode,
        };

        axios
            .patch(`http://localhost:3000/accounts/update_setting`, body, {
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
    }, [selectedMode]);
    return (
        <div className={cx('wrapper')}>
            <h2>Change display style</h2>
            <select
                className={cx('changeMode')}
                id="view-mode"
                value={selectedMode}
                onChange={(e) => handleChangeMode(e)}
            >
                <option value="slider">Slider</option>
                <option value="grid">Grid</option>
            </select>
        </div>
    );
}

export default DisplaySetting;

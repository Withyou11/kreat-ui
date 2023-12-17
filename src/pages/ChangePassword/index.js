import React, { useState, useEffect } from 'react';
import styles from './ChangePassword.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function ChangePassword() {
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

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const onChangePassword = (e) => {
        e.preventDefault();
        const body = {
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        if (oldPassword !== '' && newPassword !== '' && newPassword === confirmNewPassword) {
            axios
                .post(`https://kreat-api.onrender.com/accounts/reset_password`, body, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    alert('Password changed successfully');
                })
                .catch(() => {
                    alert('Can not change password now');
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <h2>{dict.Change_your_password}</h2>
            <form className={cx('form')}>
                <input
                    className={cx('input')}
                    placeholder={dict.Old_password}
                    type="text"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    className={cx('input')}
                    placeholder={dict.New_password}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    className={cx('input')}
                    placeholder={dict.Confirm_new_password}
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <input value={dict.Change_password} className={cx('submit')} type="submit" onClick={onChangePassword} />
            </form>
        </div>
    );
}

export default ChangePassword;

import styles from './ForgotPassword.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import login from '~/assets/images/login.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const navigate = useNavigate();

    const onReset = (e) => {
        e.preventDefault();
        const body = {
            email: enterEmail,
            code: code,
            newPassword: newPassword,
        };
        if (code !== '' && newPassword !== '' && newPassword === confirmNewPassword) {
            axios
                .post(`https://kreat-api.onrender.com/accounts/reset_forgotten_password`, body, {
                    headers: {},
                })
                .then((res) => {
                    navigate('/authentication');
                })
                .catch(() => {
                    alert('Can not reset now');
                });
        }
        // call api reset
    };

    const onResend = (e) => {
        e.preventDefault();
        setActive(false);
    };

    const onNext = (e) => {
        e.preventDefault();
        const body = {
            email: enterEmail,
        };
        axios
            .post(`https://kreat-api.onrender.com/accounts/send_code`, body, {
                headers: {},
            })
            .then((res) => {
                setActive(true);
            })
            .catch(() => {
                alert('Can not send code now');
            });
    };

    const cx = classNames.bind(styles);
    const [enterEmail, setEnterEmail] = useState('');
    const [active, setActive] = useState(false);
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('aside')}>
                <img className={cx('image')} src={login} alt="Login"></img>
            </div>
            <div className={cx('main')}>
                <div className={cx('tabs')}>
                    <h1 className={cx('tab')}>Forgot password</h1>
                </div>

                <div>
                    {!active && (
                        <form>
                            <input
                                className={cx('input')}
                                placeholder="Your email"
                                type="text"
                                value={enterEmail}
                                onChange={(e) => setEnterEmail(e.target.value)}
                            />
                            <input value="Next" className={cx('submit')} type="submit" onClick={onNext} />
                        </form>
                    )}
                    {active && (
                        <>
                            <p className={cx('title')}>
                                We have sent the code to your email. Please check your email to get the code.
                            </p>
                            <input value="Resend Code" className={cx('submit1')} type="submit" onClick={onResend} />
                            <form>
                                <input
                                    className={cx('input')}
                                    placeholder="Reset code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <input
                                    className={cx('input')}
                                    placeholder="New password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <input
                                    className={cx('input')}
                                    placeholder="Confirm new password"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                />
                                <input
                                    value="Reset Password"
                                    className={cx('submit')}
                                    type="submit"
                                    onClick={onReset}
                                />
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;

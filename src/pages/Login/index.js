import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import login from '~/assets/images/login.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Login() {
    const emailInputRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);
    const onLogin = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:3000/auth/login`, {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    localStorage.setItem('accountId', res.data.id_account);
                    localStorage.setItem('fullname', res.data.fullName);
                    localStorage.setItem('avatar', res.data.avatar);
                    localStorage.setItem('anotherAccountId', '');
                    navigate('/');
                } else {
                    window.alert('Wrong email or password');
                }
            })
            .catch((error) => {
                window.alert('Wrong email or password');
            });
    };

    const onRegister = (e) => {
        e.preventDefault();
        if (fullname === '' || resEmail === '' || resPassword === '' || confirmPassword === '') {
            window.alert('Please enter all required fields');
        } else if (confirmPassword !== resPassword) {
            window.alert('Confirm password is incorrect');
        } else {
            axios
                .post(`http://localhost:3000/auth/signup`, {
                    email: resEmail,
                    password: resPassword,
                    fullName: fullname,
                })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        navigate('/confirm');
                    }
                })
                .catch((error) => {
                    window.alert('Can not register!!!');
                });
        }
    };

    const cx = classNames.bind(styles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('login');
    const toggleTab = (tab) => {
        setActiveTab(tab);
    };
    const [fullname, setFullname] = useState('');
    const [resEmail, setResEmail] = useState('');
    const [resPassword, setResPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('aside')}>
                <img className={cx('image')} src={login} alt="Login"></img>
            </div>
            <div className={cx('main')}>
                <div className={cx('tabs')}>
                    <div className={cx('tab', { active: activeTab === 'login' })} onClick={() => toggleTab('login')}>
                        Login
                    </div>
                    <div
                        className={cx('tab', { active: activeTab === 'register' })}
                        onClick={() => toggleTab('register')}
                    >
                        Register
                    </div>
                </div>
                {activeTab === 'login' && (
                    <div>
                        <p className={cx('title1')}>
                            Share your world, connect with others, and create something amazing - with KreaT
                        </p>
                        <p className={cx('title2')}>
                            Good to have you here! Let's catch up with friends and discover new things together
                        </p>
                        <form>
                            <input
                                className={cx('input')}
                                placeholder="Email Address"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ref={emailInputRef}
                            />
                            <input
                                className={cx('input')}
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input value="Login" className={cx('submit')} type="submit" onClick={onLogin} />
                            <input
                                value="Forget your password?"
                                className={cx('forget')}
                                type="submit"
                                onClick={alert}
                            />
                        </form>
                    </div>
                )}
                {activeTab === 'register' && (
                    <div>
                        <p className={cx('title1')}>
                            Share your world, connect with others, and create something amazing - with KreaT
                        </p>
                        <p className={cx('title2')}>
                            Create your own online community, share your passions, and connect with others
                        </p>
                        <form>
                            <input
                                className={cx('input')}
                                placeholder="Full Name"
                                type="text"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                ref={emailInputRef}
                            />
                            <input
                                className={cx('input')}
                                placeholder="Email Address"
                                type="email"
                                value={resEmail}
                                onChange={(e) => setResEmail(e.target.value)}
                                ref={emailInputRef}
                            />
                            <input
                                className={cx('input')}
                                placeholder="Password"
                                type="password"
                                value={resPassword}
                                onChange={(e) => setResPassword(e.target.value)}
                            />
                            <input
                                className={cx('input')}
                                placeholder="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <input
                                value="Register"
                                className={cx('registerButton')}
                                type="submit"
                                onClick={onRegister}
                            />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;

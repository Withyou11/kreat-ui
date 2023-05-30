import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import login from '~/assets/images/login.png';
import { useState } from 'react';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const onLogin = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:3000/auth/login`, {
                email: email,
                password: password,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log('Response success !!!');
                    localStorage.setItem('api', res.data.accessToken);
                    localStorage.setItem('fullname', res.data.fullName);
                    localStorage.setItem('avatar', res.data.avatar);
                    navigate('/');
                } else {
                    alert('Wrong email or password');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const cx = classNames.bind(styles);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('aside')}>
                <img className={cx('image')} src={login} alt="Login"></img>
            </div>
            <div className={cx('main')}>
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
                    />
                    <input
                        className={cx('input')}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input value="Login" className={cx('submit')} type="submit" onClick={onLogin} />
                    <input value="Forget your password?" className={cx('forget')} type="submit" onClick={alert} />
                </form>
            </div>
        </div>
    );
}

export default Login;

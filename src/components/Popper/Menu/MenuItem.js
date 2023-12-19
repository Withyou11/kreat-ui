import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const navigate = useNavigate();
    const handleClick = async () => {
        if (data.title === 'Logout' || data.title === 'Đăng xuất') {
            io('https://kreat-socket.onrender.com').emit('logout', localStorage.getItem('accountId'));
            localStorage.removeItem('avatar');
            localStorage.removeItem('fullname');
            localStorage.removeItem('anotherAccountId');
            localStorage.removeItem('accountId');
            localStorage.removeItem('anotherAccountName');
            localStorage.removeItem('anotherAccountAvatar');
            localStorage.removeItem('friendStatus');
            localStorage.removeItem('idFriendRequest');
            localStorage.removeItem('display');
            localStorage.removeItem('language');
            await axios
                .post(
                    `https://kreat-api.onrender.com/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/authentication');
                        localStorage.removeItem('accessToken');
                    } else {
                        alert('Can not log out');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (data.title === 'Your Profile' || data.title === 'Tài khoản') {
            localStorage.setItem('anotherAccountName', '');
            localStorage.setItem('anotherAccountAvatar', '');
            localStorage.setItem('anotherAccountId', '');
            localStorage.setItem('friendStatus', '');
            localStorage.setItem('idFriendRequest', '');
            setTimeout(() => {
                navigate(`/timelines`);
            }, 10);
        } else {
            navigate(`/settings`);
        }
    };
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={handleClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { io } from 'socket.io-client';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const navigate = useNavigate();
    // const socket = useRef();
    const handleClick = async () => {
        if (data.title === 'Logout') {
            localStorage.removeItem('avatar');
            localStorage.removeItem('fullname');
            localStorage.removeItem('anotherAccountId');
            localStorage.removeItem('accountId');
            localStorage.removeItem('anotherAccountName');
            localStorage.removeItem('anotherAccountAvatar');
            await axios
                .post(
                    `http://localhost:3000/auth/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {
                    if (res.status === 200) {
                        // socket.current = io('ws://localhost:3002');
                        // socket.current.emit('disconnect');
                        console.log('Logout success !!!');
                        navigate('/login');
                        localStorage.removeItem('accessToken');
                    } else {
                        alert('Can not log out');
                    }
                })
                .catch((error) => {
                    console.log(error);
                    // console.log(error);
                });
        }
    };
    return (
        <Button className={cx('menu-item')} leftIcon={data.icon} to={data.to} onClick={handleClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;

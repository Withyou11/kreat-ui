import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Menu.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ data }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (data.title === 'Logout') {
            localStorage.removeItem('avatar');
            localStorage.removeItem('fullname');
            localStorage.removeItem('fake');
            localStorage.removeItem('api');
            axios
                .post(`http://localhost:3000/auth/logout`, {
                    email: 'sunghajung@gmail.com',
                })
                .then((res) => {
                    if (res.status === 200) {
                        console.log('Logout success !!!');
                        navigate('/login');
                    } else {
                        alert('Can not log out');
                    }
                })
                .catch((error) => {
                    console.log(error);
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

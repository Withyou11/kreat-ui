import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/layouts/components/Header';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '~/Context/SocketContext/SocketContext';

function HeaderOnly({ children }) {
    const cx = classNames.bind(styles);
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('getNotification', () => {
            axios
                .get(`http://localhost:3000/accounts/unviewed_notification_and_message`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    setUnviewAmount(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }, []);

    const [unviewAmount, setUnviewAmount] = useState();
    return (
        <div className={cx('wrapper')}>
            <Header setUnviewAmount={setUnviewAmount} unviewAmount={unviewAmount}></Header>
            <div className={cx('container_header_only')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;

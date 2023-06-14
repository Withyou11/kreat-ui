import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListAccountItem from '../ListAccountItem';
import styles from './Contact.module.scss';
import { io } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

function Contact() {
    // const socket = useRef();
    // const [onlineFriendList, setOnlineFiendList] = useState([]);
    // useEffect(() => {
    //     if (localStorage.getItem('accountId')) {
    //         socket.current = io('ws://localhost:3002');
    //         socket.current.on('getUser', (onlineFriends) => {
    //             setOnlineFiendList(onlineFriends);
    //         });
    //     }
    // }, [localStorage.getItem('accountId')]);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('title-container')}>
                    <h3 className={cx('title')}>Contacts</h3>
                    <input placeholder="Find your friends..." spellCheck="false" />
                    <hr />
                </div>
                <ListAccountItem />
            </PopperWrapper>
        </div>
    );
}

export default Contact;

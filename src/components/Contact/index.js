import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListAccountItem from '../ListAccountItem';
import styles from './Contact.module.scss';
import { OnlineFriendContext } from '~/Context/OnlineFriendContext/OnlineFriendContext';
import { useState, useContext } from 'react';

function Contact() {
    const onlineFriend = useContext(OnlineFriendContext);
    const onlineFriendList = onlineFriend.onlineFriendList;
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('title-container')}>
                    <h3 className={cx('title')}>Contacts</h3>
                    <input placeholder="Find your friends..." spellCheck="false" />
                    <hr />
                </div>
                <ListAccountItem onlineFriendList={onlineFriendList} />
            </PopperWrapper>
        </div>
    );
}

export default Contact;

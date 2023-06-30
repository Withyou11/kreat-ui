import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListAccountItem from '../ListAccountItem';
import styles from './Contact.module.scss';
import { OnlineFriendContext } from '~/Context/OnlineFriendContext/OnlineFriendContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
function Contact() {
    const onlineFriend = useContext(OnlineFriendContext);
    const onlineFriendList = onlineFriend.onlineFriendList;
    const [loading, setLoading] = useState(true);
    const [listContact, setListContact] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/accounts/contact`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setListContact(response.data.listContact);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const cx = classNames.bind(styles);
    return (
        <>
            {!loading ? (
                <div className={cx('wrapper')}>
                    <PopperWrapper>
                        <div className={cx('title-container')}>
                            <h3 className={cx('title')}>Contacts</h3>
                            <input placeholder="Find your friends..." spellCheck="false" />
                            <hr />
                        </div>
                        <ListAccountItem listContact={listContact} onlineFriendList={onlineFriendList} />
                    </PopperWrapper>
                </div>
            ) : (
                <div className={cx('dot-spinner')}>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                </div>
            )}
        </>
    );
}

export default Contact;

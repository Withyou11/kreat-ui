import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import styles from './FriendSuggest.module.scss';
const cx = classNames.bind(styles);
function FriendSuggest() {
    const [loading, setLoading] = useState(true);

    const [friendSuggestionList, setFriendSuggestionList] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/accounts/friend_suggestion`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setFriendSuggestionList(res.data.friendSuggestionList);
                setLoading(false);
            })
            .catch(() => {});
    }, []);
    return (
        <>
            {!loading ? (
                <div className={cx('wrapper')}>
                    <div style={{ height: '100%' }}>
                        <PopperWrapper>
                            <h3 className={cx('title')}>Friend Suggestions</h3>
                            <hr />
                            {friendSuggestionList.map((account) => (
                                <div key={Math.random()}>
                                    <AccountItem
                                        key={account.id_account}
                                        data={account}
                                        mutualFriends={account.mutualFriends}
                                        setFriendSuggestionList={setFriendSuggestionList}
                                        button
                                    ></AccountItem>
                                </div>
                            ))}
                        </PopperWrapper>
                    </div>
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

export default FriendSuggest;

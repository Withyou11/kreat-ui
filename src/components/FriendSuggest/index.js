import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '../AccountItem';
import styles from './FriendSuggest.module.scss';
const cx = classNames.bind(styles);
function FriendSuggest() {
    const fakeData = {
        nickname: 'abc@gmail.com',
        avatar: 'https://khoinguonsangtao.vn/wp-content/uploads/2022/06/avatar-anime-nu-cute.jpg',
        full_name: 'Rose Marry',
    };
    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <h3 className={cx('title')}>Friend Suggestions</h3>
                <hr />
                <AccountItem key={1} data={fakeData} button />
                <AccountItem key={2} data={fakeData} button />
                <AccountItem key={3} data={fakeData} button />
                <AccountItem key={4} data={fakeData} button />
            </PopperWrapper>
        </div>
    );
}

export default FriendSuggest;

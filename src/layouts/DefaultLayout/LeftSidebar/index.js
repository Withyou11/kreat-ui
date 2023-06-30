import classNames from 'classnames/bind';
import styles from './LeftSidebar.module.scss';
import CustomCalendar from '~/components/CustomCalendar';
import FriendSuggest from '~/components/FriendSuggest';
const cx = classNames.bind(styles);

function LeftSidebar() {
    return (
        <aside className={cx('wrapper')}>
            {/* <CustomCalendar /> */}
            <FriendSuggest />
        </aside>
    );
}

export default LeftSidebar;

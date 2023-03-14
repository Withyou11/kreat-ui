import classNames from 'classnames/bind';
import styles from './LeftSidebar.module.scss';

const cx = classNames.bind(styles);

function LeftSidebar() {
    return (
        <aside className={cx('wrapper')}>
            <h2>Left Sidebar</h2>
        </aside>
    );
}

export default LeftSidebar;

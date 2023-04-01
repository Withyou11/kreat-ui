import classNames from 'classnames/bind';
import Contact from '~/components/Contact';
import styles from './RightSidebar.module.scss';

const cx = classNames.bind(styles);

function RightSidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Contact />
        </aside>
    );
}

export default RightSidebar;

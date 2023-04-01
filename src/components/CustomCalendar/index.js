import classNames from 'classnames/bind';
import styles from './CustomCalendar.module.scss';
const cx = classNames.bind(styles);

function CustomCalendar() {
    return <div className={cx('wrapper')}></div>;
}

export default CustomCalendar;

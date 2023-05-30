import classNames from 'classnames/bind';
import styles from './NoLayout.module.scss';

function NoLayout({ children }) {
    const cx = classNames.bind(styles);

    return (
        <>
            <div className={cx('container_no_layout')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default NoLayout;

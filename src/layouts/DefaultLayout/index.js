import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <LeftSidebar />
                    <div className={cx('content')}>{children}</div>
                    <RightSidebar />
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;

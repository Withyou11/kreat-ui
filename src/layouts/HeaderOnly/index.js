import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';
import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
    const cx = classNames.bind(styles);

    return (
        <>
            <Header></Header>
            <div className={cx('container_header_only')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </>
    );
}

export default HeaderOnly;

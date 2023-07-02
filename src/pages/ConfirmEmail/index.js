import styles from './ConfirmEmail.module.scss';
import classNames from 'classnames/bind';
import logo from '~/assets/images/app_logo.png';

function ConfirmEmail() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title-container')}>
                <span className={cx('title')}>
                    Please verify your{' '}
                    <a className={cx('email')} href="https://gmail.com" target="_blank">
                        email
                    </a>
                </span>
            </div>
            <img className={cx('logo')} src={logo} alt="logo" />
            <div className={cx('title-container')}>
                <span className={cx('title')}>Your signing up is about to be completed...</span>
            </div>
        </div>
    );
}

export default ConfirmEmail;

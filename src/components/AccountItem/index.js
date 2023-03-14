import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.avatar} alt="Avatar" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>{data.full_name}</h4>
                <p className={cx('amount-common-friend')}>
                    6<span> Friends in Common</span>
                </p>
            </div>
        </Link>
    );
}

export default AccountItem;

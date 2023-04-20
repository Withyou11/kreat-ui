import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import reactIcons from '../General/reactIcons';

const cx = classNames.bind(styles);

function AccountItem({ data, button, active, inactive, user, onUserSelect, react }) {
    function handleAddFriend(e) {
        e.preventDefault();
        console.log('addFriend');
    }

    function handleOpenChatBox(e) {
        onUserSelect(user);
    }

    if (!active && !inactive) {
        return (
            <Link style={{ textDecoration: 'none' }} to={`/@${data.nickname}`} className={cx('wrapper')}>
                <img className={cx('avatar')} src={data.avatar} alt="Avatar" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{data.full_name}</h4>
                    <p className={cx('amount-common-friend')}>
                        6<span> Friends in Common</span>
                    </p>
                </div>
                {button && (
                    <Button
                        leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                        smallest
                        onClick={handleAddFriend}
                    ></Button>
                )}
                {react && <div style={{ margin: '10px 30px' }}>{reactIcons.get(react)}</div>}
            </Link>
        );
    } else {
        return (
            <button className={cx('wrapper')} onClick={handleOpenChatBox}>
                <img className={cx('avatar')} src={data.avatar} alt="Avatar" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{data.full_name}</h4>
                </div>
                {active && <FontAwesomeIcon style={{ color: '#00AB11', fontSize: '10px' }} icon={faCircle} />}
                {inactive && <FontAwesomeIcon style={{ color: '#D3D3D3', fontSize: '10px' }} icon={faCircle} />}
            </button>
        );
    }
}

export default AccountItem;

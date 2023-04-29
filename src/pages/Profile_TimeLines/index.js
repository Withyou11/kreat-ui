import styles from './Profile_TimeLines.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import ListPosts from '~/components/ListPosts';
function Profile_TimeLines(props) {
    const cx = classNames.bind(styles);

    return (
        <>
            <ProfileHeader />
            <div className={cx('list-post')}>
                <ListPosts />
            </div>
        </>
    );
}

export default Profile_TimeLines;

import classNames from 'classnames/bind';
import styles from './MemberItem.module.scss';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faKey, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import reactIcons from '../General/reactIcons';
import axios from 'axios';
import { io } from 'socket.io-client';

function MemberItem({ data, isLeader, setListMember, groupId, listMember }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    // let newListMember;
    const handleGoTimelines = () => {
        console.log('go timeline');
        // localStorage.setItem('anotherAccountId', data.id_account);
        // localStorage.setItem('anotherAccountName', data.fullName);
        // localStorage.setItem('anotherAccountAvatar', data.avatar);
        // navigate(`/timelines/${data.id_account}`);
    };

    const handleClickMember = (e) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure to remove this member?`)) {
            setListMember((prevList) => prevList.filter((member) => member.id !== data.id));
            axios
                .patch(
                    `http://localhost:3000/chat/update_group_chat/${groupId}`,
                    {
                        member: data.id,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((res) => {})
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div
            onClick={handleGoTimelines}
            style={{ textDecoration: 'none' }}
            // to={`/timelines/${data.id_account}`}
            className={cx('wrapper')}
        >
            <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
            <h4 className={cx('name')}>{data.fullName}</h4>
            {data.isLeader && <FontAwesomeIcon className={cx('icon')} icon={faKey}></FontAwesomeIcon>}

            {isLeader && !data.isLeader && (
                <Button
                    leftIcon={<FontAwesomeIcon icon={faUserMinus} />}
                    smallest
                    className={cx('clickIcon')}
                    onClick={handleClickMember}
                ></Button>
            )}
            {!isLeader && data.id === localStorage.getItem('accountId') && <p className={cx('me')}>Me</p>}
        </div>
    );
}

export default MemberItem;

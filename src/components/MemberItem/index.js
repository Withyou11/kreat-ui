import classNames from 'classnames/bind';
import styles from './MemberItem.module.scss';
import { Image } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function MemberItem({ data, isLeader, setListMember, groupId, listMember }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const [dict, setDict] = useState({});
    useEffect(() => {
        switch (localStorage.getItem('language')) {
            case 'english':
                setDict(enDict);
                break;
            case 'vietnamese':
                setDict(viDict);
                break;
        }
    }, []);
    // let newListMember;
    const handleGoTimelines = () => {
        localStorage.setItem('anotherAccountId', data.id_account);
        localStorage.setItem('anotherAccountName', data.fullName);
        localStorage.setItem('anotherAccountAvatar', data.avatar);
        navigate(`/timelines/${data.id_account}`);
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
            {!isLeader && data.id === localStorage.getItem('accountId') && <p className={cx('me')}>{dict.Me}</p>}
        </div>
    );
}

export default MemberItem;

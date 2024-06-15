import styles from './ListChat.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatItem from '../ChatItem';
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import CreateGroupModal from '../CreateGroupModal';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
function ListChat({ setShowListChats, handleUserSelect }) {
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

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const handleCreateButtonClick = (event) => {
        event.preventDefault();
        setIsCreateModalOpen(true);
    };
    useEffect(() => {
        axios
            .get(`http://localhost:3000/chat/conversations`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((res) => {
                setData(res.data.listConversation);
                setLoading(false);
            })
            .catch(() => {});
    }, []);

    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('titleContainer')}>
                <p className={cx('title')}>{dict.Chats}</p>
                <Button
                    leftIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    smallest
                    onClick={(event) => handleCreateButtonClick(event)}
                    className={cx('plusIcon')}
                ></Button>
            </div>
            {!loading ? (
                <div className={cx('container')}>
                    {data.length === 0 && <p className={cx('title1')}>{dict.No_Messages}</p>}
                    {data?.map((notification, index) => (
                        <div key={index}>
                            <ChatItem
                                data={notification}
                                setShowListChats={setShowListChats}
                                handleUserSelect={handleUserSelect}
                            ></ChatItem>
                            <hr style={{ margin: '0' }} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('dot-spinner')}>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                    <div className={cx('dot-spinner__dot')}></div>
                </div>
            )}
            {isCreateModalOpen && (
                <CreateGroupModal visible={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            )}
        </div>
    );
}

export default ListChat;

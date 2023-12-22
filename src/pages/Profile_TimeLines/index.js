import { useEffect, useState } from 'react';
import styles from './Profile_TimeLines.module.scss';
import classNames from 'classnames/bind';
import ProfileHeader from '~/components/ProfileHeader';
import Post from '~/components/Post';
import axios from 'axios';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
import SelectBar from '~/layouts/components/SelectBar';

function Profile_TimeLines(props) {
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

    const options = [
        { value: 'All', id: 1, title: dict.My_posts },
        { value: 'Tagged', id: 2, title: dict.My_taggedin_posts },
        { value: 'Scheduled', id: 3, title: dict.My_scheduled_posts },
    ];

    const [loading, setLoading] = useState(true);
    const [listMyPost, setListMyPost] = useState([]);
    const [listTaggedInPost, setListTaggedInPost] = useState([]);
    const [listSchedulePost, setListSchedulePost] = useState([]);
    const [selectedMode, setSelectedMode] = useState('All');
    const [title, setTitle] = useState(localStorage.getItem('language') === 'english' ? 'My posts' : 'Bài viết');

    // const [title, setTitle] = useState(dict.My_posts);
    let id = '';
    if (localStorage.getItem('anotherAccountId')) {
        id = localStorage.getItem('anotherAccountId');
    } else {
        id = localStorage.getItem('accountId');
    }
    const handleChangeMode = (e) => {
        setSelectedMode(e.target.value);
    };
    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            setTitle(dict.My_posts);
            try {
                const response1 = await axios.get(`https://kreat-api.onrender.com/accounts/${id}/timeline`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListMyPost(response1.data.timeline);
                localStorage.setItem('friendStatus', response1.data.friendStatus);
                localStorage.setItem('idFriendRequest', response1.data.id_friendRequest);
                if (localStorage.getItem('anotherAccountId')) {
                    localStorage.setItem('anotherAccountName', response1.data.fullName);
                }
                setLoading(false);

                const response2 = await axios.get(`https://kreat-api.onrender.com/accounts/tagged-in_post`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListTaggedInPost(response2.data.listPost);

                const response3 = await axios.get(`https://kreat-api.onrender.com/accounts/scheduled_posts`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setListSchedulePost(response3.data.listPost);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, []);
    const cx = classNames.bind(styles);

    return (
        <>
            {!loading && <ProfileHeader />}
            {!loading && selectedMode === 'All' && (
                <>
                    {
                        <>
                            {!localStorage.getItem('anotherAccountId') && (
                                <SelectBar
                                    options={options}
                                    selectedMode={selectedMode}
                                    setSelectedMode={setSelectedMode}
                                    title={title ? title : dict.My_posts}
                                    setTitle={setTitle}
                                />
                            )}
                            <div className={cx('list-post')}>
                                {listMyPost?.length > 0 ? (
                                    listMyPost?.map((post, index) => (
                                        <div key={index}>
                                            <Post data={post} />
                                        </div>
                                    ))
                                ) : (
                                    <p className={cx('no-post')}>{dict.No_posts_to_show}</p>
                                )}
                            </div>
                        </>
                    }
                </>
            )}
            {!loading && selectedMode === 'Tagged' && (
                <>
                    {
                        <>
                            {!localStorage.getItem('anotherAccountId') && (
                                <SelectBar
                                    options={options}
                                    selectedMode={selectedMode}
                                    setSelectedMode={setSelectedMode}
                                    title={title ? title : dict.My_posts}
                                    setTitle={setTitle}
                                />
                            )}
                            <div className={cx('list-post')}>
                                {listTaggedInPost?.length > 0 ? (
                                    listTaggedInPost?.map((post, index) => (
                                        <div key={index}>
                                            <Post data={post} />
                                        </div>
                                    ))
                                ) : (
                                    <p className={cx('no-post')}>No posts to show</p>
                                )}
                            </div>
                        </>
                    }
                </>
            )}

            {!loading && selectedMode === 'Scheduled' && (
                <>
                    {
                        <>
                            {!localStorage.getItem('anotherAccountId') && (
                                <SelectBar
                                    options={options}
                                    selectedMode={selectedMode}
                                    setSelectedMode={setSelectedMode}
                                    title={title ? title : dict.My_posts}
                                    setTitle={setTitle}
                                />
                            )}
                            <div className={cx('list-post')}>
                                {listSchedulePost?.length > 0 ? (
                                    listSchedulePost?.map((post, index) => (
                                        <div key={index}>
                                            <Post data={post} />
                                        </div>
                                    ))
                                ) : (
                                    <p className={cx('no-post')}>No posts to show</p>
                                )}
                            </div>
                        </>
                    }
                </>
            )}

            {loading && (
                <div className={cx('loading-wave')}>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                    <div className={cx('loading-bar')}></div>
                </div>
            )}
        </>
    );
}

export default Profile_TimeLines;

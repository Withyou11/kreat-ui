import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { useContext } from 'react';
import Button from '~/components/Button';
import { SocketContext } from '~/Context/SocketContext/SocketContext';
import Modal from 'react-bootstrap/Modal';
import Peer from 'simple-peer';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
import {
    faVideoSlash,
    faMicrophoneSlash,
    faPhoneSlash,
    faVideo,
    faMicrophone,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';

function VideoCall() {
    const socket = useContext(SocketContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const conversationId = queryParams.get('conversationId');
    const userId = queryParams.get('userId');
    const currentUser = queryParams.get('currentUser');

    const encodedPeerData = queryParams.get('peerData');
    const peerData = encodedPeerData ? JSON.parse(decodeURIComponent(encodedPeerData)) : null;

    const userName = queryParams.get('userName');

    const [isMicOpen, setIsMicOpen] = useState(true);
    const [isVideoOpen, setIsVideoOpen] = useState(true);

    const [callEnded, setCallEnded] = useState(false);

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

    // Define Call video variables
    const [stream, setStream] = useState();
    const [userStream, setUserStream] = useState();
    const [callAccepted, setCallerAccepted] = useState(false);
    // const [callEnded, setCallEnded] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const callUser = (conversationId, userId) => {
        const peer = new SimplePeer({
            initiator: true,
            trickle: false,
            stream: stream,
            config: {
                iceServers: [
                    {
                        urls: 'stun:stun.relay.metered.ca:80',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:80',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:80?transport=tcp',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:443',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:443?transport=tcp',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                ],
            },
        });
        peer.on('signal', (peerData) => {
            socket.emit('callUser', {
                id_conversation: conversationId,
                peerData: peerData,
                id_sender: localStorage.getItem('accountId'),
                id_receiver: userId,
            });
        });

        peer?.on('stream', (currentStream) => {
            setUserStream(currentStream);
        });

        socket.on('callAccepted', (data) => {
            setCallerAccepted(true);
            peer.signal(data?.peerData);
        });

        connectionRef.current = peer;
    };

    const answerCall = (conversationId, userId) => {
        setCallerAccepted(true);

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
            config: {
                iceServers: [
                    {
                        urls: 'stun:stun.relay.metered.ca:80',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:80',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:80?transport=tcp',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:443',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                    {
                        urls: 'turn:a.relay.metered.ca:443?transport=tcp',
                        username: '7b444593c8c63afdd778f3d7',
                        credential: 'GpkNVLi0gxKgxu4u',
                    },
                ],
            },
        });

        peer.on('signal', (peerData) => {
            socket.emit('answerCall', {
                peerData: peerData,
                id_sender: localStorage.getItem('accountId'),
                id_receiver: userId,
                id_conversation: conversationId,
            });
        });
        peer?.on('stream', (currentStream) => {
            setUserStream(currentStream);
        });

        peer.signal(peerData);

        connectionRef.current = peer;
    };

    useEffect(() => {
        const initializeMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(mediaStream);
            } catch (error) {
                console.error('Error accessing user media:', error);
            }
        };
        initializeMedia();
    }, []);

    useEffect(() => {
        if (localStorage.getItem('accountId')) {
            socket.emit('addUserCalling', {
                id_conversation: conversationId,
                id_account: localStorage.getItem('accountId'),
            });
        }
        socket.on('callEnded', () => {
            setCallEnded(true);
        });
    }, []);

    useEffect(() => {
        if (callEnded && stream) {
            stream.getTracks().forEach((track) => track.stop());
            connectionRef?.current?.destroy();
        }
    }, [callEnded]);

    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
            if (currentUser === 'caller') {
                callUser(conversationId, userId);
            } else {
                answerCall(conversationId, userId);
            }
        }
    }, [stream]);
    useEffect(() => {
        if (userVideo.current && userStream) {
            userVideo.current.srcObject = userStream;
        }
    }, [userStream]);

    const leaveCall = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        connectionRef?.current?.destroy();
        window.close();
    };

    const cx = classNames.bind(styles);

    const handleToggleMic = () => {
        const audioTrack = stream.getTracks().find((track) => track.kind === 'audio');
        if (isMicOpen) {
            audioTrack.enabled = false;
            setIsMicOpen(!isMicOpen);
        } else {
            audioTrack.enabled = true;
            setIsMicOpen(!isMicOpen);
        }
    };

    const handleToggleVideo = () => {
        const videoTrack = stream.getTracks().find((track) => track.kind === 'video');
        if (isVideoOpen) {
            videoTrack.enabled = false;
            setIsVideoOpen(!isVideoOpen);
        } else {
            videoTrack.enabled = true;
            setIsVideoOpen(!isVideoOpen);
        }
    };

    const handleCloseTab = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
        connectionRef?.current?.destroy();

        window.close();
    };

    return (
        <div className={cx('wrapper')}>
            {!callEnded ? (
                <>
                    <p className={cx('title')}>{dict.Video_Call}</p>
                    <div className={cx('videoContainer')}>
                        {stream && (
                            <div className={cx('video')}>
                                <p className={cx('name')}>{dict.You}</p>
                                <video
                                    playsInline
                                    muted
                                    ref={myVideo}
                                    autoPlay
                                    style={{
                                        width: '45vw',
                                    }}
                                ></video>
                            </div>
                        )}
                        {callAccepted && (
                            <div className={cx('video')}>
                                <p className={cx('name')}>{userName}</p>
                                <video playsInline ref={userVideo} autoPlay style={{ width: '45vw' }}></video>
                            </div>
                        )}
                        {!callAccepted && (
                            <div className={cx('video')}>
                                <p className={cx('name')}>{userName}</p>
                                <div className={cx('loading')}>
                                    <section className={cx('dots-container')}>
                                        <div className={cx('dot')}></div>
                                        <div className={cx('dot')}></div>
                                        <div className={cx('dot')}></div>
                                        <div className={cx('dot')}></div>
                                        <div className={cx('dot')}></div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={cx('button-container')}>
                        {!isMicOpen ? (
                            <button className={cx('white-button')} onClick={handleToggleMic}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMicrophoneSlash}></FontAwesomeIcon>
                            </button>
                        ) : (
                            <button className={cx('red-button')} onClick={handleToggleMic}>
                                <FontAwesomeIcon className={cx('icon')} icon={faMicrophone}></FontAwesomeIcon>
                            </button>
                        )}
                        <button className={cx('end')} onClick={leaveCall}>
                            <FontAwesomeIcon className={cx('delete-user-icon')} icon={faPhoneSlash}></FontAwesomeIcon>
                        </button>
                        {!isVideoOpen ? (
                            <button className={cx('white-button')} onClick={handleToggleVideo}>
                                <FontAwesomeIcon className={cx('icon')} icon={faVideoSlash}></FontAwesomeIcon>
                            </button>
                        ) : (
                            <button className={cx('red-button')} onClick={handleToggleVideo}>
                                <FontAwesomeIcon className={cx('icon')} icon={faVideo}></FontAwesomeIcon>
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <p className={cx('title')}>{dict.Video_Call}</p>
                    <div style={{ display: 'flex', height: '80vh' }}>
                        <p style={{ margin: 'auto', fontSize: '2.4rem', fontWeight: '500' }}>{dict.Call_ended}</p>
                    </div>
                    <div className={cx('button-container')}>
                        <button className={cx('red-button')} onClick={handleCloseTab}>
                            <FontAwesomeIcon className={cx('icon')} icon={faTimes}></FontAwesomeIcon>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default VideoCall;

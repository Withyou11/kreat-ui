import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';
import { useEffect, useState, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { useContext } from 'react';
import Button from '~/components/Button';
import { SocketContext } from '~/Context/SocketContext/SocketContext';
import Modal from 'react-bootstrap/Modal';
import Peer from 'simple-peer';

import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function VideoCall({ conversationId, userId, currentUser, peerData, userName }) {
    const socket = useContext(SocketContext);

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
                        urls: 'stun:stun.l.google.com:19302',
                    },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        username: 'webrtc@live.com',
                        credential: 'muazkh',
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
                        urls: 'stun:stun.l.google.com:19302',
                    },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        username: 'webrtc@live.com',
                        credential: 'muazkh',
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
        // setCallEnded(true);
        connectionRef.current.destroy();
    };

    const cx = classNames.bind(styles);

    return (
        <Modal show={true} animation={false}>
            <Modal.Body>
                <div className={cx('wrapper')}>
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
                                        height: '40vh',
                                        width: '20vw',
                                    }}
                                ></video>
                            </div>
                        )}
                        {callAccepted && (
                            <div className={cx('video')}>
                                <p className={cx('name')}>{userName}</p>
                                <video
                                    playsInline
                                    ref={userVideo}
                                    autoPlay
                                    style={{ width: '20vw', height: '40vh' }}
                                ></video>
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
                    <Button className={cx('end')} onClick={leaveCall}>
                        {dict.End}
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default VideoCall;

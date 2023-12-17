import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';
import { useEffect, useState, useRef } from 'react';
import SimplePeer from 'simple-peer';
import { useContext } from 'react';
import Button from '~/components/Button';
import { SocketContext } from '~/Context/SocketContext/SocketContext';
import Modal from 'react-bootstrap/Modal';
import Peer from 'simple-peer';

function VideoCall({ conversationId, userId, currentUser, peerData }) {
    const socket = useContext(SocketContext);
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

        const peer = new Peer({ initiator: false, trickle: false, stream });

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
                    <div className={cx('videoContainer')}>
                        {stream && (
                            <video
                                playsInline
                                muted
                                ref={myVideo}
                                autoPlay
                                style={{ width: '23vw', margin: 'auto' }}
                            ></video>
                        )}
                        {callAccepted && (
                            <video
                                playsInline
                                muted
                                ref={userVideo}
                                autoPlay
                                style={{ width: '23vw', margin: 'auto' }}
                            ></video>
                        )}
                    </div>
                    <Button className={cx('end')} onClick={leaveCall}>
                        End
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default VideoCall;

import classNames from 'classnames/bind';
import styles from './VideoCall.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplePeer from 'simple-peer';
import { useContext } from 'react';
import Button from '~/components/Button';
import { io } from 'socket.io-client';
import { SocketContext } from '~/Context/SocketContext/SocketContext';
import Modal from 'react-bootstrap/Modal';

function VideoCall({ peer }) {
    const socket = useContext(SocketContext);
    console.log(peer);
    // Define Call video variables
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callAccepted, setCallerAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        const initializeMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(mediaStream);
                // setUserStream(mediaStream);
            } catch (error) {
                console.error('Error accessing user media:', error);
            }
        };

        initializeMedia();
    }, []);

    useEffect(() => {
        if (myVideo.current && stream) {
            myVideo.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        socket.on('callAccepted', (data) => {
            setCallerAccepted(true);
            console.log('listening on callAccepted successfully');
            peer.signal(data.peerData, function () {
                console.log('connecting');
            });
        });

        peer?.on('stream', (stream) => {
            // if (userVideo.current) {
            userVideo.current.srcObject = stream;
            // }
        });
    }, []);

    const leaveCall = () => {
        setCallEnded(true);
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

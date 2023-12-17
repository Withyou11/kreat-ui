import styles from './ConfirmVideoCall.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { faPhoneVolume, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { io } from 'socket.io-client';
import SimplePeer from 'simple-peer';
import VideoCall from '~/pages/VideoCall';

const socket = io.connect('https://kreat-socket.onrender.com');

function ConfirmVideoCall({ data, setCallingData }) {
    const cx = classNames.bind(styles);
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(true);
    const [calling, setCalling] = useState(false);
    const [callAccepted, setCallerAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [peer, setPeer] = useState(null);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const answerCall = () => {
        const peer = new SimplePeer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        setPeer(peer);

        peer.on('signal', (peerData) => {
            socket.emit('answerCall', {
                peerData: peerData,
                id_sender: localStorage.getItem('accountId'),
                id_receiver: data.id_sender,
                id_conversation: data.id_conversation,
            });
        });

        peer.signal(data.peerData);
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };
    function handleConfirm() {
        answerCall();
        setCalling(true);
        setReceivingCall(false);
    }

    const handleCancel = () => {
        setReceivingCall(false);
        leaveCall();
    };

    return receivingCall ? (
        <Modal show={true} animation={false} centered>
            <Modal.Body>
                <div className={cx('infoContainer')}>
                    <Image className={cx('avatar')} cloudName="dzuzcewvj" publicId={data.avatar} crop="scale" />
                    <p className={cx('name')}>{data.fullName}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <div className={cx('titleContainer')}>
                        <FontAwesomeIcon icon={faPhoneVolume} style={{ marginRight: '10px' }} />
                        <i className={cx('title')}>is calling you</i>
                    </div>
                </div>
                <div className={cx('loading')}>
                    <section className={cx('dots-container')}>
                        <div className={cx('dot')}></div>
                        <div className={cx('dot')}></div>
                        <div className={cx('dot')}></div>
                        <div className={cx('dot')}></div>
                        <div className={cx('dot')}></div>
                    </section>
                </div>

                <div className={cx('btnContainer')}>
                    <button className={cx('buttonDeny')} onClick={handleCancel}>
                        Deny
                    </button>
                    <button className={cx('buttonConfirm')} onClick={handleConfirm}>
                        Accept
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    ) : calling ? (
        peer && <VideoCall peer={peer}></VideoCall>
    ) : null;
}

export default ConfirmVideoCall;

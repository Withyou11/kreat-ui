import styles from './ConfirmVideoCall.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'cloudinary-react';
import { useState, useRef } from 'react';
import { faPhoneVolume, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { io } from 'socket.io-client';
import VideoCall from '~/pages/VideoCall';

function ConfirmVideoCall({ data, setCallingData }) {
    const cx = classNames.bind(styles);
    const [receivingCall, setReceivingCall] = useState(true);
    const [calling, setCalling] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const connectionRef = useRef();

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };
    function handleConfirm() {
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
        <VideoCall
            conversationId={data?.id_conversation}
            userId={data?.id_sender}
            currentUser={'answerer'}
            peerData={data?.peerData}
        ></VideoCall>
    ) : null;
}

export default ConfirmVideoCall;

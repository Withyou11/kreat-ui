import styles from './ConfirmVideoCall.module.scss';
import classNames from 'classnames/bind';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'cloudinary-react';
import { useState, useRef, useEffect } from 'react';
import { faPhoneVolume, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { io } from 'socket.io-client';
import VideoCall from '~/pages/VideoCall';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

function ConfirmVideoCall({ data }) {
    const cx = classNames.bind(styles);
    const [receivingCall, setReceivingCall] = useState(true);
    const [callEnded, setCallEnded] = useState(false);
    const connectionRef = useRef();

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

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
    };
    function handleConfirm() {
        setReceivingCall(false);
        const encodedPeerData = encodeURIComponent(JSON.stringify(data?.peerData));
        const videoCallUrl = `/video-call/${data.id_conversation}?conversationId=${data.id_conversation}&userId=${data?.id_sender}&currentUser=answerer&peerData=${encodedPeerData}&userName=${data.fullName}`;

        window.open(videoCallUrl, '_blank');
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
                        <i className={cx('title')}>{dict.is_calling_you}</i>
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
                        {dict.Deny}
                    </button>
                    <button className={cx('buttonConfirm')} onClick={handleConfirm}>
                        {dict.Accept}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    ) : null;
}

export default ConfirmVideoCall;

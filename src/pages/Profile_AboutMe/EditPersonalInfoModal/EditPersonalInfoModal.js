import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';

import styles from './EditPersonalInfoModal.module.scss';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';

const cx = classNames.bind(styles);

function EditPersonalInfoModal({ onClose, personalInfo, onSave }) {
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

    const [data, setData] = useState(personalInfo);
    const [gender, setGender] = useState(data.gender);
    const handleChangeGender = (e) => {
        setGender(e.target.value);
        handleChange(e, 'gender');
    };

    const [marital, setMarital] = useState(data.maritalStatus);
    const handleChangeMarital = (e) => {
        setMarital(e.target.value);
        handleChange(e, 'maritalStatus');
    };
    const handleChange = (event, fieldName) => {
        setData((prevData) => ({
            ...prevData,
            [fieldName]: event.target.value,
        }));
    };

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    return (
        <Modal style={{ marginLeft: '-6.8%' }} show={true} onHide={onClose} animation={false}>
            <Modal.Body>
                <div style={{ display: 'flex' }}>
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>{dict.Update_your_information}</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <form>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="aboutMe">
                            {dict.About_me}
                        </label>
                        <textarea
                            id="aboutMe"
                            value={data.aboutMe}
                            onChange={(event) => handleChange(event, 'aboutMe')}
                            className={cx('form-control1')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="birthday">
                            {dict.Birthday}
                        </label>
                        <input
                            type="text"
                            id="birthday"
                            value={data.birthday}
                            onChange={(event) => handleChange(event, 'birthday')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="liveIn">
                            {dict.Lives_in}
                        </label>
                        <input
                            type="text"
                            id="liveIn"
                            value={data.liveIn}
                            onChange={(event) => handleChange(event, 'liveIn')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="occupation">
                            {dict.Occupation}
                        </label>
                        <input
                            type="text"
                            id="occupation"
                            value={data.occupation}
                            onChange={(event) => handleChange(event, 'occupation')}
                            className={cx('form-control')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="gender">
                            {dict.Gender}
                        </label>
                        <select
                            className={cx('form-control2')}
                            id="gender"
                            value={gender}
                            onChange={(e) => handleChangeGender(e)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="marital">
                            {dict.Status}
                        </label>
                        <select
                            className={cx('form-control2')}
                            id="marital"
                            value={marital}
                            onChange={(e) => handleChangeMarital(e)}
                        >
                            <option value="Single">Single</option>
                            <option value="Dating">Dating</option>
                            <option value="Married">Married</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="religion">
                            {dict.Religion}
                        </label>
                        <input
                            type="text"
                            id="religion"
                            value={data.religion}
                            onChange={(event) => handleChange(event, 'religion')}
                            className={cx('form-control')}
                        />
                    </div>
                </form>

                <button className={cx('buttonDone')} onClick={handleSave}>
                    {dict.Update}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default EditPersonalInfoModal;

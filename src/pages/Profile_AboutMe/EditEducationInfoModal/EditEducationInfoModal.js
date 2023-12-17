import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import enDict from '~/Language/en';
import viDict from '~/Language/vi';
import styles from './EditEducationInfoModal.module.scss';

const cx = classNames.bind(styles);

function EditEducationInfoModal({ onClose, educationInfo, onSave }) {
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

    const [data, setData] = useState(educationInfo);
    function getCurrentYear() {
        return new Date().getFullYear();
    }
    function generateYearOptions(startYear, endYear) {
        const options = [];
        for (let year = startYear; year <= endYear; year++) {
            options.push(
                <option key={year} value={year}>
                    {year}
                </option>,
            );
        }

        return options;
    }
    const [yearStartPrimarySchool, setYearStartPrimarySchool] = useState(data.yearStartPrimarySchool);
    const handleChangeYearStartPrimarySchool = (e) => {
        setYearStartPrimarySchool(e.target.value);
        handleChange(e, 'yearStartPrimarySchool');
    };
    const [yearEndPrimarySchool, setYearEndPrimarySchool] = useState(data.yearEndPrimarySchool);
    const handleChangeYearEndPrimarySchool = (e) => {
        setYearEndPrimarySchool(e.target.value);
        handleChange(e, 'yearEndPrimarySchool');
    };
    const [yearStartSecondarySchool, setYearStartSecondarySchool] = useState(data.yearStartSecondarySchool);
    const handleChangeYearStartSecondarySchool = (e) => {
        setYearStartSecondarySchool(e.target.value);
        handleChange(e, 'yearStartSecondarySchool');
    };
    const [yearEndSecondarySchool, setYearEndSecondarySchool] = useState(data.yearEndSecondarySchool);
    const handleChangeYearEndSecondarySchool = (e) => {
        setYearEndSecondarySchool(e.target.value);
        handleChange(e, 'yearEndSecondarySchool');
    };
    const [yearStartHighSchool, setYearStartHighSchool] = useState(data.yearStartHighSchool);
    const handleChangeYearStartHighSchool = (e) => {
        setYearStartHighSchool(e.target.value);
        handleChange(e, 'yearStartHighSchool');
    };
    const [yearEndHighSchool, setYearEndHighSchool] = useState(data.yearEndHighSchool);
    const handleChangeYearEndHighSchool = (e) => {
        setYearEndHighSchool(e.target.value);
        handleChange(e, 'yearEndHighSchool');
    };
    const [yearStartUniversity, setYearStartUniversity] = useState(data.yearStartUniversity);
    const handleChangeYearStartUniversity = (e) => {
        setYearStartUniversity(e.target.value);
        handleChange(e, 'yearStartUniversity');
    };
    const [yearEndUniversity, setYearEndUniversity] = useState(data.yearEndUniversity);
    const handleChangeYearEndUniversity = (e) => {
        setYearEndUniversity(e.target.value);
        handleChange(e, 'yearEndUniversity');
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
                    <h3 style={{ margin: 'auto 12px', flex: 1 }}>{dict.Update_your_education_information}</h3>
                    <button className={cx('delete-image-button')} onClick={onClose}>
                        <FontAwesomeIcon className={cx('delete-user-icon')} icon={faTimes}></FontAwesomeIcon>
                    </button>
                </div>
                <hr style={{ margin: '8px' }} />
                <form>
                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="primarySchool">
                            {dict.Primary_school}
                        </label>
                        <input
                            id="primarySchool"
                            value={data.primarySchool}
                            onChange={(event) => handleChange(event, 'primarySchool')}
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('yearContainer')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label1')} htmlFor="yearStartPrimarySchool">
                                {dict.Start}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearStartPrimarySchool"
                                value={yearStartPrimarySchool !== 0 ? yearStartPrimarySchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearStartPrimarySchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label2')} htmlFor="yearEndPrimarySchool">
                                {dict.End}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearEndPrimarySchool"
                                value={yearEndPrimarySchool !== 0 ? yearEndPrimarySchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearEndPrimarySchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="secondarySchool">
                            {dict.Secondary_school}
                        </label>
                        <input
                            id="secondarySchool"
                            value={data.secondarySchool}
                            onChange={(event) => handleChange(event, 'secondarySchool')}
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('yearContainer')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label1')} htmlFor="yearStartSecondarySchool">
                                {dict.Start}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearStartSecondarySchool"
                                value={yearStartSecondarySchool !== 0 ? yearStartSecondarySchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearStartSecondarySchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label2')} htmlFor="yearEndSecondarySchool">
                                {dict.End}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearEndPrimarySchool"
                                value={yearEndSecondarySchool !== 0 ? yearEndSecondarySchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearEndSecondarySchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="highSchool">
                            {dict.High_school}
                        </label>
                        <input
                            id="highSchool"
                            value={data.highSchool}
                            onChange={(event) => handleChange(event, 'highSchool')}
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('yearContainer')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label1')} htmlFor="yearStartHighSchool">
                                {dict.Start}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearStartHighSchool"
                                value={yearStartHighSchool !== 0 ? yearStartHighSchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearStartHighSchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label2')} htmlFor="yearEndHighSchool">
                                {dict.End}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearEndHighSchool"
                                value={yearEndHighSchool !== 0 ? yearEndHighSchool : getCurrentYear()}
                                onChange={(e) => handleChangeYearEndHighSchool(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <div className={cx('form-group')}>
                        <label className={cx('label1')} htmlFor="university">
                            {dict.University}
                        </label>
                        <input
                            id="university"
                            value={data.university}
                            onChange={(event) => handleChange(event, 'university')}
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('yearContainer')}>
                        <div className={cx('form-group')}>
                            <label className={cx('label1')} htmlFor="yearStartUniversity">
                                {dict.Start}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearStartUniversity"
                                value={yearStartUniversity !== 0 ? yearStartUniversity : getCurrentYear()}
                                onChange={(e) => handleChangeYearStartUniversity(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                        <div className={cx('form-group')}>
                            <label className={cx('label2')} htmlFor="yearEndUniversity">
                                {dict.End}
                            </label>
                            <select
                                className={cx('form-control2')}
                                id="yearEndUniversity"
                                value={yearEndUniversity !== 0 ? yearEndUniversity : getCurrentYear()}
                                onChange={(e) => handleChangeYearEndUniversity(e)}
                            >
                                {generateYearOptions(1920, 2030)}
                            </select>
                        </div>
                    </div>
                </form>
                <button className={cx('buttonDone')} onClick={handleSave}>
                    {dict.Update}
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default EditEducationInfoModal;

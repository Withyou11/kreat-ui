import styles from './SelectBar.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
function SelectBar({ options, setSelectedMode, selectedMode, title, setTitle }) {
    const cx = classNames.bind(styles);
    const [isOptionsContainerActive, setOptionsContainerActive] = useState(false);
    const handleChangeMode = (value, title) => {
        setSelectedMode(value);
        setTitle(title);
        setOptionsContainerActive(false);
    };
    return (
        <div className={cx('container')}>
            <div className={cx('select-box')}>
                <div className={cx('options-container', { active: isOptionsContainerActive })}>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={cx('option')}
                            onClick={() => handleChangeMode(option.value, option.title)}
                        >
                            <input type="radio" className={cx('radio')} id={option.id} name="category" />
                            <label htmlFor={option.id}>{option.title}</label>
                        </div>
                    ))}
                </div>
                <div className={cx('selected')} onClick={() => setOptionsContainerActive(!isOptionsContainerActive)}>
                    {title}
                </div>
            </div>
        </div>
    );
}

export default SelectBar;

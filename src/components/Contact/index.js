import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ListAccountItem from '../ListAccountItem';

import styles from './Contact.module.scss';

function Contact() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('title-container')}>
                    <h3 className={cx('title')}>Contact</h3>
                    <input placeholder="Find your friend..." spellCheck="false" />
                    <hr />
                </div>
                <ListAccountItem />
            </PopperWrapper>
        </div>
    );
}

export default Contact;

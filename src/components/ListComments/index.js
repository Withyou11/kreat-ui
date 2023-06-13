import styles from './ListComments.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Comment from '../Comment';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ListComments({ data }) {
    const cx = classNames.bind(styles);
    const handleSubmit = (e) => {
        e.preventDefault();
        // call API post comment here
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-comment')}>
                {/* <PopperWrapper> */}
                {data.map((comment) => (
                    <div key={Math.random()}>
                        <Comment data={comment}></Comment>
                    </div>
                ))}
                {/* </PopperWrapper> */}
            </div>
            <div className={cx('comment-input-bar')}>
                <form onSubmit={handleSubmit}>
                    <input className={cx('input')} type="text" placeholder="Write your comment here..." />
                    <button className={cx('submit')} type="submit">
                        <FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ListComments;

import haha from '~/assets/images/haha.png';
import wow from '~/assets/images/wow.png';
import sad from '~/assets/images/sad.png';
import angry from '~/assets/images/angry.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from './reactIncons.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const reactIcons = new Map([
    ['like', <FontAwesomeIcon key="like" className={cx('like')} icon={faThumbsUp}></FontAwesomeIcon>],
    ['love', <FontAwesomeIcon key="love" className={cx('love')} icon={faHeart}></FontAwesomeIcon>],
    ['haha', <img key="haha" className={cx('haha')} alt="reaction" src={haha}></img>],
    ['wow', <img key="wow" className={cx('wow')} alt="reaction" src={wow}></img>],
    ['sad', <img key="sad" className={cx('sad')} alt="reaction" src={sad}></img>],
    ['angry', <img key="angry" className={cx('angry')} alt="reaction" src={angry}></img>],
]);

export default reactIcons;

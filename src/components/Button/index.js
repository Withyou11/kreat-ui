import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Button.module.scss';
import hahaImg from '~/assets/images/haha.png';
import wowImg from '~/assets/images/wow.png';
import sadImg from '~/assets/images/sad.png';
import angryImg from '~/assets/images/angry.png';
const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    small = false,
    smallest = false,
    large = false,
    disabled = false,
    children,
    haha = false,
    wow = false,
    sad = false,
    angry = false,
    leftIcon,
    rightIcon,
    className,
    onClick,
}) {
    let Comp = 'button';
    const props = { onClick };
    const classes = cx('wrapper', {
        [className]: className,
        primary,
        outline,
        small,
        smallest,
        large,
        disabled,
        text,
    });

    if (to) {
        props.to = to;
        Comp = 'Link';
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {haha && <img className={cx('Img')} alt="reaction" src={hahaImg}></img>}
            {wow && <img className={cx('Img')} alt="reaction" src={wowImg}></img>}
            {sad && <img className={cx('Img')} alt="reaction" src={sadImg}></img>}
            {angry && <img className={cx('Img')} alt="reaction" src={angryImg}></img>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;

import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

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
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;

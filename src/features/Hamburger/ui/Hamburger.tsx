import { memo, type ButtonHTMLAttributes } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Hamburger.module.scss';

type HamburgerProps = {
  className?: string;
  isOpen?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Hamburger = memo(({ className, isOpen, ...otherProps }: HamburgerProps) => (
  <button
    type='button'
    className={classNames(styles.hamburger, { [styles.open]: isOpen }, [className])}
    {...otherProps}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>
));

export default Hamburger;

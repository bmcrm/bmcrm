import { ButtonHTMLAttributes } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Hamburger.module.scss';

type HamburgerProps = {
  className?: string;
  isOpen?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Hamburger = ({ className, isOpen, ...otherProps }: HamburgerProps) => {
  return (
    <button
      type='button'
      className={classNames(styles.hamburger, { [styles.open]: isOpen }, [className])}
      {...otherProps}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default Hamburger;

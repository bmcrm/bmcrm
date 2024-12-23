import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { classNames, type Additional, type Mods } from '@shared/lib/classNames';
import { ButtonColor, ButtonSize, ButtonTheme } from '../model/types/Button.types';
import styles from './Button.module.scss';

type ButtonProps = {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  color?: ButtonColor;
  fluid?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    className,
    type = 'button',
    theme = ButtonTheme.PRIMARY,
    size = ButtonSize.M,
    color = ButtonColor.WHITE,
    fluid = false,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.fluid]: fluid,
  };
  const additional: Additional = [className, styles[theme], styles[size], styles[color]];

  return (
    <button ref={ref} type={type} className={classNames(styles.btn, mods, additional)} {...otherProps}>
      {children}
    </button>
  );
});

export default Button;

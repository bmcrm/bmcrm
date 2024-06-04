import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { ButtonColor, ButtonSize, ButtonTheme } from './Button.types.ts';
import { classNames, type Additional, type Mods } from 'shared/lib/classNames/classNames';

type ButtonProps = {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  color?: ButtonColor;
  fluid?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
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
    <button type={type} className={classNames(styles.btn, mods, additional)} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

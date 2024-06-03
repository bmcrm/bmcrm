import styles from './Button.module.scss';
import { ButtonHTMLAttributes } from 'react';
import { ButtonColor, ButtonSize, ButtonTheme } from './ButtonTypes';
import { classNames, type Additional, type Mods } from 'shared/lib/classNames/classNames';

type ButtonProps = {
	className?: string;
	theme?: ButtonTheme;
	size?: ButtonSize;
	color?: ButtonColor;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
	const {
		children,
		className,
		type = 'button',
		theme = ButtonTheme.PRIMARY,
		size = ButtonSize.M,
		color = ButtonColor.WHITE,
		...otherProps
	} = props;

	const mods: Mods = {};
	const additional: Additional = [
		className,
		styles[theme],
		styles[size],
		styles[color],
	];

	return (
		<button
			type={type}
			className={classNames(styles.btn, mods, additional)}
			{...otherProps}
		>
			{children}
		</button>
	);
};

export default Button;

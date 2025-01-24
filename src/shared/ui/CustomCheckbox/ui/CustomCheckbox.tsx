import { memo, type InputHTMLAttributes } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './CustomCheckbox.module.scss';

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	label?: string;
}

const CustomCheckbox = memo((props: CustomCheckboxProps) => {
	const { className, label, ...rest } = props;

	return (
		<label className={classNames(styles.checkbox, {}, [className])}>
			<input
				type={'checkbox'}
				className={styles.input}
				{...rest}
			/>
			 <p className={styles.label}>{label}</p>
		</label>
	);
});

export default CustomCheckbox;
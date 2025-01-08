import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './DetailsEditing.module.scss';

type DetailsEditingProps = {
	className?: string;
};

const DetailsEditing = memo((props: DetailsEditingProps) => {
	const { className } = props;

	return (
		<div className={classNames(styles.details, {}, [className])}>
			<p>editing</p>
		</div>
	);
});

export { DetailsEditing };
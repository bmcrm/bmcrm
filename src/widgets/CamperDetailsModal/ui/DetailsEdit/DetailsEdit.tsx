import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './DetailsEdit.module.scss';

type DetailsEditProps = {
	className?: string;
};

const DetailsEdit = memo((props: DetailsEditProps) => {
	const { className } = props;

	return (
		<div className={classNames(styles.details, {}, [className])}>
			<p>edit</p>
		</div>
	);
});

export { DetailsEdit };
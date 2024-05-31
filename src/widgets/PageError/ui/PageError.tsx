import styles from './PageError.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

type PageErrorProps = {
	className?: string;
};

const PageError = memo(({ className }: PageErrorProps) => {
	const onReload = () => {
		location.reload(); 
	};

	return (
		<div className={classNames(styles.pageError, {}, [className])}>
			<h1>An error has occurred!</h1>
			<button onClick={onReload}>Refresh the page</button>
		</div>
	);
});

export default PageError;

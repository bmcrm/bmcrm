import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './DetailsTitle.module.scss';

type DetailsTitleProps = {
	className?: string;
	title: string;
};

const DetailsTitle = memo(({ className, title }: DetailsTitleProps) => (
	<h3 className={classNames(styles.title, {}, [className])}>{title}</h3>
));

export { DetailsTitle };
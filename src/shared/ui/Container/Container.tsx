import styles from './Container.module.scss';
import { type HTMLProps } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

type ContainerProps = {
	className?: string;
	fluid?: boolean;
} & HTMLProps<HTMLElement>;

const Container = ({ className, children, fluid }: ContainerProps) => {
	return (
		<div className={classNames(styles.container, { [styles.containerFluid]: fluid }, [className])}>
			{children}
		</div>
	);
};

export default Container;

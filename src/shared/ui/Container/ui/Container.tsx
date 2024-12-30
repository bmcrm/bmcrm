import type { HTMLProps } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Container.module.scss';

type ContainerProps = {
  className?: string;
  fluid?: boolean;
} & HTMLProps<HTMLElement>;

const Container = ({ className, children, fluid }: ContainerProps) =>
  <div className={classNames(styles.container, { [styles.containerFluid]: fluid }, [className])}>{children}</div>;

export default Container;

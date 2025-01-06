import type { HTMLProps } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Container.module.scss';

interface ContainerProps extends HTMLProps<HTMLDivElement> {
  className?: string;
  fluid?: boolean;
}

const Container = ({ className, children, fluid, ...rest }: ContainerProps) =>
  <div
    className={classNames(styles.container, { [styles.containerFluid]: fluid }, [className])}
    {...rest}
  >
    {children}</div>;

export default Container;

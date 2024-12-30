import type { ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './ContentWrapper.module.scss';

type ContentWrapperProps = {
  className?: string;
  children?: ReactNode;
};

const ContentWrapper = ({ children, className }: ContentWrapperProps) => (
  <div className={classNames(styles.content, {}, [className])}>{children}</div>
);

export default ContentWrapper;

import type { CSSProperties, ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Tooltip.module.scss';

type TooltipProps = {
  className?: string;
  children?: ReactNode;
  properties?: {
    top?: string | number;
    left?: string | number;
    right?: string | number;
    bottom?: string | number;
    width?: string | number;
    height?: string | number;
    transform?: string;
  };
};

const Tooltip = (props: TooltipProps) => {
  const { className, children, properties } = props;

  const tooltipStyles: CSSProperties = {
    top: properties?.top,
    left: properties?.left,
    right: properties?.right,
    bottom: properties?.bottom,
    width: properties?.width,
    height: properties?.height,
    transform: properties?.transform,
  };

  return (
    <div className={classNames(styles.tooltip, {}, [className])} style={tooltipStyles}>
      {children}
    </div>
  );
};

export default Tooltip;

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import styles from './Tooltip.module.scss';

type TooltipProps = {
	className?: string;
	children?: ReactNode;
	properties?: {
		top?: CSSProperties['top'];
		left?: CSSProperties['left'];
		right?: CSSProperties['right'];
		bottom?: CSSProperties['bottom'];
		width?: CSSProperties['width'];
		height?: CSSProperties['height'];
		transform?: CSSProperties['transform'];
	};
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
	(props, ref) => {
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
			<div ref={ref} className={classNames(styles.tooltip, {}, [className])} style={tooltipStyles}>
				{children}
			</div>
		);
	});

export default Tooltip;

import { memo, type ReactNode, type CSSProperties } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Tooltip } from '@shared/ui/Tooltip';
import styles from './TooltipIcon.module.scss';

type TooltipIconProps = {
	className?: string;
	icon: ReactNode;
	iconSize?: IconSize;
	tooltipText: string;
	iconStyle?: CSSProperties;
};

const TooltipIcon = memo((props: TooltipIconProps) => {
	const { className, icon, iconSize, tooltipText, iconStyle } = props;

	return (
		<div className={classNames(styles.wrapper, {}, [className])}>
			<Icon icon={icon} size={iconSize} style={iconStyle} />
			<Tooltip className={styles.tooltip}>{tooltipText}</Tooltip>
		</div>
	);
});

export default TooltipIcon;
import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import styles from './TruncatedTextTooltip.module.scss';

type TruncatedTextTooltipProps = {
	className?: string;
	text: string;
};

const TruncatedTextTooltip = memo(({ className, text }: TruncatedTextTooltipProps) => (
	<Tooltip className={classNames(styles.tooltip, {}, [className])}><p>{text}</p></Tooltip>
));

export { TruncatedTextTooltip };
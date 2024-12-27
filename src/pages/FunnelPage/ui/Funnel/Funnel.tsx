import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Progress, ProgressColors } from '@shared/ui/Progress';
import { CamperRole } from '@entities/Camper';
import styles from './Funnel.module.scss';

type FunnelCampers = {
	[CamperRole.LEAD]: number;
	[CamperRole.QUALIFIED]: number;
	[CamperRole.INTENT]: number;
	[CamperRole.CAMPER]: number;
};

type FunnelProps = {
	className?: string;
	campers: FunnelCampers;
};

const Funnel = memo(({ className, campers }: FunnelProps) => {
	const { isTablet } = useMedia();
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const tooltipRefs = useRef<Array<HTMLDivElement | null>>([]);
	const totalCampers = Object.values(campers).reduce((acc, current) => acc + current, 0);

	const handleToggle = useCallback(
		(index: number) => setOpenIndex(prevIndex => (prevIndex === index ? null : index)),
		[]
	);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (openIndex !== null) {
				const tooltip = tooltipRefs.current[openIndex];
				if (tooltip && !tooltip.contains(event.target as Node)) {
					setOpenIndex(null);
				}
			}
		},
		[openIndex]
	);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [handleClickOutside]);

	const stages = [
		{
			count: campers[CamperRole.LEAD],
			color: ProgressColors.ORANGE_LIGHT,
			description:
				'Potential fetchCampers who have expressed interest in participating but have not yet confirmed their participation',
		},
		{
			count: campers[CamperRole.QUALIFIED],
			color: ProgressColors.ORANGE_DARK,
			description: 'People who have already registered or have shown a specific level of interest',
		},
		{
			count: campers[CamperRole.INTENT],
			color: ProgressColors.RUBY_LIGHT,
			description:
				'Participants who confirmed their intention to participate in the camp and showed a high level of interest',
		},
		{
			count: campers[CamperRole.CAMPER],
			color: ProgressColors.RUBY_DARK,
			description:
				'Participants confirmed their intention to participate in the camp and showed a high level of interest',
		},
	];

	return (
		<ul className={classNames(styles.funnel, {}, [className])}>
			{stages.map((item, index) => {
				const barWidth = totalCampers === 0 ? 0 : Math.round((item.count * 100) / totalCampers);

				return (
					<li key={index} className={styles.funnel__item}>
						<Progress
							count={item.count}
							color={item.color}
							barWidth={`${barWidth}%`}
							symbol={isTablet}
							onClick={e => {
								e.stopPropagation();
								handleToggle(index);
							}}
						/>
						<div
							ref={el => (tooltipRefs.current[index] = el)}
							className={classNames(styles.funnel__tooltip, { [styles.show]: openIndex === index }, [])}
							onClick={e => e.stopPropagation()}
						>
							<p className={styles.text}>{item.description}</p>
						</div>
					</li>
				);
			})}
		</ul>
	);
});

export default Funnel;

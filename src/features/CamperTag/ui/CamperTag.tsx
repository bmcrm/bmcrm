import { memo, useCallback, useEffect, useRef, useState, type RefObject, type CSSProperties } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import { Portal } from '@shared/ui/Portal';
import { CamperTagTheme } from '../model/types/CamperTag.types';
import styles from './CamperTag.module.scss';

type CamperTagProps = {
	className?: string;
	theme?: CamperTagTheme;
	tag: { name: string; details: string[] };
	portalTargetRef?: RefObject<HTMLDivElement>;
	tableScrollRef?: RefObject<HTMLDivElement>;
};

const CamperTag = memo((props: CamperTagProps) => {
	const { className, theme = CamperTagTheme.DEFAULT, tag: { name, details }, portalTargetRef, tableScrollRef } = props;
	const [tooltipProperties, setTooltipProperties] = useState<CSSProperties>({ bottom: '90%', left: 15 });
	const tagRef = useRef<HTMLDivElement>(null);
	const { isOpen, open, close } = useToggle();

	const calculatePosition = useCallback(() => {
		if (tagRef?.current && portalTargetRef?.current) {
			const tagRect = tagRef.current.getBoundingClientRect();
			const portalRect = portalTargetRef.current.getBoundingClientRect();
			const bottom = portalRect.bottom - tagRect.top - 5;
			const left = tagRect.left - portalRect.left + 15;

			setTooltipProperties({
				bottom: `${bottom}px`,
				left: `${left}px`,
			});
		}
	}, [portalTargetRef?.current]);

	useEffect(() => {
		calculatePosition();
		const tableScroll = tableScrollRef?.current;

		if (tableScroll) {
			tableScroll.addEventListener('scroll', calculatePosition);
		}

		return () => {
			if (tableScroll) {
				tableScroll.removeEventListener('scroll', calculatePosition);
			}
		};
	}, [calculatePosition]);

	const tooltip = (
		<Tooltip className={styles.tag__tooltip} properties={tooltipProperties}>
			<ul>
				{details.map((detail, i) => (
					<li key={`detail-${i}`} className={styles.tag__detail}>{detail}</li>
				))}
			</ul>
		</Tooltip>
	);

	return (
		<div
			ref={tagRef}
			className={classNames(styles.tag, {}, [className, styles[theme]])}
			onMouseEnter={open}
			onClick={open}
			onMouseLeave={close}
		>
			<p className={styles.tag__name}>{name}</p>
			{isOpen && details && (
				<>
					{portalTargetRef?.current ? (
						<Portal element={portalTargetRef.current}>{tooltip}</Portal>
					) : (
						tooltip
					)}
				</>
			)}
		</div>
	);
});

export default CamperTag;
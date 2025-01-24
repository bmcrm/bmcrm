import { memo } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Tooltip } from '@shared/ui/Tooltip';
import styles from './CamperTag.module.scss';

type CamperTagProps = {
	className?: string;
	tag: { name: string; details: string[] };
};

const CamperTag = memo((props: CamperTagProps) => {
	const { className, tag: { name, details } } = props;
	const { isOpen, open, close } = useToggle();

	return (
		<div
			className={classNames(styles.tag, {}, [className])}
			onMouseEnter={open}
			onMouseLeave={close}
		>
			<p className={styles.tag__name}>{name}</p>
			{isOpen && details && (
				<Tooltip className={styles.tag__tooltip} properties={{ bottom: '90%', left: '15px' }}>
					<ul>
						{details.map((detail, i) => (
							<li key={`detail-${i}`} className={styles.tag__detail}>{detail}</li>
						))}
					</ul>
				</Tooltip>
			)}
		</div>
	);
});

export default CamperTag;
import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { DetailsTitle } from '../DetailsTitle/DetailsTitle';
import { CamperTag } from '@features/CamperTag';
import type { CamperTags } from '@entities/Camper';
import styles from './DetailsTags.module.scss';

type DetailsTagsProps = {
	className?: string;
	tags: CamperTags;
};

const DetailsTags = memo(({ className, tags }: DetailsTagsProps) => (
	<div className={classNames(styles.tags, {}, [className])}>
		<DetailsTitle title={'Tags'} />
		<ul className={styles.tags__list}>
			{Object.entries(tags).map(([name, details], i) => (
				<li key={`${name}-${i}`}>
					<CamperTag tag={{ name, details }} />
				</li>
			))}
		</ul>
	</div>
));

export { DetailsTags };
import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Loader } from '@shared/ui/Loader';
import { useGetCamp } from '@entities/Camp';
import { useGetCampers, CamperRole } from '@entities/Camper';
import { userState } from '@entities/User';
import styles from './CampDetails.module.scss';
import GlobalIcon from '@shared/assets/icons/global_icon.svg';
import LocationIcon from '@shared/assets/icons/location_icon.svg';

type CampDetailsProps = {
	className?: string;
};

const CampDetails = memo(({ className }: CampDetailsProps) => {
	const { tokens: { decodedIDToken } } = userState();
	const {
		data: { camp_name, camp_website, camp_id, city, camp_description } = {},
		isLoading,
	} = useGetCamp({ campID: decodedIDToken?.camp_id ?? '' });
	const { data: campers } = useGetCampers();

	const campersCount = {
		[CamperRole.PROSPECT]: campers?.filter(({ role }) => role === CamperRole.PROSPECT).length,
		[CamperRole.QUALIFIED]: campers?.filter(({ role }) => role === CamperRole.QUALIFIED).length,
		[CamperRole.INTENT]: campers?.filter(({ role }) => role === CamperRole.INTENT).length,
		[CamperRole.CAMPER]: campers?.filter(({ role }) =>
			(role === CamperRole.TCO || role === CamperRole.COORG || role === CamperRole.CAMPER)).length,
	};

	return (
		<div className={classNames(styles.details, {}, [className])}>
			{isLoading ? <Loader className={'m-centred-hv'} /> : (
				<>
					<div className={styles.details__heading}>
						<h1>{camp_name}</h1>
						<p>ID: {camp_id}</p>
					</div>
					{(camp_website || city) && (
						<ul className={styles.details__address}>
							{camp_website && (
								<li className={styles.details__addressItem}>
									<a
										href={camp_website.startsWith('http') ? camp_website : `https://${camp_website}`}
										target={'_blank'}
										rel={'noopener noreferrer'}
										className={styles.details__addressLink}
									>
										<Icon icon={<GlobalIcon />} size={IconSize.SIZE_24} />
										Website
									</a>
								</li>
							)}
							{city && (
								<li className={styles.details__addressItem}>
									<Icon icon={<LocationIcon />} size={IconSize.SIZE_24} />
									{city}
								</li>
							)}
						</ul>
					)}
					<p>{camp_description}</p>
					<ul className={styles.details__campers}>
						<li className={styles.details__campersItem}>
							<p className={styles.caption}>{CamperRole.PROSPECT}</p>
							<p className={styles.counter}>{campersCount[CamperRole.PROSPECT]}</p>
						</li>
						<li className={styles.details__campersItem}>
							<p className={styles.caption}>{CamperRole.INTENT}</p>
							<p className={styles.counter}>{campersCount[CamperRole.INTENT]}</p>
						</li>
						<li className={styles.details__campersItem}>
							<p className={styles.caption}>{CamperRole.QUALIFIED}</p>
							<p className={styles.counter}>{campersCount[CamperRole.QUALIFIED]}</p>
						</li>
						<li className={styles.details__campersItem}>
							<p className={styles.caption}>{CamperRole.CAMPER}</p>
							<p className={styles.counter}>{campersCount[CamperRole.CAMPER]}</p>
						</li>
					</ul>
				</>
			)}
		</div>
	);
});

export { CampDetails };
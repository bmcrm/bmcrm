import { memo, useMemo } from 'react';
import { format } from 'date-fns';
import { capitalizedCamperName } from '@shared/lib/capitalizedCamperName';
import { dateNormalize } from '@shared/lib/dateNormalize';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { userState } from '@entities/User';
import { CamperRole, type ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsHead.module.scss';
import CheckIcon from '@shared/assets/icons/check.svg';
import ClockIcon from '@shared/assets/icons/clock.svg';
import EditIcon from '@shared/assets/icons/edit_icon.svg';

type HeadContentProps = {
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
};

const HeadContent = memo((props: HeadContentProps) => {
	const { setTheme, camper: {
		first_name,
		last_name,
		playa_name,
		email,
		email_confirmed,
		city,
		created_at,
		updated_at,
		visitedBM,
		birthdayDate,
	}} = props;
	const { tokens: { decodedIDToken } } = userState();
	const canEdit = decodedIDToken?.role === CamperRole.TCO
		|| decodedIDToken?.role === CamperRole.COORG
		|| decodedIDToken?.email === email;

	const capitalizedName = useMemo(
		() => capitalizedCamperName({ first_name, last_name, playa_name, email }),
		[email, first_name, last_name, playa_name]
	);

	return (
		<div className={styles.head__content}>
			<div className={styles.head__title}>
				<h2>{capitalizedName ?? 'Loading...'}</h2>
				<div className={styles.head__status}>
					<Icon
						icon={email_confirmed ? <CheckIcon /> : <ClockIcon />}
						size={IconSize.SIZE_24}
						style={{ color: `var(${email_confirmed ? '--color-green-light' : '--color-neutral'})` }}
					/>
					{canEdit && (
						<Button
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							className={styles.head__editBtn}
							onClick={() => setTheme(CamperDetailsModalTheme.EDIT)}
							aria-label={'Edit details button'}
						>
							<Icon icon={<EditIcon />} size={IconSize.SIZE_24} />
						</Button>
					)}
				</div>
			</div>
			<a href={`mailto: ${email}`} aria-label={'Camper email'} className={styles.head__email}>{email}</a>
			<ul className={styles.head__details}>
				{city && <li>{city}</li>}
				{birthdayDate && <li>Birthday: {format(birthdayDate, 'dd.MM.yyyy')}</li>}
				<li>Added: {dateNormalize(created_at)}</li>
				<li>Updated: {dateNormalize(updated_at)}</li>
				{visitedBM && visitedBM.length > 0 && <li>BM`s: {visitedBM.join(', ')}</li>}
			</ul>
		</div>
	);
});

export { HeadContent };
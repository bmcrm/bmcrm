import { memo, useMemo, type ReactNode } from 'react';
import { capitalizedCamperName } from '@shared/lib/capitalizedCamperName';
import { dateFormatter } from '@shared/lib/dateFormatter';
import { Icon, IconSize } from '@shared/ui/Icon';
import { TooltipIcon } from '@features/TooltipIcon';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { DeleteCamperButton } from '@features/DeleteCamperButton';
import { userState } from '@entities/User';
import { useGetCampers, type ICamper, CamperRole } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsHead.module.scss';
import CheckIcon from '@shared/assets/icons/check.svg';
import ClockIcon from '@shared/assets/icons/clock.svg';
import EditIcon from '@shared/assets/icons/edit_icon.svg';
import CreatedCamperIcon from '@shared/assets/icons/admin-created_icon.svg';

type HeadContentProps = {
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
	onClose?: () => void;
};

const HeadContent = memo((props: HeadContentProps) => {
	const { setTheme, onClose, camper: {
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
		createdBy,
		role,
	}} = props;
	const { tokens: { decodedIDToken } } = userState();
	const { data: campers } = useGetCampers();

	const createdCamper = campers?.find(camper => camper.email === createdBy);
	const createdCamperName = createdCamper?.first_name && createdCamper?.last_name
		? `${createdCamper?.first_name} ${createdCamper?.last_name}`
		: 'admin';

	const currentStatus = email_confirmed === true
		? 'true'
		: email_confirmed === false
			? 'false'
			: 'adminCreated';

	const canEdit = decodedIDToken?.role === CamperRole.TCO
		|| decodedIDToken?.role === CamperRole.COORG
		|| decodedIDToken?.email === email;

	const canDelete = decodedIDToken?.role === CamperRole.TCO
		? decodedIDToken?.email !== email
		: decodedIDToken?.role === CamperRole.COORG
			? role !== CamperRole.TCO && (decodedIDToken?.email === email || role !== CamperRole.COORG)
			: decodedIDToken?.email === email;

	const capitalizedName = useMemo(
		() => capitalizedCamperName({ first_name, last_name, playa_name, email }),
		[email, first_name, last_name, playa_name]
	);

	const statusIcons: Record<string, { icon: ReactNode; color?: string, text: string }> = {
		true: {
			icon: <CheckIcon />,
			color: '--color-green-light',
			text: 'Confirmed',
		},
		false: {
			icon: <ClockIcon />,
			color: '--color-neutral',
			text: 'Not confirmed',
		},
		adminCreated: {
			icon: <CreatedCamperIcon />,
			text: `Created by ${createdCamperName}`,
		},
	};

	return (
		<div className={styles.head__content}>
			<div className={styles.head__title}>
				<h2>{capitalizedName ?? 'Loading...'}</h2>
				<div className={styles.head__status}>
					<TooltipIcon
						icon={statusIcons[currentStatus].icon}
						iconSize={IconSize.SIZE_24}
						tooltipText={statusIcons[currentStatus].text}
						iconStyle={{ color: `var(${statusIcons[currentStatus].color})` }}
					/>
					{canEdit && (
						<>
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.head__editBtn}
								onClick={() => setTheme(CamperDetailsModalTheme.EDIT)}
								aria-label={'Edit details button'}
							>
								<Icon icon={<EditIcon />} size={IconSize.SIZE_24} />
							</Button>
							{canDelete && (
								<DeleteCamperButton
									camperEmail={email}
									camperName={`${first_name} ${last_name}`}
									additionalHandler={onClose}
									buttonTheme={ButtonTheme.CLEAR}
									buttonSize={ButtonSize.TEXT}
									buttonColor={ButtonColor.NEUTRAL}
									buttonAriaLabel={'Delete camper button in details modal'}
									iconSize={IconSize.SIZE_24}
									icon
								/>
							)}
						</>
					)}
				</div>
			</div>
			<a href={`mailto: ${email}`} aria-label={'Camper email'} className={styles.head__email}>{email}</a>
			<ul className={styles.head__details}>
				{city && <li>{city}</li>}
				{birthdayDate && <li>Birthday: {dateFormatter(birthdayDate, 'withoutYear')}</li>}
				<li>Added: {dateFormatter(created_at)}</li>
				{updated_at && <li>Updated: {dateFormatter(updated_at)}</li>}
				{visitedBM && visitedBM.length > 0 && <li>BM`s: {visitedBM.join(', ')}</li>}
			</ul>
		</div>
	);
});

export { HeadContent };
import { memo, useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';
import { classNames } from '@shared/lib/classNames';
import { capitalizedCamperName } from '@shared/lib/capitalizedCamperName';
import { useMedia } from '@shared/hooks/useMedia';
import { useToggle } from '@shared/hooks/useToggle';
import { dateNormalize } from '@shared/lib/dateNormalize';
import { Avatar } from '@shared/ui/Avatar';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { AddSocialModal } from '@features/AddSocialModal';
import { SocialIconItem } from '@features/SocialIconItem';
import type { CamperSocial, ICamper } from '@entities/Camper';
import styles from './CamperDetailsHeader.module.scss';
import CheckIcon from '@shared/assets/icons/check.svg';
import ClockIcon from '@shared/assets/icons/clock.svg';
import EditIcon from '@shared/assets/icons/edit_icon.svg';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';

interface ICamperDetailsHeaderProps {
	camper?: ICamper;
	socialIcons: CamperSocial[];
  isReadonly: boolean;
  toggleReadonly: () => void;
	setSocialIcons: Dispatch<SetStateAction<CamperSocial[]>>;
}

const CamperDetailsHeader = memo((props: ICamperDetailsHeaderProps) => {
	const {
		camper,
		isReadonly,
		socialIcons,
		toggleReadonly,
		setSocialIcons,
	} = props;
	const { isOpen, open, close } = useToggle();
	const { isTablet } = useMedia();

	const capitalizedName = useMemo(() => {
		if (!camper) return null;

		const { first_name, last_name, playa_name, email } = camper;

		return capitalizedCamperName({ first_name, last_name, playa_name, email });
	}, [camper]);

	const handleAddSocial = useCallback(
		(values: CamperSocial) => {
			if (socialIcons.length < 5) {
				setSocialIcons(prev => [...prev, { name: values.name, url: values.url }]);
			}

			close();
		},
		[close, setSocialIcons, socialIcons.length]
	);

	const handleRemoveSocial = useCallback((index: number) => {
		setSocialIcons(prev => prev.filter((_, i) => i !== index));
	}, [setSocialIcons]);

	return (
		<div className={styles.head}>
			<Avatar
				src={camper?.avatar || null}
				alt={capitalizedName ?? 'camper'}
				size={isTablet ? 70 : 125}
				className={styles.head__avatar}
			/>
			<div className={styles.head__heading}>
				<div className={styles.head__title}>
					<h2>{capitalizedName}</h2>
					<div className={styles.head__icons}>
						<Icon
							icon={camper?.email_confirmed ? <CheckIcon /> : <ClockIcon />}
							size={IconSize.SIZE_24}
							style={{ color: camper?.email_confirmed ? '#4ECB71' : 'var(--color-neutral)' }}
						/>
						{isReadonly && (
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.btn}
								onClick={toggleReadonly}
							>
								<Icon icon={<EditIcon />} size={IconSize.SIZE_24} style={{ color: 'var(--color-neutral)' }}/>
							</Button>
						)}
					</div>
				</div>
				<ul className={styles.head__socials}>
					{socialIcons.map((icon, i) => (
						<SocialIconItem
							key={i}
							social={icon}
							readonly={isReadonly}
							onRemove={() => handleRemoveSocial(i)}
						/>
					))}
					{!isReadonly && socialIcons.length < 5 && (
						<li>
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={classNames(styles.btn, {}, [styles.btnSocial])}
								onClick={open}
							>
								<Icon icon={<PlusIcon/>} size={IconSize.SIZE_10}/>
							</Button>
						</li>
					)}
				</ul>
				{!isReadonly && <AddSocialModal isOpen={isOpen} onClose={close} onSubmit={handleAddSocial} />}
			</div>
			<div className={styles.head__info}>
				{!isTablet && (
					<a href={`mailto: ${camper?.email}`} className={styles.email}>
						{camper?.email}
					</a>
				)}
				<div className={styles.head__infoInner}>
					{camper?.city && <p>{camper?.city}</p>}
					<p>Added: {dateNormalize(camper?.created_at as string)}</p>
					<p>BMs: 2022, 2023</p>
					<p>Updated: {dateNormalize(camper?.updated_at as string)}</p>
				</div>
			</div>
		</div>
	);
});

export { CamperDetailsHeader };
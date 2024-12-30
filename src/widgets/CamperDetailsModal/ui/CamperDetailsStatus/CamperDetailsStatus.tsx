import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { CamperRole, type ICamper } from '@entities/Camper';
import type { IIDToken } from '@entities/User';
import styles from './CamperDetailsStatus.module.scss';

type CamperDetailsStatusProps = {
	className?: string;
	camper?: ICamper;
	isReadonly: boolean;
	decodedIDToken: IIDToken | null;
};

const CamperDetailsStatus = memo((props: CamperDetailsStatusProps) => {
	const { className, camper, isReadonly, decodedIDToken } = props;

	const selectOptions = Object.values(CamperRole)
		.filter(role => role !== CamperRole.TCO)
		.map(role => ({
			value: role,
			content: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
		}));

	return (
		<div className={classNames(styles.status, {}, [className])}>
			{(isReadonly || decodedIDToken?.role !== CamperRole.TCO || camper?.role === CamperRole.TCO) && (
				<p className={classNames(styles.status__role, { [styles.tco]: camper?.role === CamperRole.TCO }, [])}>
					{camper?.role}
				</p>
			)}
			{!isReadonly && decodedIDToken?.role === CamperRole.TCO && camper?.role !== CamperRole.TCO && (
				<CustomSelect name={'role'} options={selectOptions} className={styles.status__select}/>
			)}
		</div>
	);
});

export { CamperDetailsStatus };
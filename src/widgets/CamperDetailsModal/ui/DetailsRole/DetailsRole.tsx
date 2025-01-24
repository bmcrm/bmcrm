import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { CamperRole } from '@entities/Camper';
import styles from './DetailsRole.module.scss';

type DetailsRoleProps = {
	className?: string;
	role: CamperRole;
};

const DetailsRole = memo(({ className, role }: DetailsRoleProps) => (
	<div className={classNames(styles.role, {}, [className])}>
		<p>{role === CamperRole.TCO ? role.toUpperCase() : role}</p>
	</div>
));

export { DetailsRole };
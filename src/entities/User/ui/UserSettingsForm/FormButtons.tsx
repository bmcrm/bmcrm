import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { DeleteCamperButton } from '@features/DeleteCamperButton';
import { CamperRole } from '@entities/Camper';
import styles from './UserSettingsForm.module.scss';

type FormButtonsProps = {
	className?: string;
	role?: CamperRole;
	camperEmail: string;
	dirty: boolean
};

const FormButtons = memo(({ className, role, camperEmail, dirty }: FormButtonsProps) => (
	<div className={classNames(styles.form__buttons, {}, [className])}>
		<Button type={'submit'} disabled={!dirty}>Save changes</Button>
		{role !== CamperRole.TCO && (
			<DeleteCamperButton
				camperEmail={camperEmail}
				buttonTheme={ButtonTheme.PASSIVE}
				buttonSize={ButtonSize.M}
				buttonColor={ButtonColor.BLACK}
				buttonLabel={'Delete account'}
			/>
		)}
	</div>
));

export { FormButtons };
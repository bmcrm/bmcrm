import { memo } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { DeleteCamperButton } from '@features/DeleteCamperButton';
import { userState } from '@entities/User';
import { CamperRole } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';

type DetailsFormButtonsProps = {
	handleCancel: () => void;
	role?: CamperRole;
	camperEmail: string;
	camperName?: string;
	onClose?: () => void;
};

const DetailsFormButtons = memo((props: DetailsFormButtonsProps) => {
	const { handleCancel, role, camperEmail, camperName, onClose } = props;
	const { tokens: { decodedIDToken } } = userState();

	const canDelete = decodedIDToken?.role === CamperRole.TCO
		? decodedIDToken?.email !== camperEmail
		: decodedIDToken?.role === CamperRole.COORG
			? role !== CamperRole.TCO && (decodedIDToken?.email === camperEmail || role !== CamperRole.COORG)
			: decodedIDToken?.email === camperEmail;

	return (
		<div className={styles.form__buttons}>
			<Button type={'submit'}>Save</Button>
			{canDelete && (
				<DeleteCamperButton
					camperEmail={camperEmail}
					camperName={camperName}
					additionalHandler={onClose}
					buttonAriaLabel={'Delete camper button in edit modal'}
					icon
				/>
			)}
			<Button
				className={styles.form__btnCancel}
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				color={ButtonColor.NEUTRAL}
				onClick={handleCancel}
			>
				Cancel
			</Button>
		</div>
	);
});

export { DetailsFormButtons };
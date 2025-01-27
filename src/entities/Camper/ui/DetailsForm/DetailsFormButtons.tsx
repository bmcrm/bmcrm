import { memo } from 'react';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import styles from './DetailsForm.module.scss';

type DetailsFormButtonsProps = {
	handleCancel: () => void;
};

const DetailsFormButtons = memo(({ handleCancel }: DetailsFormButtonsProps) => (
	<div className={styles.form__buttons}>
		<Button type={'submit'}>Save</Button>
		<Button
			className={styles.btnCancel}
			theme={ButtonTheme.CLEAR}
			size={ButtonSize.TEXT}
			color={ButtonColor.NEUTRAL}
			onClick={handleCancel}
		>
			Cancel
		</Button>
	</div>
));

export { DetailsFormButtons };
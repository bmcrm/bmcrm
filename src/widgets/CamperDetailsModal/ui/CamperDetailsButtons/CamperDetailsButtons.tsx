import { memo } from 'react';
import { useFormikContext, type FormikHelpers } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import type { ICamper } from '@entities/Camper';
import styles from './CamperDetailsButtons.module.scss';

type CamperDetailsButtonsProps = {
	className?: string;
	handleCancel: (resetForm: FormikHelpers<Partial<ICamper>>['resetForm']) => void;
};

const CamperDetailsButtons = memo((props: CamperDetailsButtonsProps) => {
	const { className, handleCancel } = props;
	const { resetForm } = useFormikContext();

	return (
		<div className={classNames(styles.buttons, {}, [className])}>
			<Button type={'submit'}>Save</Button>
			<Button
				className={styles.btnCancel}
				theme={ButtonTheme.CLEAR}
				size={ButtonSize.TEXT}
				color={ButtonColor.NEUTRAL}
				onClick={() => handleCancel(resetForm)}
			>
				Cancel
			</Button>
		</div>
	);
});

export { CamperDetailsButtons };
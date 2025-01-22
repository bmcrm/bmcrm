import { memo, useCallback, useMemo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { generateInitialValues } from '../../lib/generateInitialValues';
import { DetailsForm, type ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';
import styles from './DetailsEdit.module.scss';

type DetailsEditProps = {
	className?: string;
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
};

const DetailsEdit = memo((props: DetailsEditProps) => {
	const { className, camper, setTheme } = props;

	const initialValues = useMemo(() => generateInitialValues(camper), [camper]);

	const handleCancel = useCallback(() => setTheme(CamperDetailsModalTheme.DEFAULT), [setTheme]);

	return (
		<div className={classNames(styles.details, {}, [className])}>
			<DetailsForm initialValues={initialValues} handleCancel={handleCancel} />
		</div>
	);
});

export { DetailsEdit };
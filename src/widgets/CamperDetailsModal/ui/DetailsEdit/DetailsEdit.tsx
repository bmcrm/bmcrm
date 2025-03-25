import { memo, useCallback, useMemo } from 'react';
import { generateInitialValues } from '../../lib/generateInitialValues';
import { DetailsForm, type ICamper } from '@entities/Camper';
import { CamperDetailsModalTheme } from '../../model/types/CamperDetailsModal.types';

type DetailsEditProps = {
	className?: string;
	camper: ICamper;
	setTheme: (theme: CamperDetailsModalTheme) => void;
	onClose?: () => void;
};

const DetailsEdit = memo((props: DetailsEditProps) => {
	const { className, camper, setTheme, onClose } = props;

	const initialValues = useMemo(() => generateInitialValues(camper), [camper]);

	const handleCancel = useCallback(() => setTheme(CamperDetailsModalTheme.DEFAULT), [setTheme]);

	return (
		<DetailsForm
			className={className}
			initialValues={initialValues}
			handleCancel={handleCancel}
			onClose={onClose}
			camperEmail={camper.email}
		/>
	);
});

export { DetailsEdit };
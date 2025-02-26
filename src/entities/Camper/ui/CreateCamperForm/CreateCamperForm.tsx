import { memo, useCallback, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@shared/ui/Button';
import { FormikInput } from '@shared/ui/FormikInput';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { FormLoader } from '@features/FormLoader';
import { useCreateCamper, type ICamper, CamperRole } from '@entities/Camper';
import { createCamperSchema } from '@shared/const/validationSchemas';
import { roleOptions } from '../../lib/generateSelectOptions';
import { initialValues } from '../../model/data/CreateCamperForm.data';
import styles from './CreateCamperForm.module.scss';

type CreateCamperFormProps = {
	onClose?: () => void;
};

const CreateCamperForm = memo(({ onClose }: CreateCamperFormProps) => {
	const { mutateAsync: createCamper, isPending } = useCreateCamper();

	const filteredRoleOptions = useMemo(
		() =>
			roleOptions.filter(option => option.value !== CamperRole.TCO),
		[]
	);

	const handleSubmit = useCallback(
		async (values: Partial<ICamper>, { resetForm }: { resetForm: () => void }) => {
			await createCamper(values);
			resetForm();
			onClose?.();
		},
		[onClose, createCamper]
	);

	return (
		<>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={createCamperSchema}>
				<Form className={styles.form}>
					<FormikInput name={'email'} label={'Email'} placeholder={'cole@gmail.com'} />
					<div className={styles.form__row}>
						<FormikInput name={'first_name'} label={'First Name'} placeholder={'Larry'} />
						<FormikInput name={'last_name'} label={'Last Name'} placeholder={'Harvey'} />
					</div>
					<CustomSelect name={'role'} label={'Role'} options={filteredRoleOptions} />
					<Button type={'submit'} className={'m-centred'}>Create</Button>
				</Form>
			</Formik>
			{isPending && <FormLoader />}
		</>
	);
});

export default CreateCamperForm;
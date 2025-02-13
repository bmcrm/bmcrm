import { memo, useCallback } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button } from '@shared/ui/Button';
import { FormikCheckbox } from '@shared/ui/FormikCheckbox';
import { initialData, leftInputs, rightInputs } from '../../model/data/TCORegisterForm.data';
import { registrationSchema } from '@shared/const/validationSchemas';
import { RoutePath } from '@app/providers/AppRouter';
import { CamperRole } from '@entities/Camper';
import type { ITCORegistrationData } from '../../model/types/User.types';
import styles from './TCORegisterForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

interface TCORegisterFormProps {
	handleSubmit: (values: ITCORegistrationData, resetForm: () => void) => void;
}

const TCORegisterForm = memo(({ handleSubmit }: TCORegisterFormProps) => {
	const onSubmitHandler = useCallback(
		(values: typeof initialData, { resetForm }: FormikHelpers<typeof initialData>) => {
			const data: ITCORegistrationData = {
				camp_name: values.camp_name.trim(),
				camp_id: values.camp_id.trim(),
				camp_website: values.camp_website.trim(),
				city: values.city.trim(),
				first_name: values.first_name.trim(),
				last_name: values.last_name.trim(),
				playa_name: values.playa_name.trim(),
				email: values.email.trim(),
				password: values.password.trim(),
				accept: Boolean(values.accept),
				role: CamperRole.TCO,
			};

			handleSubmit(data, resetForm);
		},
		[handleSubmit]
	);

	return (
		<Formik initialValues={initialData} validationSchema={registrationSchema} onSubmit={onSubmitHandler}>
			<Form className={styles.form}>
				<div className={styles.form__inner}>
					{leftInputs.map((input) => (
						<FormikInput key={input.name} {...input} />
					))}
				</div>
				<div className={styles.form__inner}>
					<div className={styles.form__row}>
						{rightInputs.name.map((input) => (
							<FormikInput key={input.name} {...input} />
						))}
					</div>
					{rightInputs.rest.map((input) => (
						<FormikInput key={input.name} {...input} />
					))}
					<FormikCheckbox
						name={'accept'}
						label={'I agree to the privacy policy'}
						aria-label={'Accept terms'}
						errorMessage
					/>
					<Button type={'submit'} fluid>
						<CampIcon />
						SIGN UP
					</Button>
					<p className={'redirect-link redirect-link--ruby'}>
						Already have an account?{' '}
						<Link className={'link'} to={RoutePath.login}>Sign in</Link>
					</p>
				</div>
			</Form>
		</Formik>
	);
});

export default TCORegisterForm;

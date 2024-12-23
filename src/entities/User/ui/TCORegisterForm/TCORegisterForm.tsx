import { memo, useCallback } from 'react';
import { Form, Formik, type FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { CustomInput, CustomInputControlled, validateErrors } from '@shared/ui/CustomInput';
import { Button } from '@shared/ui/Button';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import { initialData, inputsData } from '../../model/data/TCORegisterForm.data';
import { registrationSchema } from '@shared/const/validationSchemas';
import { RoutePath } from '@app/providers/AppRouter';
import type { ITCORegisterForm, IUserRegisterData } from '../../model/types/User.types';
import { CamperRole } from '@entities/Camper';
import styles from './TCORegisterForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';

interface TCORegisterFormProps {
	onSubmit: (values: IUserRegisterData, formikHelpers: FormikHelpers<ITCORegisterForm>) => void;
}

const TCORegisterForm = memo(({ onSubmit }: TCORegisterFormProps) => {
	const onSubmitHandler = useCallback(
		(values: ITCORegisterForm, formikHelpers: FormikHelpers<ITCORegisterForm>) => {
			const data: IUserRegisterData = {
				camp_name: values.camp_name.trim(),
				camp_id: values.camp_id.trim(),
				camp_website: values.camp_website.trim(),
				city: values.city.trim(),
				first_name: values.first_name.trim(),
				last_name: values.last_name.trim(),
				playa_name: values.playa_name.trim(),
				email: values.email.trim(),
				password: values.password.trim(),
				role: CamperRole.TCO,
			};

			onSubmit(data, formikHelpers);
		},
		[onSubmit]
	);

	return (
		<Formik validationSchema={registrationSchema} onSubmit={onSubmitHandler} initialValues={initialData}>
			{({ values, setFieldValue }) => (
				<Form className={styles.form}>
					<section>
						<CustomInputControlled
							setFieldValue={setFieldValue}
							value={values.camp_name}
							name="camp_name"
							placeholder="Sparkle Unicorns"
							label="Name your camp"
						/>
						<CustomInput name="camp_id" disabled placeholder="sparkle-unicorns" label="Camp ID"/>
						<CustomInput name="city" placeholder="Miami" label="Hometown"/>
						<CustomInput name="camp_website" placeholder="www.sparkle-unicorns.org" label="Website"/>
					</section>
					<section>
						<div className={styles.flex}>
							<CustomInput name="first_name" placeholder="Larry" label="First Name"/>
							<CustomInput name="last_name" placeholder="Harvey" label="Last Name"/>
						</div>
						{inputsData.map(input => (
							<CustomInput value={values[input.name]} key={input.name} {...input} />
						))}
						<CustomInput
							placeholder="Min. 8 characters"
							value={values.password}
							errors={validateErrors(values.password)}
							name="password"
							label="Password"
							type="password"
							register
						/>
						<CustomCheckbox name={'accept'} label={'I agree to the privacy policy'} errorMessage/>
						<Button type="submit" fluid>
							<CampIcon/>
							SIGN UP
						</Button>
						<p className="redirect-link redirect-link--ruby">
							Already have an account?{' '}
							<Link className="link" to={RoutePath.sign_in}>
								Sign in
							</Link>
						</p>
					</section>
				</Form>
			)}
		</Formik>
	);
});

export default TCORegisterForm;

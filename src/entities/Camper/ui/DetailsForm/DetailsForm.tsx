import { memo, useCallback } from 'react';
import { Formik, Form } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { normalizeTags } from '../../lib/normalizeTags';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { DetailsFormBasics } from './DetailsFormBasics';
import { DetailsFormTags } from './DetailsFormTags';
import { DetailsFormHistory } from './DetailsFormHistory';
import { DetailsFormSocials } from './DetailsFormSocials';
import { DetailsFormButtons } from './DetailsFormButtons';
import { useUpdateCamper } from '../../hooks/useUpdateCamper';
import { generateSocialName } from '@features/SocialIcon';
import { CamperRole, type ICamper, type IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';

type DetailsFormProps = {
	className?: string;
	initialValues: Partial<IFormikCamper>;
	handleCancel: () => void;
	camperEmail: string;
};

const DetailsForm = memo((props: DetailsFormProps) => {
	const { className, initialValues, handleCancel, camperEmail } = props;
	const { mutate: updateCamper } = useUpdateCamper();

	const handleSubmit = useCallback((values: Partial<IFormikCamper>) => {
		const { social_links, role, tags, ...rest } = values;

		const updatedSocial = social_links
			?.filter((social) => social.url)
			.map(({ url }) => ({ url, name: generateSocialName(url) }));

		const normalizedTags = tags ? normalizeTags(tags) : null;

		const payload: Partial<ICamper> = {
			email: camperEmail,
			...rest,
			...(initialValues.role === CamperRole.TCO ? {} : { role }),
			...(updatedSocial ? { social_links: updatedSocial } : {}),
			...(normalizedTags ? { tags: normalizedTags } : {}),
		};

		console.log('payload:', payload);

		// updateCamper(payload);
		handleCancel();
	}, [camperEmail, handleCancel, initialValues.role]);

	console.log('initialValues:', initialValues);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
			{({ values }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<DetailsFormBasics role={initialValues.role || CamperRole.CAMPER} />
					<DetailsFormTags values={values} />
					<FormikTextarea
						name={'about_me'}
						placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
						label={'Summary'}
					/>
					<DetailsFormHistory values={values} />
					<DetailsFormSocials values={values} />
					<DetailsFormButtons handleCancel={handleCancel} />
				</Form>
			)}
		</Formik>
	);
});

export default DetailsForm;
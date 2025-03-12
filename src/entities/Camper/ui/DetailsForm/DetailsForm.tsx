import { memo, useCallback, useEffect, useState } from 'react';
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
import { appState } from '@entities/App';
import { editCamperSchema } from '@shared/const/validationSchemas';
import { CamperRole, type ICamper, type IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';

type DetailsFormProps = {
	className?: string;
	initialValues: Partial<IFormikCamper>;
	handleCancel: () => void;
	onClose?: () => void;
	camperEmail: string;
};

const DetailsForm = memo((props: DetailsFormProps) => {
	const { className, initialValues, handleCancel, onClose, camperEmail } = props;
	const { mutate: updateCamper } = useUpdateCamper();
	const { decrementModalCount } = appState();
	const [isDirty, setIsDirty] = useState(false);

	const handleSubmit = useCallback(
		(values: Partial<IFormikCamper>) => {
			if (!isDirty) {
				handleCancel();
				return;
			}

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

			if (initialValues.role !== values.role) {
				decrementModalCount()
				onClose?.();
			}

			updateCamper(payload);
			handleCancel();
		},
		[camperEmail, onClose, decrementModalCount, isDirty, handleCancel, initialValues.role, updateCamper]
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={editCamperSchema}
			onSubmit={handleSubmit}
			enableReinitialize
		>
			{({ values, dirty }) => {

				useEffect(() => {
					setIsDirty(dirty);
				}, [dirty])

				return (
					<Form
						className={classNames(styles.form, {}, [className])}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
							}
						}}
					>
						<DetailsFormBasics
							role={initialValues.role || CamperRole.CAMPER}
							visitedBM={values.visitedBM}
							birthdayDate={values.birthdayDate}
						/>
						<DetailsFormTags values={values} />
						<FormikTextarea
							name={'about_me'}
							placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
							label={'Summary'}
						/>
						<DetailsFormHistory history={values.history} />
						<DetailsFormSocials socials={values.social_links} />
						<DetailsFormButtons
							handleCancel={handleCancel}
							onClose={onClose}
							role={initialValues.role}
							camperEmail={camperEmail}
							camperName={`${initialValues.first_name} ${initialValues.last_name}`}
							dirty={dirty}
						/>
					</Form>
				);
			}}
		</Formik>
	);
});

export default DetailsForm;
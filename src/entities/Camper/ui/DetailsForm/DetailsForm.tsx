import { memo, useCallback } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { BMYearsOptions, roleOptions } from '../../lib/generateSelectOptions';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useUpdateCamper } from '../../hooks/useUpdateCamper';
import { generateSocialName } from '@features/SocialIcon';
import { inputs } from '../../model/data/DetailsForm.data';
import { CamperRole, type ICamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormProps = {
	className?: string;
	initialValues: Partial<ICamper>;
	handleCancel: () => void;
	camperEmail: string;
};

const DetailsForm = memo((props: DetailsFormProps) => {
	const { className, initialValues, handleCancel, camperEmail } = props;
	const currentYear = new Date().getFullYear();
	const { mutate: updateCamper } = useUpdateCamper();

	const handleSubmit = useCallback((values: Partial<ICamper>) => {
		const { social_links, role, ...rest } = values;

		const updatedSocial = social_links
			?.filter((social) => social.url)
			.map(({ url }) => ({ url, name: generateSocialName(url) }));

		const payload: Partial<ICamper> = {
			email: camperEmail,
			...rest,
			...(initialValues.role === CamperRole.TCO ? {} : { role }),
			...(updatedSocial ? { social_links: updatedSocial } : {}),
		};

		updateCamper(payload);
		handleCancel();
	}, [camperEmail, handleCancel, initialValues.role, updateCamper]);

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
			{({ values, setFieldValue }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<div className={styles.form__row}>
						{inputs.name.map(({ name, placeholder, label }) => (
							<FormikInput
								key={name}
								name={name}
								placeholder={placeholder}
								label={label}
							/>
						))}
					</div>
					<div className={styles.form__row}>
						{inputs.rest.map(({ name, placeholder, label }) => (
							<FormikInput
								key={name}
								name={name}
								placeholder={placeholder}
								label={label}
							/>
						))}
					</div>
					<CustomSelect
						name={'role'}
						options={roleOptions}
						label={'Role'}
						disabled={initialValues.role === CamperRole.TCO}
					/>
					<FormikTextarea
						name={'about_me'}
						placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
						label={'Summary'}
					/>
					<div className={styles.form__group}>
						<FieldArray name={'history'}>
							{({ push, remove }) => (
								<>
									<div className={styles.form__caption}>
										<p>History</p>
										<Button
											theme={ButtonTheme.CLEAR}
											size={ButtonSize.TEXT}
											className={styles.btnAdd}
											onClick={() => push({ year: String(currentYear - (values.history?.length ?? 0)), value: '' })}
										>
											<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
										</Button>
									</div>
									<ul className={styles.form__list}>
										{values.history?.map((h, i) => (
											<li key={i} className={styles.form__listItemHistory}>
												<div className={styles.form__listItemHistoryInner}>
													<CustomSelect name={`history.${i}.year`} options={BMYearsOptions(currentYear)} value={h.year} />
													{i !== 0 && (
														<Button
															theme={ButtonTheme.CLEAR}
															size={ButtonSize.TEXT}
															className={classNames(styles.btnAdd, {}, ['ml-a', 'mt-5'])}
															onClick={() => remove(i)}
														>
															<Icon icon={<MinusIcon />} size={IconSize.SIZE_16} />
														</Button>
													)}
												</div>
												<FormikTextarea name={`history.${i}.value`} value={h.value} />
											</li>
										))}
									</ul>
								</>
							)}
						</FieldArray>
					</div>
					<div className={styles.form__group}>
						<FieldArray name={'social_links'}>
							{({ push, remove }) => (
								<>
									<div className={styles.form__caption}>
										<p>Social</p>
										{values.social_links && values.social_links.length < 5 && (
											<Button
												theme={ButtonTheme.CLEAR}
												size={ButtonSize.TEXT}
												className={styles.btnAdd}
												onClick={() => push({ name: '', url: '' })}
											>
												<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
											</Button>
										)}
									</div>
									<ul className={styles.form__list}>
										{values.social_links?.map((_, i) => (
											<li key={i} className={styles.form__listItemSocial}>
												<FormikInput
													key={i}
													name={`social_links.${i}.url`}
													placeholder={'https://www.facebook.com/'}
												/>
												<Button
													theme={ButtonTheme.CLEAR}
													size={ButtonSize.TEXT}
													className={styles.btnAdd}
													onClick={() => {
														if (i === 0) {
															void setFieldValue(`social_links.${i}.url`, '');
														} else {
															remove(i);
														}
													}}
												>
													<Icon icon={<MinusIcon />} size={IconSize.SIZE_16} />
												</Button>
											</li>
										))}
									</ul>
								</>
							)}
						</FieldArray>
					</div>
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
				</Form>
			)}
		</Formik>
	);
});

export default DetailsForm;
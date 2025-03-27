import { memo, useCallback, useEffect, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { classNames } from '@shared/lib/classNames';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { FormikCheckbox } from '@shared/ui/FormikCheckbox';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Tooltip } from '@shared/ui/Tooltip';
import { SocialNetworks } from '@features/SocialIcon';
import { normalizeSocialLinks, CamperRole, socialOptions } from '@entities/Camper';
import { camperRegistrationSchema } from '@shared/const/validationSchemas';
import { initialData, inputs } from '../../model/data/CamperRegisterForm.data';
import type { ICamperRegistrationData } from '../../model/types/User.types';
import styles from './CamperRegisterForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';
import ThreeDotIcon from '@shared/assets/icons/three-dot_icon.svg';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type CamperRegisterFormProps = {
	className: string;
	onSubmit: (values: Omit<ICamperRegistrationData, 'camp_name' | 'camp_id'>, resetForm: () => void) => void;
};

const CamperRegisterForm = memo((props: CamperRegisterFormProps) => {
	const { onSubmit, className } = props;
	const [tooltipsVisible, setTooltipsVisible] = useState<boolean[]>(initialData.socials.map(() => false));

	useEffect(() => {
		setTooltipsVisible(values =>
			values.length !== initialData.socials.length
				? new Array(initialData.socials.length).fill(false)
				: values
		);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			if (!target.closest(`.${styles.tooltip}`) && !target.closest(`.${styles.socials__btn}`)) {
				setTooltipsVisible(tooltipsVisible.map(() => false));
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => document.removeEventListener('click', handleClickOutside);
	}, [tooltipsVisible]);

	const handleTooltipToggle = useCallback(
		(index: number) => {
			setTooltipsVisible(prevState => {
				const newState = [...prevState];
				newState[index] = !newState[index];
				return newState;
			});
		},
		[]
	);

	const onSubmitHandler = useCallback(
		(values: typeof initialData, { resetForm }: { resetForm: () => void }) => {

			const social_links = normalizeSocialLinks(values.socials);

			const data: Omit<ICamperRegistrationData, 'camp_name' | 'camp_id'> = {
				first_name: values.first_name.trim(),
				last_name: values.last_name.trim(),
				playa_name: values.playa_name.trim(),
				email: values.email.trim(),
				password: values.password.trim(),
				about_me: values.about_me?.trim(),
				role: CamperRole.PROSPECT,
				accept: Boolean(values.accept),
				...(social_links ? { social_links } : {})
			};

			onSubmit(data, resetForm);
		},
		[onSubmit]
	);

	return (
		<Formik validationSchema={camperRegistrationSchema} initialValues={initialData} onSubmit={onSubmitHandler}>
			{({ values }) => (
				<Form className={classNames(styles.form, {}, [className])}>
					<div className={styles.form__item}>
						<FormikInput name={'playa_name'} placeholder={'Playa Name'} label={'Playa Name'}/>
						<FieldArray name={'socials'}>
							{({ remove, push }) => (
								<>
									{values?.socials?.map((s, index, arr) => (
										<div key={index} className={styles.socials}>
											{tooltipsVisible[index] && (
												<Tooltip
													className={styles.tooltip}
													properties={{
														bottom: 'calc(100% - 20px)',
														right: '30px',
														width: '140px',
													}}
												>
													<Button
														className={styles.tooltip__btn}
														theme={ButtonTheme.CLEAR}
														size={ButtonSize.TEXT}
														color={ButtonColor.BLACK}
														onClick={() => {
															push({ socialName: SocialNetworks.DEFAULT, userName: '' });
															handleTooltipToggle(index);
														}}
														disabled={arr.length > 4}
													>
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
                              </span>
														Add link
													</Button>
													<Button
														className={styles.tooltip__btn}
														theme={ButtonTheme.CLEAR}
														size={ButtonSize.TEXT}
														color={ButtonColor.BLACK}
														onClick={() => {
															remove(index);
															handleTooltipToggle(index);
														}}
														disabled={arr.length === 1}
													>
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<MinusIcon />} size={IconSize.SIZE_10}/>
                              </span>
														Delete
													</Button>
												</Tooltip>
											)}
											<div className={styles.socials__caption}>
												<p>Social media link</p>
												<Button
													aria-label={'Toggle tooltip button'}
													theme={ButtonTheme.CLEAR}
													size={ButtonSize.TEXT}
													className={styles.socials__btn}
													onClick={() => handleTooltipToggle(index)}
												>
													<Icon icon={<ThreeDotIcon />} size={IconSize.SIZE_20}/>
												</Button>
											</div>
											<div className={styles.socials__row}>
												<CustomSelect
													className={styles.socials__select}
													name={`socials.${index}.socialName`}
													options={socialOptions}
													value={s.socialName}
												/>
												<FormikInput name={`socials.${index}.userName`} placeholder={'User name'} />
											</div>
										</div>
									))}
								</>
							)}
						</FieldArray>
						<FormikTextarea
							name={'about_me'}
							placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
							label={'About you'}
						/>
					</div>
					<div className={styles.form__item}>
						<div className={styles.form__row}>
							{inputs.name.map((input) => (
								<FormikInput key={input.name} {...input} />
							))}
						</div>
						{inputs.rest.map((input) => (
							<FormikInput key={input.name} {...input} />
						))}
						<FormikCheckbox
							name={'accept'}
							label={'I agree to the privacy policy'}
							ariaLabel={'Accept terms'}
							errorMessage
						/>
						<Button type={'submit'} fluid>
							<CampIcon />
							SIGN UP
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
});

export default CamperRegisterForm;

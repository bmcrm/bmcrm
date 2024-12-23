import { memo, useCallback, useEffect, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { socialLinksParser } from '@shared/lib/socialLinkParser';
import { CustomInput, validateErrors } from '@shared/ui/CustomInput';
import { CustomTextarea } from '@shared/ui/CustomTextarea';
import { CustomCheckbox } from '@shared/ui/CustomCheckbox';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { Tooltip } from '@shared/ui/Tooltip';
import { camperRegistrationSchema } from '@shared/const/validationSchemas';
import { initialData } from '../../model/data/CamperRegisterForm.data';
import { type ICamperRegisterForm, type IUserRegisterData } from '../../model/types/User.types';
import { CamperRole } from '@entities/Camper';
import styles from './CamperRegisterForm.module.scss';
import CampIcon from '@shared/assets/icons/camp.svg';
import ThreeDotIcon from '@shared/assets/icons/three-dot_icon.svg';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type CamperRegisterFormProps = {
	onSubmit: (values: IUserRegisterData, resetForm: () => void) => void;
};

const CamperRegisterForm = memo((props: CamperRegisterFormProps) => {
	const { onSubmit } = props;
	const [tooltipsVisible, setTooltipsVisible] = useState<boolean[]>(initialData.social_links.map(() => false));

	useEffect(() => {
		setTooltipsVisible(values =>
			values.length !== initialData.social_links.length
				? new Array(initialData.social_links.length).fill(false)
				: values
		);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(`.${styles.tooltip}`) && !target.closest(`.${styles.social__btn}`)) {
				setTooltipsVisible(tooltipsVisible.map(() => false));
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
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
		(values: ICamperRegisterForm, { resetForm }: { resetForm: () => void }) => {
			const userSocials = values.social_links && !values.social_links?.every(link => link === '')
				? socialLinksParser(values.social_links)
				: [];

			const data: IUserRegisterData = {
				first_name: values.first_name.trim(),
				last_name: values.last_name.trim(),
				playa_name: values.playa_name.trim(),
				email: values.email.trim(),
				password: values.password.trim(),
				about_me: values.about_me?.trim(),
				social_links: userSocials,
				role: CamperRole.LEAD,
			};

			onSubmit(data, resetForm);
		},
		[onSubmit]
	);

	return (
		<Formik validationSchema={camperRegistrationSchema} initialValues={initialData} onSubmit={onSubmitHandler}>
			{({ values }) => (
				<Form className={styles.form}>
					<div className={styles.form__item}>
						<CustomInput name={'playa_name'} placeholder={'Playa Name'} label={'Playa Name'}/>
						<FieldArray name={'social_links'}>
							{({ remove, push }) => (
								<>
									{values.social_links.map((_, index: number, arr) => (
										<div key={index} className={styles.social__wrapper}>
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
															push('');
															handleTooltipToggle(index);
														}}
														disabled={arr.length > 4}
													>
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<PlusIcon/>} size={IconSize.SIZE_10}/>
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
														disabled={arr.length < 2}
													>
                              <span className={styles.tooltip__icon}>
                                <Icon icon={<MinusIcon/>} size={IconSize.SIZE_10}/>
                              </span>
														Delete
													</Button>
												</Tooltip>
											)}
											<Button
												theme={ButtonTheme.CLEAR}
												size={ButtonSize.TEXT}
												className={styles.social__btn}
												onClick={() => handleTooltipToggle(index)}
											>
												<Icon icon={<ThreeDotIcon/>} size={IconSize.SIZE_20}/>
											</Button>
											<CustomInput
												name={`social_links.${index}`}
												placeholder="https://www.facebook.com/"
												label="Social media link"
											/>
										</div>
									))}
								</>
							)}
						</FieldArray>
						<CustomTextarea
							name={'about_me'}
							placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
							label={'About you'}
						/>
					</div>
					<div className={styles.form__item}>
						<div className={styles.form__row}>
							<CustomInput name={'first_name'} placeholder={'Larry'} label={'First Name'}/>
							<CustomInput name={'last_name'} placeholder={'Harvey'} label={'Last Name'}/>
						</div>
						<CustomInput name={'email'} placeholder={'larry@gmail.com'} label={'Email'} type={'email'}/>
						<CustomInput
							name={'password'}
							placeholder={'∗∗∗∗∗∗∗∗'}
							label={'Password'}
							type={'password'}
							value={values.password}
							errors={validateErrors(values.password)}
							register
						/>
						<CustomCheckbox name={'accept'} label={'I agree to the privacy policy'} errorMessage/>
						<Button type="submit" fluid>
							<CampIcon/>
							SIGN UP
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
});

export default CamperRegisterForm;

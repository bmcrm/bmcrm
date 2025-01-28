import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Avatar } from '@shared/ui/Avatar';
import { FormikInput } from '@shared/ui/FormikInput';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import { DetailsFormHistory, DetailsFormSocials, type CamperHistory, type CamperSocial } from '@entities/Camper';
import { inputsData } from '../../model/data/UserSettingsForm.data';
import styles from './UserSettingsForm.module.scss';

type FormInputsProps = {
	className?: string;
	history?: CamperHistory[];
	socials?: CamperSocial[];
};

const FormInputs = memo((props: FormInputsProps) => {
	const { className, history, socials } = props;

	return (
		<div className={classNames(styles.form__inner, {}, [className])}>
			<div className={styles.form__inputs}>
				<div className={styles.form__row}>
					{inputsData.name.map(input => <FormikInput key={input.name} {...input} />)}
				</div>
				<div className={styles.form__row}>
					{inputsData.playa.map(input => <FormikInput key={input.name} {...input} />)}
				</div>
				<FormikTextarea
					name={'about_me'}
					placeholder={'Burner from 2021. Working in IT, 29 y.o.'}
					label={'Summary'}
				/>
			</div>
			<Avatar size={240} src={null} />
			<div className={styles.form__inputs}>
				<DetailsFormHistory history={history} />
				<DetailsFormSocials socials={socials} />
			</div>
		</div>
	);
});

export { FormInputs };
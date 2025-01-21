import { memo } from 'react';
import { FormikTextarea } from '@shared/ui/FormikTextarea';
import type { ICamper } from '@entities/Camper';
import styles from './CamperDetailsAboutMe.module.scss';

type CamperDetailsAboutMeProps = {
	camper?: ICamper;
	isReadonly: boolean;
};

const CamperDetailsAboutMe = memo(({ camper, isReadonly }: CamperDetailsAboutMeProps) => (
	<div>
		<h3 className={styles.title}>About Me</h3>
		{isReadonly ? (
			<p className={styles.text}>{camper?.about_me}</p>
		) : (
			<FormikTextarea
				placeholder={'Write....'}
				name={'about_me'}
				readonly={isReadonly}
				className={styles.textarea}
			/>
		)}
	</div>
));

export { CamperDetailsAboutMe };
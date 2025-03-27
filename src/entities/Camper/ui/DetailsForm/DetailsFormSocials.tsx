import { memo } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { SocialNetworks } from '@features/SocialIcon';
import { socialOptions } from '../../model/data/DetailsForm.data';
import { FormikSocials } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormSocialsProps = {
	socials?: FormikSocials[];
};

const DetailsFormSocials = memo(({ socials }: DetailsFormSocialsProps) => {
	const { setFieldValue } = useFormikContext();

	return (
		<FieldArray name={'socials'}>
			{({ push, remove }) => (
				<div className={styles.form__group}>
					<div className={styles.form__caption}>
						<p>Social</p>
						{socials && socials.length < 5 && (
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.form__btnControl}
								onClick={() => push({ socialName: SocialNetworks.DEFAULT, userName: '' })}
								aria-label={'Add social button'}
							>
								<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
							</Button>
						)}
					</div>
					<ul className={styles.form__list}>
						{socials?.map((s, i, array) => (
							<li key={i} className={styles.form__listItemSocial}>
								<div className={styles.form__listItemSocialInner}>
									<CustomSelect
										className={styles.form__select}
										name={`socials.${i}.socialName`}
										options={socialOptions}
										value={s.socialName}
									/>
									<FormikInput name={`socials.${i}.userName`} placeholder={'User name'} />
								</div>
								<Button
									aria-label={'Remove social button'}
									theme={ButtonTheme.CLEAR}
									size={ButtonSize.TEXT}
									className={styles.form__btnControl}
									onClick={() => {
										if (array.length === 1) {
											void setFieldValue(`socials.${i}.socialName`, SocialNetworks.DEFAULT);
											void setFieldValue(`socials.${i}.userName`, '');
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
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormSocials };
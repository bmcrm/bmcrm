import { memo } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { CamperSocial } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormSocialsProps = {
	socials?: CamperSocial[];
};

const DetailsFormSocials = memo(({ socials }: DetailsFormSocialsProps) => {
	const { setFieldValue } = useFormikContext();

	return (
		<FieldArray name={'social_links'}>
			{({ push, remove }) => (
				<div className={styles.form__group}>
					<div className={styles.form__caption}>
						<p>Social</p>
						{socials && socials.length < 5 && (
							<Button
								theme={ButtonTheme.CLEAR}
								size={ButtonSize.TEXT}
								className={styles.form__btnControl}
								onClick={() => push({ name: '', url: '' })}
							>
								<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
							</Button>
						)}
					</div>
					<ul className={styles.form__list}>
						{socials?.map((_, i, array) => (
							<li key={i} className={styles.form__listItemSocial}>
								<FormikInput
									name={`social_links.${i}.url`}
									placeholder={'https://www.facebook.com/'}
								/>
								<Button
									theme={ButtonTheme.CLEAR}
									size={ButtonSize.TEXT}
									className={styles.form__btnControl}
									onClick={() => {
										if (array.length === 1) {
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
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormSocials };
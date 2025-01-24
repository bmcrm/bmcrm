import { memo } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormSocialsProps = {
	values: Partial<IFormikCamper>;
};

const DetailsFormSocials = memo(({ values }: DetailsFormSocialsProps) => {
	const { setFieldValue } = useFormikContext();

	return (
		<FieldArray name={'social_links'}>
			{({ push, remove }) => (
				<div className={styles.form__group}>
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
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormSocials };
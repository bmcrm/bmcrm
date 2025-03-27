import { memo, useMemo } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { tagsOptions } from '../../lib/generateSelectOptions';
import { FormikInput } from '@shared/ui/FormikInput';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { useGetCampers } from '../../hooks/useGetCampers';
import type { IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';
import { useMedia } from '@shared/hooks/useMedia';

type DetailsFormTagsProps = {
	values: Partial<IFormikCamper>;
};

const DetailsFormTags = memo(({ values }: DetailsFormTagsProps) => {
	const { setFieldValue } = useFormikContext();
	const { data: campers } = useGetCampers();
	const { isMobile } = useMedia();

	const tagOptions = useMemo(() => tagsOptions(campers), [campers]);

	return (
		<FieldArray name={'tags'}>
			{({ push: pushTag, remove: removeTag }) => (
				<div className={styles.form__group}>
					<div className={styles.form__caption}>
						<p>Tags</p>
						<Button
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							className={styles.form__btnControl}
							onClick={() => pushTag({ tagName: '', tagDetails: [] })}
							aria-label={'Add tag button'}
						>
							<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
						</Button>
					</div>
					{!isMobile && (
						<div className={styles.form__listItemTagInner}>
							<div className={styles.form__caption}>
								<p>Tag Name</p>
							</div>
							<div className={styles.form__caption}>
								<p>Tag Details</p>
							</div>
						</div>
					)}
					<ul className={styles.form__list}>
						{values.tags?.map((tag, tagIndex, array) => (
							<li key={tagIndex} className={styles.form__listItemTag}>
								<div className={styles.form__listItemTagInner}>
									<FormikInput name={`tags.${tagIndex}.tagName`} placeholder={isMobile ? 'Tag name' : 'Skills'} />
									<MultiSelect
										isCreatable
										aria-label={'Tags select'}
										placeholder={isMobile ? 'Tag details' : 'Select or Write...'}
										value={tag.tagDetails || []}
										options={tagOptions}
										onChange={(newDetails) => setFieldValue(`tags.${tagIndex}.tagDetails`, newDetails)}
									/>
								</div>
								<Button
									theme={ButtonTheme.CLEAR}
									size={ButtonSize.TEXT}
									className={styles.form__btnControl}
									onClick={() => {
										if (array.length === 1) {
											void setFieldValue(`tags.${tagIndex}.tagName`, '');
										} else {
											removeTag(tagIndex);
										}
									}}
									aria-label={'Remove tag button'}
								>
									<Icon icon={<MinusIcon />} size={IconSize.SIZE_10} />
								</Button>
							</li>
						))}
					</ul>
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormTags };
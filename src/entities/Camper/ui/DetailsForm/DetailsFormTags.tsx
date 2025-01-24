import { memo } from 'react';
import { useFormikContext, FieldArray } from 'formik';
import { FormikInput } from '@shared/ui/FormikInput';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { IFormikCamper } from '../../model/types/Camper.types';
import styles from './DetailsForm.module.scss';
import PlusIcon from '@shared/assets/icons/plus_icon.svg';
import MinusIcon from '@shared/assets/icons/minus_icon.svg';

type DetailsFormTagsProps = {
	values: Partial<IFormikCamper>;
};

const DetailsFormTags = memo(({ values }: DetailsFormTagsProps) => {
	const { setFieldValue } = useFormikContext();

	return (
		<FieldArray name={'tags'}>
			{({ push: pushTag, remove: removeTag }) => (
				<div className={styles.form__group}>
					<div className={styles.form__caption}>
						<p>Tags</p>
						<Button
							theme={ButtonTheme.CLEAR}
							size={ButtonSize.TEXT}
							className={styles.btnAdd}
							onClick={() => pushTag({ tagName: '', tagDetails: [''] })}
						>
							<Icon icon={<PlusIcon />} size={IconSize.SIZE_10} />
						</Button>
					</div>
					<ul className={styles.form__list}>
						{values.tags?.map((tag, tagIndex) => (
							<li key={tagIndex} className={styles.form__listItemTag}>
								<div className={styles.form__listItemTagInner}>
									<FormikInput
										name={`tags.${tagIndex}.tagName`}
										placeholder={'Skills'}
									/>
									<Button
										theme={ButtonTheme.CLEAR}
										size={ButtonSize.TEXT}
										className={styles.btnAdd}
										onClick={() => {
											if (tagIndex === 0) {
												void setFieldValue(`tags.${tagIndex}.tagName`, '');
											} else {
												removeTag(tagIndex);
											}
										}}
									>
										<Icon icon={<MinusIcon />} size={IconSize.SIZE_16} />
									</Button>
								</div>
								<FieldArray name={`tags.${tagIndex}.tagDetails`}>
									{({ push: pushDetail, remove: removeDetail }) => (
										<ul className={styles.form__list}>
											{tag.tagDetails?.map((detail, detailIndex) => (
												<li key={detailIndex} className={styles.form__listItemTagInner}>
													<FormikInput
														name={`tags.${tagIndex}.tagDetails.${detailIndex}`}
														placeholder={'builder'}
													/>
													<Button
														theme={ButtonTheme.CLEAR}
														size={ButtonSize.TEXT}
														className={styles.btnAdd}
														onClick={() => {
															if (detailIndex === 0) {
																void setFieldValue(`tags.${tagIndex}.tagDetails.${detailIndex}`, '');
															} else {
																removeDetail(detailIndex);
															}
														}}
													>
														<Icon icon={<MinusIcon />} size={IconSize.SIZE_16} />
													</Button>
												</li>
											))}
										</ul>
									)}
								</FieldArray>
							</li>
						))}
					</ul>
				</div>
			)}
		</FieldArray>
	);
});

export { DetailsFormTags };
import { memo } from 'react';
import { Field, FieldArray } from 'formik';
import { CustomTextarea } from '@shared/ui/CustomTextarea';
import type { ICamper } from '@entities/Camper';
import styles from './CamperDetailsHistory.module.scss';

type CamperDetailsHistoryProps = {
	className?: string;
	initialValues: Partial<ICamper>;
	isReadonly: boolean;

};

const CamperDetailsHistory = memo(({ initialValues, isReadonly }: CamperDetailsHistoryProps) => (
	<div>
		<h3 className={styles.title}>Campers Notes</h3>
		<FieldArray name={'history'}>
			{() => (
				<ul className={styles.history}>
					{initialValues?.history?.map((item, index) => (
						<li key={index} className={styles.history__item}>
							<Field type={'text'} readOnly={true} name={`history.${index}.year`} className={styles.year}/>
							{isReadonly ? (
								<p className={styles.text}>{item.value}</p>
							) : index === 0 ? (
								<CustomTextarea
									placeholder='Write....'
									name={`history.${index}.value`}
									readonly={isReadonly}
									className={styles.textarea}
								/>
							) : (
								<p className={styles.text}>{item.value}</p>
							)}
						</li>
					))}
				</ul>
			)}
		</FieldArray>
	</div>
));

export { CamperDetailsHistory };
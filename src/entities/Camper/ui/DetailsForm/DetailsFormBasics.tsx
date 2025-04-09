import { memo, useCallback, useMemo } from 'react';
import { useFormikContext } from 'formik';
import { BMYearsOptions } from '@shared/lib/generateBMYearsOptions';
import { FormikInput } from '@shared/ui/FormikInput';
import { CustomSelect } from '@shared/ui/CustomSelect';
import { MultiSelect } from '@shared/ui/MultiSelect';
import { Datepicker } from '@features/Datepicker';
import { userState } from '@entities/User';
import { roleOptions } from '../../lib/generateSelectOptions';
import { inputs } from '../../model/data/DetailsForm.data';
import { CamperRole } from '@entities/Camper';
import styles from './DetailsForm.module.scss';

type DetailsFormBasicsProps = {
  role: CamperRole;
  visitedBM?: string[];
  birthdayDate?: Date | null;
  createdBy?: string;
};

const DetailsFormBasics = memo(({ role, visitedBM, birthdayDate, createdBy }: DetailsFormBasicsProps) => {
  const { setFieldValue } = useFormikContext();
  const {
    tokens: { decodedIDToken },
  } = userState();
  const currentYear = new Date().getFullYear();

  const filteredRoleOptions = useMemo(
    () => (role === CamperRole.TCO ? roleOptions : roleOptions.filter(option => option.value !== CamperRole.TCO)),
    [role]
  );

  const handleDatepickerChange = useCallback(
    (date: Date | null) => {
      void setFieldValue('birthdayDate', date);
    },
    [setFieldValue]
  );

  return (
    <>
      <div className={styles.form__row}>
        {inputs.name.map(({ name, placeholder, label }) => (
          <FormikInput key={name} name={name} placeholder={placeholder} label={label} />
        ))}
      </div>
      <div className={styles.form__row}>
        {inputs.rest.map(({ name, placeholder, label }) => (
          <FormikInput key={name} name={name} placeholder={placeholder} label={label} />
        ))}
      </div>
      <div className={styles.form__row}>
        <Datepicker
          ariaDescribedBy={'Birthday date'}
          errorName={'birthdayDate'}
          label={'Birthday Date'}
          date={birthdayDate}
          onChange={handleDatepickerChange}
          showMonthDropdown
        />
        <MultiSelect
          isSearchable
          aria-label={'Visited BM`s select'}
          label={'Visited BM`s'}
          placeholder={'Select or Write...'}
          value={visitedBM || []}
          options={BMYearsOptions(currentYear)}
          onChange={newValue => setFieldValue('visitedBM', newValue)}
        />
      </div>

      <div className={styles.form__row}>
        {createdBy && <FormikInput name='custom_email' placeholder='Enter email' label='Email' />}

        {(decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG) && (
          <CustomSelect name={'role'} options={filteredRoleOptions} label={'Role'} disabled={role === CamperRole.TCO} />
        )}
      </div>
    </>
  );
});

export { DetailsFormBasics };

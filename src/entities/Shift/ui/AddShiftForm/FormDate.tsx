import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';

type FormDateProps = {
	className?: string;
};

const FormDate = memo((props: FormDateProps) => {
	const { className } = props;

	return (
		<div className={classNames('', {}, [className])}></div>
	);
});

export default FormDate;
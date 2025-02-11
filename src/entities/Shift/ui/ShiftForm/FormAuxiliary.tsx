import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';

type FormAuxiliaryProps = {
	className?: string;
};

const FormAuxiliary = memo((props: FormAuxiliaryProps) => {
	const { className } = props;

	return (
		<div className={classNames('', {}, [className])}></div>
	);
});

export default FormAuxiliary;
import { memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Button } from '@shared/ui/Button';
import styles from './ShiftForm.module.scss';

type FormButtonsProps = {
	className?: string;
	dirty: boolean;
};

const FormButtons = memo(({ className, dirty }: FormButtonsProps) => {
	const { isMobile } = useMedia();

	return (
		<div className={classNames(styles.form__buttons, {}, [className])}>
			<Button type={'submit'} className={'m-centred'} disabled={!dirty} fluid={isMobile}>Save</Button>
		</div>
	);
});

export { FormButtons };
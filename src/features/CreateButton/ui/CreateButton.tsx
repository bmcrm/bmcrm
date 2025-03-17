import { memo } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { CreateCamperModal } from '@features/CreateCamperModal';

type CreateButtonProps = {
	className?: string;
	text?: string;
	size?: ButtonSize;
	theme?: ButtonTheme;
};

const CreateButton = memo((props: CreateButtonProps) => {
	const { className, text = 'Create', size, theme } = props;
	const { isOpen, open, close } = useToggle();

	return (
		<>
			<Button
				className={classNames('', {}, [className])}
				onClick={open}
				size={size}
				theme={theme}
			>
				{text}
			</Button>
			<CreateCamperModal isOpen={isOpen} onClose={close} />
		</>
	);
});

export default CreateButton;
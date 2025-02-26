import { memo } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize } from '@shared/ui/Button';
import { CreateCamperModal } from '@features/CreateCamperModal';

type CreateButtonProps = {
	className?: string;
	text?: string;
	size?: ButtonSize;
};

const CreateButton = memo((props: CreateButtonProps) => {
	const { className, text = 'Create', size } = props;
	const { isOpen, open, close } = useToggle();

	return (
		<>
			<Button
				className={classNames('', {}, [className])}
				onClick={open}
				size={size}
			>
				{text}
			</Button>
			<CreateCamperModal isOpen={isOpen} onClose={close} />
		</>
	);
});

export default CreateButton;
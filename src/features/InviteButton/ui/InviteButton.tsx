import { memo } from 'react';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { Button, ButtonSize } from '@shared/ui/Button';
import { InviteCamperModal } from '@features/InviteCamperModal';

type InviteButtonProps = {
	className?: string;
	text?: string;
	size?: ButtonSize;
};

const InviteButton = memo((props: InviteButtonProps) => {
	const { className, text = 'Invite', size } = props;
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
			<InviteCamperModal isOpen={isOpen} onClose={close} />
		</>
	);
});

export default InviteButton;
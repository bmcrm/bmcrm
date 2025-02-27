import { memo, useCallback } from 'react';
import { classNames, type Mods } from '@shared/lib/classNames';
import { useToggle } from '@shared/hooks/useToggle';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { ConfirmModalTemplate } from '@features/ConfirmModalTemplate';
import { useDeleteCamper, useGetCampers } from '@entities/Camper';
import { useLogout, userState } from '@entities/User';
import styles from './DeleteCamperButton.module.scss';
import TrashIcon from '@shared/assets/icons/delete.svg';

type DeleteCamperButtonProps = {
	className?: string;
	camperEmail: string;
	camperName?: string;
	icon?: boolean;
	iconSize?: IconSize;
	buttonLabel?: string;
	buttonSize?: ButtonSize;
	buttonTheme?: ButtonTheme;
	buttonColor?: ButtonColor;
	additionalHandler?: () => void;
};

const DeleteCamperButton = memo((props: DeleteCamperButtonProps) => {
	const {
		className,
		camperEmail,
		camperName,
		icon,
		buttonLabel,
		iconSize,
		buttonSize = ButtonSize.S,
		buttonTheme,
		buttonColor,
		additionalHandler,
	} = props;
	const { mutateAsync: deleteCamper } = useDeleteCamper();
	const { data: campers } = useGetCampers();
	const { mutate: logout } = useLogout();
	const { tokens: { decodedIDToken } } = userState();
	const { isOpen, open, close } = useToggle();
	const isDeletingAccount = decodedIDToken?.email === camperEmail;
	const targetCamper = campers?.find(c => c.email === camperEmail);
	const targetCamperName = `${targetCamper?.first_name} ${targetCamper?.last_name}`;
	const mods: Mods = {
		[styles.icon]: !buttonLabel && buttonSize !== ButtonSize.TEXT,
		[styles.neutral]: buttonColor === ButtonColor.NEUTRAL,
		[styles.black]: buttonColor === ButtonColor.BLACK,
	};

	const modalTitle = isDeletingAccount
		? 'Are you sure you want to delete your account?'
		: `Are you sure you want to delete the camper “${camperName || targetCamperName || camperEmail}”?`;

	const handleDelete = useCallback(async () => {
		additionalHandler?.();
		await deleteCamper(camperEmail);

		if (isDeletingAccount) {
			logout();
		}
  }, [additionalHandler, deleteCamper, camperEmail, logout]);

	return (
		<>
			<Button
				className={classNames(styles.btn, mods, [className])}
				theme={buttonTheme}
				size={buttonSize}
				color={buttonColor}
				onClick={open}
			>
				{buttonLabel}
				{icon && <Icon icon={<TrashIcon />} size={iconSize} />}
			</Button>
			<ConfirmModalTemplate
				isOpen={isOpen}
				onClose={close}
				title={modalTitle}
				btnLabel={'YES, DELETE'}
				handler={handleDelete}
			/>
		</>
	);
});

export default DeleteCamperButton;
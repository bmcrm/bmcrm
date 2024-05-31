import styles from './ProfileHeaderAvatar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import ProfileAvatarTooltip from 'features/ProfileAvatarTooltip';
import { useCallback, useState } from 'react';

const STATIC_DATA = {
	alt: 'Alex Roman',
	src: './src/shared/assets/images/avatars/Alex Roman.png',
};

type ProfileHeaderAvatarProps = {
	className?: string;
};

const ProfileHeaderAvatar = ({ className }: ProfileHeaderAvatarProps) => {
	const [isHovered, setIsHovered] = useState(false);

	const mouseEnterHandler = () => {
		setIsHovered(true);
	};

	const mouseLeaveHandler = useCallback(() => {
		setIsHovered(false);
	}, []);
	
	return (
		<div
			className={classNames(styles.profileAvatar, {}, [className])}
			onMouseEnter={mouseEnterHandler}
			onMouseLeave={mouseLeaveHandler}
		>
			<h2 className={styles.profileAvatar__name}>Alex Roman</h2>
			<Avatar
				size={40}
				alt={STATIC_DATA.alt}
				src={STATIC_DATA.src}
			/>
			{isHovered && <ProfileAvatarTooltip onClick={mouseLeaveHandler}/>}
		</div>
	);
};

export default ProfileHeaderAvatar;

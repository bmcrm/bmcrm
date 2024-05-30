import styles from './ProfileHeaderAvatar.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Avatar from 'shared/ui/Avatar/Avatar';
import AvatarImg from 'shared/assets/images/avatars/Alex Roman.png';

type ProfileHeaderAvatarProps = {
	className?: string;
};

const ProfileHeaderAvatar = ({ className }: ProfileHeaderAvatarProps) => {
	return (
		<div className={classNames(styles.profileAvatar, {}, [className])}>
			<h2 className={styles.profileAvatar__name}>Alex Roman</h2>
			<Avatar
				size={ 40 }
				alt={'Alex Roman'}
				src={AvatarImg}
			/>
		</div>
	);
};

export default ProfileHeaderAvatar;

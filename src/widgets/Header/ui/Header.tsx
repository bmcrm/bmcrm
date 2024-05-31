import styles from './Header.module.scss';
import Logo from 'shared/assets/icons/logo.svg';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { Nav } from 'features/Nav';
import { ProfileHeaderAvatar } from 'entities/Profile';

type HeaderProps = {
	className?: string;
};

const Header = memo(({ className }: HeaderProps) => {
	return (
		<header className={classNames(styles.header, {}, [className])}>
			<div className={styles.header__container}>
				<strong className={styles.logo}>
					<Link to="/" className={styles.logo__link}>
						<Logo/>
					</Link>
				</strong>
				<Nav/>
				<ProfileHeaderAvatar/>
			</div>
		</header>
	);
});

export default Header;

import { memo } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './Logo.module.scss';
import LogoIcon from '@shared/assets/icons/logo.svg';

type LogoProps = {
	className?: string;
	to?: string;
};

const Logo = memo(({ className, to = RoutePath.campers }: LogoProps) => (
	<strong className={classNames(styles.logo, {}, [className])}>
		<Link to={to} className={styles.logo__link}><LogoIcon /></Link>
	</strong>
));

export default Logo;
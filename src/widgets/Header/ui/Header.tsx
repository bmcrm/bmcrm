import styles from './Header.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import Logo from 'shared/assets/icons/logo.svg';

type HeaderProps = {
	className?: string;
};

const Header = ({ className }: HeaderProps) => {
	return (
		<header className={classNames(styles.header, {}, [className])}>
			<div className={styles.header__container}>
				<strong className={styles.logo}>
					<Link to="/" className={styles.logo__link}>
						<Logo/>
					</Link>
				</strong>
			</div>
		</header>
	);
};

export default Header;

import styles from './Header.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

type HeaderProps = {
	className?: string;
};

const Header = ({ className }: HeaderProps) => {
	return (
		<header className={classNames(styles.header, {}, [className])}>
			<div className={styles.header__container}>
				<h2>header</h2>
			</div>
		</header>
	);
};

export default Header;

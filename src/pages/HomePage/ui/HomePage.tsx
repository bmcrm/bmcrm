import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Loader } from '@shared/ui/Loader';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './HomePage.module.scss';

type HomePageProps = {
	className?: string;
};

const HomePage = ({ className }: HomePageProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(RoutePath.campers, { replace: true });
	}, [navigate]);

	return (
		<section className={classNames(styles.home, {}, [className])}>
			<Container className={styles.home__container}>
				<Loader />
			</Container>
		</section>
	);
};

export default HomePage;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { RoutePath } from '@app/providers/AppRouter';

type HomePageProps = {
	className?: string;
};

const HomePage = ({ className }: HomePageProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(RoutePath.campers, { replace: true });
	}, [navigate]);

	return (
		<section className={classNames('', {}, [className])}>
			<Container>
				<h1>Home Page</h1>
			</Container>
		</section>
	);
};

export default HomePage;
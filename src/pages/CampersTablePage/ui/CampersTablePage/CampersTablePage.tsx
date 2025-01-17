import { Container } from '@shared/ui/Container';
import { useGetCampers } from '@entities/Camper';
import styles from './CampersTablePage.module.scss';
import { CampersTable } from '../CampersTable/CampersTable';

const CampersTablePage = () => {
	const { data: campers } = useGetCampers();

	console.log('campers: ', campers);

	return (
		<section className={styles.tablePage}>
			<Container>
				{campers && <CampersTable campers={campers} />}
			</Container>
		</section>
	);
};

export default CampersTablePage;
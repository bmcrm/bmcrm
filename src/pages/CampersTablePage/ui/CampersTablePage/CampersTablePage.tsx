import { Container } from '@shared/ui/Container';
import { useGetCampers } from '@entities/Camper';
import { CampersTable } from '../CampersTable/CampersTable';
import styles from './CampersTablePage.module.scss';

const CampersTablePage = () => {
	const { data: campers } = useGetCampers();

	return (
		<section className={styles.tablePage}>
			<Container>
				{campers && <CampersTable campers={campers} />}
			</Container>
		</section>
	);
};

export default CampersTablePage;
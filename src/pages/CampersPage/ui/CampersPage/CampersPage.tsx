import { Container } from '@shared/ui/Container';
import { useGetCampers } from '@entities/Camper';
import { CampersTable } from '../CampersTable/CampersTable';

const CampersPage = () => {
	const { data: campers } = useGetCampers();

	return (
		<section>
			<Container fluid>
				{campers && <CampersTable campers={campers} />}
			</Container>
		</section>
	);
};

export default CampersPage;
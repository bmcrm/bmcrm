import { useEffect, useState } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { Container } from '@shared/ui/Container';
import { InviteButton } from '@features/InviteButton';
import { Funnel } from '../Funnel/Funnel';
import { FunnelCards } from '../FunnelCards/FunnelCards';
import { useGetCampers, type ICampersByRole, CamperRole } from '@entities/Camper';
import { userState } from '@entities/User';
import styles from './FunnelPage.module.scss';

const FunnelPage = () => {
	const [campersByRole, setCampersByRole] = useState<ICampersByRole>({
		[CamperRole.TCO]: [],
		[CamperRole.COORG]: [],
		[CamperRole.PROSPECT]: [],
		[CamperRole.QUALIFIED]: [],
		[CamperRole.INTENT]: [],
		[CamperRole.CAMPER]: [],
	});
	const { isMobile } = useMedia();
	const { data: campers } = useGetCampers();
	const { tokens: { decodedIDToken } } = userState();
	const canInvite = decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG;

	useEffect(() => {
		if (campers && campers.length > 0) {
			const sortedCampers: ICampersByRole = {
				[CamperRole.TCO]: [],
				[CamperRole.COORG]: [],
				[CamperRole.PROSPECT]: [],
				[CamperRole.QUALIFIED]: [],
				[CamperRole.INTENT]: [],
				[CamperRole.CAMPER]: [],
			};

			campers.forEach((camper) => {
				const role = camper.role as keyof ICampersByRole;

				if (role in sortedCampers) {
					sortedCampers[role].push(camper);
				}
			});

			setCampersByRole(sortedCampers);
		}
	}, [campers]);

	return (
		<>
			<section className={styles.funnel}>
				<Container fluid>
					<div className={styles.funnel__head}>
						<Funnel
							campers={{
								[CamperRole.PROSPECT]: campersByRole[CamperRole.PROSPECT].length,
								[CamperRole.QUALIFIED]: campersByRole[CamperRole.QUALIFIED].length,
								[CamperRole.INTENT]: campersByRole[CamperRole.INTENT].length,
								[CamperRole.CAMPER]: campersByRole[CamperRole.CAMPER].length + campersByRole[CamperRole.TCO].length + campersByRole[CamperRole.COORG].length,
							}}
						/>
						{canInvite && <InviteButton className={styles.funnel__btn} />}
					</div>
					<FunnelCards campersByRole={campersByRole} customStyles={{ marginTop: isMobile ? 30 : 40 }} />
				</Container>
			</section>
		</>
	);
};

export default FunnelPage;

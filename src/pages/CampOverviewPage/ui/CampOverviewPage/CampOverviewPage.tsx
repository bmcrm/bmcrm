import { memo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { Header, HeaderTheme } from '@widgets/Header';
import { NotFound } from '@widgets/CampNotFound';
import { SectionOverview } from '../SectionOverview/SectionOverview';
import { SectionRegister } from '../SectionRegister/SectionRegister';
import { useGetCamp } from '@entities/Camp';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './CampOverviewPage.module.scss';

const CampOverviewPage = memo(() => {
	const scrollTarget = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();
	const { data: camp, isLoading, isError } = useGetCamp({ campID: id ?? '', enabled: !!id });

	return (
		<>
			<Header theme={HeaderTheme.OVERVIEW}/>
			<main className={classNames(styles.page, { [styles.error]: isError }, [])}>
				{isError ? (
					<NotFound textRedirect={'CREATE A CAMP AND ACCOUNT'} redirectTo={RoutePath.registration}>
						<h1>Such a camp doesn't exist!</h1>
						<p>Want to create it? Click the button below!</p>
					</NotFound>
				) : (
					<>
						<SectionOverview camp={camp || null} isLoading={isLoading} scrollTarget={scrollTarget} />
						{!isLoading && <SectionRegister camp={camp || null} id={id} scrollTarget={scrollTarget} />}
					</>
				)}
			</main>
		</>
	);
});

export default CampOverviewPage;

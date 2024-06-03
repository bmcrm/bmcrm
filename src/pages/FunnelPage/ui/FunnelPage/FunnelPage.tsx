import styles from './FunnelPage.module.scss';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Sidebar from 'widgets/Sidebar';

const FunnelPage = memo(() => {
	return (
		<>
			<Sidebar title={'Funnel Page Sidebar'}/>
			<section className={classNames(styles.funnel, {}, [])}>
				<h1>Funnel Page</h1>
			</section>
		</>
	);
});

export default FunnelPage;

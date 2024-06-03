import styles from './PageLoader.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';

type PageLoaderProps = {
	className?: string;
};

const PageLoader = ({ className }: PageLoaderProps) => {
	return (
		<div className={classNames(styles.pageLoader, {}, [className])}>
			<Loader/>
		</div>
	);
};

export default PageLoader;

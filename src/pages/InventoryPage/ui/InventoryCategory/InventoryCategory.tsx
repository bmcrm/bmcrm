import { memo, useCallback, useEffect, useRef } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Loader } from '@shared/ui/Loader';
import { InventoryCard } from '@features/InventoryCard';
import type { IInventoryItem } from '@entities/Inventory';
import styles from './InventoryCategory.module.scss';

type InventoryCategoryProps = {
	className?: string;
	category?: string;
	items?: IInventoryItem[];
	handleLoadMore?: () => void;
	hasNextPage?: boolean;
	isLoadingNextPage?: boolean;
};

const InventoryCategory = memo((props: InventoryCategoryProps) => {
	const { className, category, items, handleLoadMore, hasNextPage, isLoadingNextPage } = props;
	const triggerRef = useRef<HTMLDivElement>(null);

	const observerCallback = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries;
			if (entry.isIntersecting && hasNextPage && !isLoadingNextPage) {
				handleLoadMore?.();
			}
		},
		[hasNextPage, isLoadingNextPage, handleLoadMore]
	);

	useEffect(() => {
		if (!triggerRef.current) return;

		const observer = new IntersectionObserver(observerCallback, {
			root: null,
			rootMargin: '0px 0px 40px',
			threshold: 0,
		});

		observer.observe(triggerRef.current);

		return () => {
			if (triggerRef.current) observer.unobserve(triggerRef.current);
		};
	}, [observerCallback]);

	return (
		<div className={classNames(styles.category, {}, [className])}>
			<h2 className={styles.category__title}>{category}<span className={styles.counter}> - {items?.length}</span></h2>
			<ul className={styles.category__list}>
				{items?.map(item => <InventoryCard key={item.id} item={item} />)}
			</ul>
			{isLoadingNextPage && <Loader className={'m-centred mt-20'} />}
			<div ref={triggerRef} className={styles.trigger} />
		</div>
	);
});

export { InventoryCategory };
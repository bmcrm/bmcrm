import { memo, useCallback } from 'react';
import { useMedia } from '@shared/hooks/useMedia';
import { useToast } from '@shared/hooks/useToast';
import { Image } from '@shared/ui/Image';
import { Icon, IconSize } from '@shared/ui/Icon';
import type { ICamp } from '@entities/Camp';
import styles from './AlreadyRegisteredBlock.module.scss';
import CopyIcon from '@shared/assets/icons/copy_icon.svg';
import DesertImg from '@shared/assets/images/auth/desert.png';

type AlreadyRegisteredBlockProps = {
	camp: ICamp | null;
};

const AlreadyRegisteredBlock = memo(({ camp }: AlreadyRegisteredBlockProps) => {
	const { isMobile } = useMedia();
	const { success, error } = useToast();

	const handleCopyClick = useCallback(async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			success('Copied!');
		} catch {
			error('Failed to copy!');
		}
	}, [error, success]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.item}>
				<div className={styles.item__content}>
					<p className={styles.item__caption}>You are already a part of the camp</p>
					<p>If you have questions reach out to the camp TCO via mail</p>
					<div className={styles.tco}>
						{camp?.tco_fullname && <h3 className={styles.tco__name}>{camp.tco_fullname}</h3>}
						<div className={styles.tco__data} onClick={() => handleCopyClick(camp?.tco as string)}>
							<p>{camp?.tco}</p>
							<Icon icon={<CopyIcon/>} size={IconSize.SIZE_20 }/>
						</div>
					</div>
				</div>
				{!isMobile && <Image src={DesertImg} alt={'desert'} />}
			</div>
		</div>
	);
});

export default AlreadyRegisteredBlock;

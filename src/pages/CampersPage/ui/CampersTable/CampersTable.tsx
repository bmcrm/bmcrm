import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useToggle } from '@shared/hooks/useToggle';
import { dateNormalize } from '@shared/lib/dateNormalize';
import { filterTagsByKey, multiValueFilter, Table } from '@widgets/Table';
import { Button, ButtonSize } from '@shared/ui/Button';
import { CamperTag, CamperTagTheme } from '@features/CamperTag';
import { CamperDetailsModal } from '@widgets/CamperDetailsModal';
import { userState } from '@entities/User';
import { CamperRole, type ICamper } from '@entities/Camper';
import styles from './CampersTable.module.scss';

type CampersTableProps = {
	className?: string;
	campers: ICamper[];
};

const CampersTable = (props: CampersTableProps) => {
	const { campers } = props;
	const [camperEmail, setCamperEmail] = useState('');
	const { isOpen, open, close } = useToggle();
	const { tokens: { decodedIDToken } } = userState();
	const portalTargetRef = useRef<HTMLDivElement>(null);
	const tableScrollRef = useRef<HTMLDivElement>(null);
	const isTCO = decodedIDToken?.role === CamperRole.TCO;
	const userEmail = decodedIDToken?.email;

	const handleOpenDetails = useCallback((email: string) => {
		setCamperEmail(email);
		open();
	}, [open]);

	const columns = useMemo<ColumnDef<ICamper>[]>(
		() => [
			{
				accessorKey: 'first_name',
				header: 'Name',
				cell: (info) => {
					const row = info.row.original;
					const firstName = row.first_name || '';
					const lastName = row.last_name || '';
					const email = row.email || '';
					const canEdit = isTCO || userEmail === email;

					return (
						<div className={styles.table__cell}>
							<p>{firstName} {lastName}</p>
							{canEdit && (
								<Button
									size={ButtonSize.S}
									onClick={() => handleOpenDetails(email)}
									style={{ marginLeft: 'auto' }}
								>
									Edit
								</Button>
							)}
						</div>
					);
				},
			},
			{
				accessorKey: 'playa_name',
				header: 'Playa Name',
			},
			{
				accessorKey: 'role',
				header: 'Role',
				filterFn: multiValueFilter,
			},
			{
				accessorKey: 'email',
				header: 'Email',
				cell: (info) => (
					<a href={`mailto:${info.getValue()}`} className={styles.table__link}>{info.getValue() as ReactNode}</a>
				),
			},
			{
				accessorKey: 'city',
				header: 'City',
			},
			{
				accessorKey: 'tags',
				header: 'Tags',
				filterFn: filterTagsByKey,
				enableSorting: false,
				cell: (info) => {
					const row = info.row.original;
					const tags = row.tags || {};

					return (
						<div className={styles.table__cell} style={{ justifyContent: 'center' }}>
							{Object.entries(tags).map(([name, details], i) => (
								<CamperTag
									key={`${name}-${i}`}
									theme={CamperTagTheme.TABLE}
									tag={{ name, details }}
									portalTargetRef={portalTargetRef}
									tableScrollRef={tableScrollRef}
								/>
							))}
						</div>
					);
				},
			},
			{
				accessorKey: 'created_at',
				header: 'Created At',
				cell: (info) => dateNormalize(info.getValue() as string),
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated At',
				cell: (info) => dateNormalize(info.getValue() as string),
			},
		],
		[handleOpenDetails, userEmail]
	);

	return (
		<>
			<Table<ICamper>
				title={'All Campers'}
				columns={columns}
				data={campers}
				portalTargetRef={portalTargetRef}
				tableScrollRef={tableScrollRef}
			/>
			<CamperDetailsModal
				camperEmail={camperEmail}
				isOpen={isOpen}
				onClose={close}
			/>
		</>
	);
};

export { CampersTable };
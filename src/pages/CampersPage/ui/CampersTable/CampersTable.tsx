import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { useToggle } from '@shared/hooks/useToggle';
import { classNames } from '@shared/lib/classNames';
import { dateNormalize } from '@shared/lib/dateNormalize';
import { filterTags, multiValueFilter, Table } from '@widgets/Table';
import { Button, ButtonSize } from '@shared/ui/Button';
import { CamperTag, CamperTagTheme } from '@features/CamperTag';
import { SocialIcon } from '@features/SocialIcon';
import { CamperDetailsModal, CamperDetailsModalTheme } from '@widgets/CamperDetailsModal';
import { userState } from '@entities/User';
import { CamperRole, type ICamper } from '@entities/Camper';
import styles from './CampersTable.module.scss';

type CampersTableProps = {
	campers: ICamper[];
};

const CampersTable = ({ campers }: CampersTableProps) => {
	const [camperEmail, setCamperEmail] = useState('');
	const [detailsTheme, setDetailsTheme] = useState<CamperDetailsModalTheme>(CamperDetailsModalTheme.EDIT);
	const { isOpen, open, close } = useToggle();
	const { tokens: { decodedIDToken } } = userState();
	const portalTargetRef = useRef<HTMLDivElement>(null);
	const tableScrollRef = useRef<HTMLDivElement>(null);
	const canEdit = decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG;

	const handleOpenDetails = useCallback(
		({ email, detailsTheme }: { email: string, detailsTheme: CamperDetailsModalTheme }) => {
			setCamperEmail(email);
			setDetailsTheme(detailsTheme);
			open();
		},
		[open]
	);

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
					const currentUser = decodedIDToken?.email === email;

					return (
						<div className={classNames(styles.table__cell, {}, [styles.name])}>
							<p
								className={styles.table__camperName}
								onClick={() => handleOpenDetails({ email, detailsTheme: CamperDetailsModalTheme.DEFAULT })}
							>
								{firstName} {lastName}
							</p>
							{(canEdit || currentUser) && (
								<Button
									size={ButtonSize.S}
									onClick={() => handleOpenDetails({ email, detailsTheme: CamperDetailsModalTheme.EDIT })}
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
				cell: (info) => (
					<p style={{ wordBreak: 'break-word' }}>
						{info.getValue() as string}
					</p>
				),
			},
			{
				accessorKey: 'birthdayDate',
				header: 'Birthday',
				cell: (info) => info.getValue()
					? format(info.getValue() as string, 'dd.MM.yyyy')
					: '',
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
					<div style={{ minWidth: 180 }}>
						<a href={`mailto:${info.getValue()}`} className={styles.table__link}>{info.getValue() as ReactNode}</a>
					</div>
				),
			},
			{
				accessorKey: 'city',
				header: 'City',
			},
			{
				accessorKey: 'social_links',
				header: 'Socials',
				cell: (info) => {
					const row = info.row.original;
					const socials = row.social_links || [];

					return (
						<div className={styles.table__socials}>
							{socials.map((social, i) => <SocialIcon key={i} social={social} />)}
						</div>
					);
				},
			},
			{
				accessorKey: 'tags',
				header: 'Tags',
				filterFn: filterTags,
				enableSorting: false,
				cell: (info) => {
					const row = info.row.original;
					const tags = row.tags || {};

					return (
						<div className={styles.table__cell} style={{ justifyContent: 'center', minWidth: 200 }}>
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
				cell: (info) => info.getValue() ? dateNormalize(info.getValue() as string) : '',
			},
		],
		[handleOpenDetails, decodedIDToken?.email]
	);

	return (
		<>
			<Table<ICamper>
				title={'All Campers'}
				columns={columns}
				data={campers}
				portalTargetRef={portalTargetRef}
				tableScrollRef={tableScrollRef}
				isInviteButton
				isCreateButton
			/>
			<CamperDetailsModal
				camperEmail={camperEmail}
				theme={detailsTheme}
				isOpen={isOpen}
				onClose={close}
			/>
		</>
	);
};

export { CampersTable };
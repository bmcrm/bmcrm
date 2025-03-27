import { useCallback, useMemo, useRef, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useToggle } from '@shared/hooks/useToggle';
import { useMedia } from '@shared/hooks/useMedia';
import { classNames } from '@shared/lib/classNames';
import { dateFormatter } from '@shared/lib/dateFormatter';
import { filterTags, multiValueFilter, Table } from '@widgets/Table';
import { Button, ButtonColor, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import { Icon, IconSize } from '@shared/ui/Icon';
import { DeleteCamperButton } from '@features/DeleteCamperButton';
import { SocialIcon } from '@features/SocialIcon';
import { TruncatedText } from '@features/TruncatedText';
import { CamperDetailsModal, CamperDetailsModalTheme } from '@widgets/CamperDetailsModal';
import { userState } from '@entities/User';
import { CamperRole, type ICamper } from '@entities/Camper';
import styles from './CampersTable.module.scss';
import EditIcon from '@shared/assets/icons/edit_icon.svg';

type CampersTableProps = {
	campers: ICamper[];
};

const CampersTable = ({ campers }: CampersTableProps) => {
	const [camperEmail, setCamperEmail] = useState('');
	const [detailsTheme, setDetailsTheme] = useState<CamperDetailsModalTheme>(CamperDetailsModalTheme.EDIT);
	const { isOpen, open, close } = useToggle();
	const { isExtraLargePCBreakpoint } = useMedia();
	const { tokens: { decodedIDToken } } = userState();
	const portalTargetRef = useRef<HTMLDivElement>(null);
	const tableScrollRef = useRef<HTMLDivElement>(null);
	const canControl = decodedIDToken?.role === CamperRole.TCO || decodedIDToken?.role === CamperRole.COORG;

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
				meta: {
					className: classNames(styles.table__cell, {}, [styles.name]),
				},
				cell: (info) => {
					const row = info.row.original;
					const firstName = row.first_name || '';
					const lastName = row.last_name || '';
					const email = row.email || '';
					const role = row.role || '';
					const currentUser = decodedIDToken?.email === email;
					const isTCO = role === CamperRole.TCO;
					const isCOORG = role === CamperRole.COORG;
					const isCurrentUserTCO = decodedIDToken?.role === CamperRole.TCO;
					const isCurrentUserCOORG = decodedIDToken?.role === CamperRole.COORG;

					const canDelete = isCurrentUserTCO
						? !currentUser
						: isCurrentUserCOORG
							? !isTCO && (currentUser || !isCOORG)
							: currentUser;

					return (
						<div className={classNames(styles.table__row, {}, [styles.wrap])}>
							<p
								className={styles.table__camperName}
								onClick={() => handleOpenDetails({ email, detailsTheme: CamperDetailsModalTheme.DEFAULT })}
							>
								{firstName} {lastName}
							</p>
							{(canControl || currentUser) && (
								<div className={classNames(styles.table__row, {}, ['ml-a'])}>
									<Button
										size={ButtonSize.TEXT}
										className={styles.table__btn}
										onClick={() => handleOpenDetails({ email, detailsTheme: CamperDetailsModalTheme.EDIT })}
										aria-label={'Edit camper button'}
									>
										<Icon icon={<EditIcon />} size={IconSize.SIZE_12} />
									</Button>
									{canDelete && (
										<DeleteCamperButton
											camperEmail={email}
											camperName={`${firstName} ${lastName}`}
											buttonColor={ButtonColor.NEUTRAL}
											buttonTheme={ButtonTheme.OUTLINE_NEUTRAL}
											iconSize={IconSize.SIZE_12}
											icon
										/>
									)}
								</div>
							)}
						</div>
					);
				},
			},
			{
				accessorKey: 'playa_name',
				header: 'Playa Name',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.playa]),
				},
				cell: (info) => (
					<TruncatedText
						text={info.getValue() as string}
						maxLength={isExtraLargePCBreakpoint ? 15 : 25}
						nowrap
					/>
				),
			},
			{
				accessorKey: 'birthdayDate',
				header: 'Birthday',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.birthday]),
				},
				cell: (info) => info.getValue()
					? dateFormatter(info.getValue() as string, 'withoutYear')
					: '',
			},
			{
				accessorKey: 'role',
				header: 'Role',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.role]),
				},
				filterFn: multiValueFilter,
			},
			{
				accessorKey: 'email',
				header: 'Email',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.email]),
				},
				cell: (info) => (
					<TruncatedText
						text={info.getValue() as string}
						url={`mailto:${info.getValue()}`}
						maxLength={isExtraLargePCBreakpoint ? 15 : 25}
						nowrap
					/>
				),
			},
			{
				accessorKey: 'city',
				header: 'City',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.city]),
				},
				cell: (info) => (
					<TruncatedText
						text={info.getValue() as string}
						maxLength={isExtraLargePCBreakpoint ? 10 : 20}
						nowrap
					/>
				),
			},
			{
				accessorKey: 'social_links',
				header: 'Socials',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.socials]),
				},
				cell: (info) => {
					const row = info.row.original;
					const socials = row.social_links || [];
					const filteredSocials = socials?.filter(sl => sl.name && sl.url);

					return (
						<div className={classNames(styles.table__row, {}, [styles.center, styles.wrap, 'm-centred'])}>
							{filteredSocials.map((social, i) => <SocialIcon key={i} social={social} />)}
						</div>
					);
				},
			},
			{
				accessorKey: 'tags',
				header: 'Tags',
				filterFn: filterTags,
				enableSorting: false,
				meta: {
					className: classNames(styles.table__cell, {}, [styles.tags]),
				},
				cell: (info) => {
					const row = info.row.original;
					const tags = row.tags || {};

					return (
						<div className={styles.table__row}>

							<ul className={styles.table__tags}>
								{Object.entries(tags).map(([name, details]) => (
									<li key={name}>
										<span className={'fw-600'}>{name}</span>: {details.join(', ')}
									</li>
								))}
							</ul>
						</div>
					);
				},
			},
			{
				accessorKey: 'created_at',
				header: 'Created At',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.date]),
				},
				cell: (info) => dateFormatter(info.getValue() as string),
			},
			{
				accessorKey: 'updated_at',
				header: 'Updated At',
				meta: {
					className: classNames(styles.table__cell, {}, [styles.date]),
				},
				cell: (info) => info.getValue()
					? dateFormatter(info.getValue() as string)
					: '',
			},
		],
		[handleOpenDetails, decodedIDToken?.email, decodedIDToken?.role, isExtraLargePCBreakpoint]
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
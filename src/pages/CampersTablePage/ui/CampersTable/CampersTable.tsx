import { useMemo, type ReactNode } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { classNames } from '@shared/lib/classNames';
import { Table } from '@widgets/Table';
import { CamperRole, ICamper } from '@entities/Camper';
import styles from './CampersTable.module.scss';

type CampersTableProps = {
	className?: string;
	campers: ICamper[];
};

const MOCK_DATA: ICamper[] = [
	{
		"about_me": "About me1",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "surfySky",
		"email": "surfysky1@karmafixer.com",
		"camp_name": "sky-camp",
		"city": "Kyiv",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Smith",
		"role": CamperRole.CAMPER,
		"first_name": "John",
		"email_confirmed": true,
		"camp_id": "sky-camp"
	},
	{
		"about_me": "About me2",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "vladyslave",
		"email": "v.poliakov@karmafixer.com",
		"camp_name": "vl-camp",
		"city": "Kharkiv",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Poliakov",
		"role": CamperRole.TCO,
		"first_name": "Vlad",
		"email_confirmed": true,
		"camp_id": "vl-camp"
	},
	{
		"about_me": "About me3",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "artistryJane",
		"email": "artistry@karmafixer.com",
		"camp_name": "art-camp",
		"city": "Odesa",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Doe",
		"role": CamperRole.QUALIFIED,
		"first_name": "Jane",
		"email_confirmed": true,
		"camp_id": "art-camp"
	},
	{
		"about_me": "About me4",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "leadLion",
		"email": "lionlead@karmafixer.com",
		"camp_name": "lion-camp",
		"city": "Dnipro",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Brown",
		"role": CamperRole.INTENT,
		"first_name": "Emily",
		"email_confirmed": true,
		"camp_id": "lion-camp"
	},
	{
		"about_me": "About me5",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "qualifiedQueen",
		"email": "queen@karmafixer.com",
		"camp_name": "queen-camp",
		"city": "Ternopil",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Green",
		"role": CamperRole.CAMPER,
		"first_name": "Sophia",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
	{
		"about_me": "About me5",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "linda44",
		"email": "linda44@karmafixer.com",
		"camp_name": "linda44-camp",
		"city": "Buka",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Odonnell",
		"role": CamperRole.CAMPER,
		"first_name": "Amber",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
	{
		"about_me": "About me6",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "wangnicholas",
		"email": "lola@karmafixer.com",
		"camp_name": "carry-camp",
		"city": "Dnipro",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Mary",
		"role": CamperRole.INTENT,
		"first_name": "Boyd",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
	{
		"about_me": "About me5",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "davischristina",
		"email": "queen@karmafixer.com",
		"camp_name": "davischristina-camp",
		"city": "Lviv",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Henderson",
		"role": CamperRole.INTENT,
		"first_name": "James",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
	{
		"about_me": "About me5",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "emilyjohnson",
		"email": "emilyjohnson@karmafixer.com",
		"camp_name": "emilyjohnson-camp",
		"city": "Lviv",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Allen",
		"role": CamperRole.QUALIFIED,
		"first_name": "Erin",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
	{
		"about_me": "About me5",
		"camp_website": "",
		"created_at": "2024-12-31T09:27:35.259Z",
		"playa_name": "paulflores",
		"email": "paulflores@karmafixer.com",
		"camp_name": "paulflores-camp",
		"city": "Lviv",
		"updated_at": "2025-01-07T15:49:35.940Z",
		"history": [
			{
				"year": 2025,
				"value": ""
			}
		],
		"last_name": "Mckinney",
		"role": CamperRole.LEAD,
		"first_name": "Patricia",
		"email_confirmed": true,
		"camp_id": "queen-camp"
	},
];

const CampersTable = (props: CampersTableProps) => {
	const { className, campers } = props;

	console.log('campers: ', campers);

	const columns = useMemo<ColumnDef<ICamper>[]>(
		() => [
			{
				accessorKey: 'first_name',
				header: 'First Name',
				// cell: info => info.getValue(),
			},
			{
				accessorFn: row => row.last_name,
				id: 'last_name',
				// cell: info => info.getValue(),
				header: 'Last Name',
				sortUndefined: 'last',
				sortDescFirst: false,
			},
			{
				accessorKey: 'playa_name',
				header: 'Playa Name',
			},
			{
				accessorKey: 'role',
				header: 'Role',
				// sortUndefined: 'last',
			},
			{
				accessorKey: 'email',
				// header: () => <span>Email</span>,
				header: 'Email',
				cell: (info) => (
					<a href={`mailto:${info.getValue()}`} className={styles.table__link}>{info.getValue() as ReactNode}</a>
				),
				// sortingFn: sortStatusFn,
			},
			{
				accessorKey: 'city',
				header: 'City',
			},
			{
				accessorKey: 'created_at',
				header: 'Created At',
				// invertSorting: true,
			},
		],
		[]
	);

	return (
		<div className={classNames(styles.table, {}, [className])}>
			<Table<ICamper> columns={columns} data={MOCK_DATA} />
		</div>
	);
};

export { CampersTable };
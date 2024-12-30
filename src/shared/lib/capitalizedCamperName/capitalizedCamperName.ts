type Props = {
	first_name?: string | null;
	last_name?: string | null;
	playa_name?: string | null;
	email?: string | null;
}

export const capitalizedCamperName = (props: Props) => {
	const { first_name, last_name, playa_name, email } = props;

	const firstLastName = first_name && last_name ? `${first_name} ${last_name}` : null;
	const name = playa_name || firstLastName || email;

	return name
		?.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};
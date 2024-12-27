import { memo, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { CampOverview, useGetCamp } from '@entities/Camp';
import {
	CamperRegisterForm,
	type ICamperRegistrationData,
	IRegistrationStage,
	useRegistration,
	userState
} from '@entities/User';
import { FormLoader } from '@features/FormLoader';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { AlreadyRegisteredBlock } from '@features/AlreadyRegisteredBlock';
import { RoutePath } from '@app/providers/AppRouter';
import { NotFound } from '@widgets/CampNotFound';
import styles from './CampOverviewPage.module.scss';
import Logo from '@shared/assets/icons/logo.svg';

const CampOverviewPage = memo(() => {
	const scrollTarget = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { isLoggedIn } = userState();
	const { data: camp, isLoading, isError } = useGetCamp({ campID: id ?? '', enabled: !!id });
	const { mutateAsync: registration, isPending } = useRegistration();

	const submitHandler = useCallback(
		async (values: ICamperRegistrationData, resetForm: () => void) => {
			await registration({ stage: IRegistrationStage.REGISTRATION_CAMPER, data: values });
			resetForm();
			navigate(RoutePath.login, { replace: true, state: { email: values.email, password: values.password } });
		},
		[navigate, registration]
	);

	return (
		<>
			<header className={styles.header}>
				<Container>
					<strong className={styles.logo}>
						<Link to={RoutePath.funnel} className={styles.logo__link}>
							<Logo />
						</Link>
					</strong>
				</Container>
			</header>
			<main className={classNames(styles.page, { [styles.error]: isError }, [])}>
				{isError && (
					<NotFound textRedirect={'CREATE A CAMP AND ACCOUNT'} redirectTo={RoutePath.registration}>
						<h1>Such a camp doesn't exist!</h1>
						<p>Want to create it? Click the button below!</p>
					</NotFound>
				)}
				{!isError && (
					<section className={classNames(styles.overview, {}, [])}>
						<Container>
							<CampOverview camp={camp || null} isLoading={isLoading} scrollTarget={scrollTarget}/>
						</Container>
					</section>
				)}
				{!isLoading && !isError && (
					<section className={styles.register} ref={scrollTarget}>
						<Container>
							<AuthFormTemplate badge={'Register to Join the Camp'}>
								<CamperRegisterForm className={clsx(styles.form, isLoggedIn && styles.blur)} onSubmit={submitHandler} />
								{isPending && <FormLoader />}
								{isLoggedIn && <AlreadyRegisteredBlock camp={camp || null} />}
							</AuthFormTemplate>
						</Container>
					</section>
				)}
			</main>
		</>
	);
});

export default CampOverviewPage;

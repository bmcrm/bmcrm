import { memo, useCallback, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { useToast } from '@shared/hooks/useToast';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { CampOverview } from '@entities/Camp';
import { userState, useRegistration, CamperRegisterForm, type IUserRegisterData } from '@entities/User';
// import { FormLoader } from '@features/FormLoader';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { AlreadyRegisteredBlock } from '@features/AlreadyRegisteredBlock';
import { RoutePath } from '@app/providers/AppRouter';
import { NotFound } from '@widgets/CampNotFound';
import { logger, LogLevel, LogSource } from '@shared/lib/logger';
import styles from './CampOverviewPage.module.scss';
import Logo from '@shared/assets/icons/logo.svg';
import { useGetCamp } from '@entities/Camp';

const CampOverviewPage = memo(() => {
	const scrollTarget = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { success } = useToast();
	const { isLoggedIn } = userState();
	const { data: camp, isLoading, isError } = useGetCamp({ campID: id ?? '', enabled: !!id });
	const { mutateAsync: registration } = useRegistration();

	const submitHandler = useCallback(
		async (values: IUserRegisterData, resetForm: () => void) => {
			const data = { ...values, camp_id: id };

			await registration(data);

			logger(LogLevel.INFO, LogSource.WEBAPP, 'New user registered as camper', {
				user: values.email,
				camp_id: id,
			});

			success('Sign-up successful! We have sent you a verification code to your email, it is valid for 24 hours.');
			resetForm();
			navigate(RoutePath.sign_in, { replace: true, state: { email: values.email, password: values.password } });
		},
		[id, navigate, registration, success]
	);

	return (
		<>
			<header className={styles.header}>
				<Container>
					<strong className={styles.logo}>
						<Link to={RoutePath.funnel} className={styles.logo__link}>
							<Logo/>
						</Link>
					</strong>
				</Container>
			</header>
			<main className={classNames(styles.page, { [styles.error]: isError }, [])}>
				{isError && (
					<NotFound textRedirect="CREATE A CAMP AND ACCOUNT" redirectTo={RoutePath.sign_up}>
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
								<CamperRegisterForm className={clsx(styles.form, isLoggedIn && styles.blur)} onSubmit={submitHandler}/>
								{/*{authIsLoading && <FormLoader />}*/}
								{isLoggedIn && <AlreadyRegisteredBlock camp={camp || null}/>}
							</AuthFormTemplate>
						</Container>
					</section>
				)}
			</main>
		</>
	);
});

export default CampOverviewPage;

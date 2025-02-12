import { memo, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from '@shared/lib/classNames';
import { useMedia } from '@shared/hooks/useMedia';
import { Container } from '@shared/ui/Container';
import { Image } from '@shared/ui/Image';
import { Header, HeaderTheme } from '@widgets/Header';
import { CampOverview } from '@widgets/CampOverview';
import { FormLoader } from '@features/FormLoader';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { AlreadyRegisteredBlock } from '@features/AlreadyRegisteredBlock';
import { NotFound } from '@widgets/CampNotFound';
import { useGetCamp } from '@entities/Camp';
import {
	userState,
	CamperRegisterForm,
	useRegistration,
	type ICamperRegistrationData,
	IRegistrationStage,
} from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import styles from './CampOverviewPage.module.scss';
import FakeFormImg from '@shared/assets/images/camp-overview/fake-form.png';
import FakeFormMobileImg from '@shared/assets/images/camp-overview/fake-form_mobile.png';

const CampOverviewPage = memo(() => {
	const scrollTarget = useRef<HTMLDivElement>(null);
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { isLoggedIn } = userState();
	const { data: camp, isLoading, isError } = useGetCamp({ campID: id ?? '', enabled: !!id });
	const { mutateAsync: registration, isPending } = useRegistration();
	const { isMobile } = useMedia();

	const submitHandler = useCallback(
		async (values: Omit<ICamperRegistrationData, 'camp_name' | 'camp_id'>, resetForm: () => void) => {
			if (!camp?.camp_name || !id) return;

			const data: ICamperRegistrationData = {
				...values,
				camp_name: camp.camp_name,
				camp_id: id,
			};

			await registration({ stage: IRegistrationStage.REGISTRATION_CAMPER, data });

			const redirectState = {
				email: values.email,
				password: values.password,
				isConfirmation: true,
			};

			resetForm();
			navigate(RoutePath.login, { replace: true, state: redirectState });
		},
		[id, navigate, registration, camp?.camp_name]
	);

	return (
		<>
			<Header theme={HeaderTheme.OVERVIEW} />
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
							<CampOverview camp={camp || null} isLoading={isLoading} scrollTarget={scrollTarget} />
						</Container>
					</section>
				)}
				{!isLoading && !isError && (
					<section className={styles.register} ref={scrollTarget}>
						<Container>
							<AuthFormTemplate badge={'Register to Join the Camp'}>
								{isPending && <FormLoader />}
								{!isLoggedIn && <CamperRegisterForm className={styles.form} onSubmit={submitHandler} />}
								{isLoggedIn && (
									<>
										<Image
											src={isMobile ? FakeFormMobileImg : FakeFormImg}
											maxWidth={isMobile ? 300 : '100%'}
											className={'m-centred'}
										/>
										<AlreadyRegisteredBlock camp={camp || null} />
									</>
								)}
							</AuthFormTemplate>
						</Container>
					</section>
				)}
			</main>
		</>
	);
});

export default CampOverviewPage;

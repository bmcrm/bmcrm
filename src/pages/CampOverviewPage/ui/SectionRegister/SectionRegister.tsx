import { memo, useCallback, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '@shared/hooks/useMedia';
import { useToast } from '@shared/hooks/useToast';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import { Image } from '@shared/ui/Image';
import { AuthFormTemplate } from '@features/AuthFormTemplate';
import { FormLoader } from '@features/FormLoader';
import { AlreadyRegisteredBlock } from '@features/AlreadyRegisteredBlock';
import {
	CamperRegisterForm,
	useRegistration,
	userState,
	type ICamperRegistrationData,
	IRegistrationStage,
} from '@entities/User';
import { RoutePath } from '@app/providers/AppRouter';
import type { ICamp } from '@entities/Camp';
import styles from './SectionRegister.module.scss';
import FakeFormMobileImg from '@shared/assets/images/camp-overview/fake-form_mobile.png';
import FakeFormImg from '@shared/assets/images/camp-overview/fake-form.png';

type SectionRegisterProps = {
	className?: string;
	id?: string;
	camp: ICamp | null;
	scrollTarget: RefObject<HTMLDivElement>;
};

const SectionRegister = memo((props: SectionRegisterProps) => {
	const { className, id, camp, scrollTarget } = props;
	const navigate = useNavigate();
	const { isLoggedIn } = userState();
	const { isMobile } = useMedia();
	const { mutateAsync: registration, isPending } = useRegistration();
	const { error } = useToast();

	const submitHandler = useCallback(
		async (values: Omit<ICamperRegistrationData, 'camp_name' | 'camp_id'>, resetForm: () => void) => {
			if (!camp?.camp_name || !id) {
				error('Camp name not found!');
				return;
			}

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
		[id, navigate, registration, camp?.camp_name, error]
	);

	return (
		<section className={classNames(styles.register, {}, [className])} ref={scrollTarget}>
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
	);
});

export { SectionRegister };
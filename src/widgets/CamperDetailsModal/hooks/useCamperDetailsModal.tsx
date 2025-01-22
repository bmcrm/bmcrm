import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormikHelpers } from 'formik';
import { trimFields } from '../lib/trimFields';
import { useGetCampers, useUpdateCamper, type CamperSocial, type ICamper, CamperRole } from '@entities/Camper';
import { userState } from '@entities/User';

interface IUseCamperDetailsModalProps {
	camperEmail: string;
	onDetailsClose: () => void;
	isDetailsOpen: boolean;
}

const useCamperDetailsModal = ({ camperEmail, onDetailsClose, isDetailsOpen }: IUseCamperDetailsModalProps) => {
	const { data: [camper] = [], isLoading: isGetLoading } = useGetCampers({ camperEmail });
	const { mutate: updateCamper, isPending: isUpdatePending } = useUpdateCamper();
	const { tokens: { decodedIDToken } } = userState();
	const [socialIcons, setSocialIcons] = useState<CamperSocial[]>(camper?.social_links || []);
	const [isReadonly, setIsReadonly] = useState(false);
	const currentYear = new Date().getFullYear();
	const isLoading = isGetLoading || isUpdatePending;

	useEffect(() => {
		if (isDetailsOpen) {
			setIsReadonly(false);
		}
	}, [isDetailsOpen]);

	const toggleReadonly = useCallback(() => setIsReadonly(prev => !prev), []);

	const submitHandler = useCallback(
		async (values: Partial<ICamper>) => {
			toggleReadonly();
			const trimmedValues = trimFields(values);

			const data = {
				...trimmedValues,
				...(values.role !== CamperRole.TCO && decodedIDToken?.role === CamperRole.TCO ? { role: values.role } : {}),
			};

			updateCamper({ ...data, social_links: socialIcons, email: camperEmail! });
			onDetailsClose();
		},
		[camperEmail, decodedIDToken?.role, onDetailsClose, socialIcons, toggleReadonly, updateCamper]
	);

	const initialValues: Partial<ICamper> = useMemo(
		() => ({
			about_me: camper?.about_me || '',
			history: camper?.history?.map(item => ({
				year: item.year,
				value: item.value,
			})) || [{ year: currentYear, value: '' }],
			role: camper?.role,
		}),
		[camper?.about_me, camper?.history, camper?.role, currentYear]
	);

	const handleCancel = useCallback(
		(resetForm: FormikHelpers<Partial<ICamper>>['resetForm']) => {
			toggleReadonly();
			resetForm({ values: initialValues });
			setSocialIcons(camper?.social_links || []);
		},
		[camper?.social_links, initialValues, toggleReadonly]
	);

	return {
		camper,
		socialIcons,
		decodedIDToken,
		isLoading,
		isReadonly,
		initialValues,
		toggleReadonly,
		submitHandler,
		handleCancel,
		setSocialIcons,
	};
};

export { useCamperDetailsModal };
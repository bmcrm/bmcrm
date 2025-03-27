import * as yup from 'yup';
import { SocialNetworks, SocialNetworksData } from '@features/SocialIcon';
import { CamperRole } from '@entities/Camper';

const urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

export const registrationSchema = yup.object().shape({
	camp_name: yup
		.string()
		.trim()
		.required('Camp name is required')
		.min(3, 'Camp name must be at least 3 characters')
		.max(32, 'Less than 32 characters'),
	camp_id: yup.string().trim().required('Camp ID is required'),
	role: yup.string(),
	city: yup
		.string()
		.trim()
		.min(2, 'City name must be at least 2 characters')
		.max(32, 'Less than 32 characters')
		.required('City is required'),
	camp_website: yup.string().matches(urlRegex, 'Invalid website address').max(32, 'Less than 32 characters'),
	accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
	first_name: yup.string().trim().required('Field is required').max(32, 'First name must be less than 32 characters'),
	last_name: yup.string().trim().required('Field is required').max(32, 'Last name must be less than 32 characters'),
	playa_name: yup.string().trim().max(24, 'Less than 24 characters'),
	email: yup.string().trim().email('Invalid email address').required('Email is required'),
	password: yup
		.string()
		.trim()
		.min(8, 'Minimum 8 character')
		.max(40, 'Maximum 40 characters')
		.matches(/[A-Z]/, 'Uppercase letters')
		.matches(/[0-9]/, 'Numbers')
		.matches(/\W/, 'Special character')
		.required('Password is required'),
});

export const loginSchema = yup.object().shape({
	email: yup.string().trim().email('Invalid email address').required('Email is required'),
	password: yup
		.string()
		.trim()
		.min(8, 'Minimum 8 character')
		.max(40, 'Maximum 40 characters')
		.required('Password is required'),
});

export const inviteMemberSchema = yup.object().shape({
	email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

export const confirmUserSchema = yup.object().shape({
	code: yup.string().trim().required('Code is required'),
});

export const initResetPassSchema = yup.object().shape({
	email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

export const confirmResetPassSchema = yup.object().shape({
	confirm_code: yup.string().required('Code is required'),
	password: yup
		.string()
		.trim()
		.min(8, 'Minimum 8 character')
		.max(40, 'Maximum 40 characters')
		.matches(/[A-Z]/, 'Uppercase letters')
		.matches(/[0-9]/, 'Numbers')
		.matches(/\W/, 'Special character')
		.required('Password is required'),
	password_confirm: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required('Password confirmation is required'),
});

export const camperRegistrationSchema = yup.object().shape({
	accept: yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
	first_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'First name must be less than 32 characters'),
	last_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'Last name must be less than 32 characters'),
	playa_name: yup
		.string()
		.trim()
		.max(24, 'Less than 24 characters'),
	about_me: yup
		.string()
		.trim()
		.max(256, 'Less than 256 characters'),
	email: yup
		.string()
		.trim()
		.email('Invalid email address')
		.required('Email is required'),
	password: yup
		.string()
		.trim()
		.min(8, 'Minimum 8 character')
		.matches(/[A-Z]/, 'Uppercase letters')
		.matches(/[0-9]/, 'Numbers')
		.matches(/\W/, 'Special character')
		.required('Password is required'),
	socials: yup
		.array()
		.of(
			yup.object().shape({
				socialName: yup
					.mixed<SocialNetworks>()
					.oneOf(Object.keys(SocialNetworksData) as SocialNetworks[], 'Invalid social network')
					.required('Social network is required'),
				userName: yup
					.string()
					.trim()
					.notRequired()
					.test('custom-social-url', 'Enter a valid URL', function (value) {
						const { socialName } = this.parent;
						if (!value) return true; // Якщо поле порожнє — не перевіряємо

						if (socialName === SocialNetworks.DEFAULT) {
							return /^(https?:\/\/)?([\w.-]+)+\.\w{2,}(:\d+)?(\/.*)?$/.test(value);
						}
						return !/^https?:\/\//.test(value); // Якщо це не DEFAULT, то забороняємо URL
					}),
			})
		)
		.notRequired(),
});

export const userSettingsSchema = yup.object().shape({
	first_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'First name must be less than 32 characters'),
	last_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'Last name must be less than 32 characters'),
	playa_name: yup.string().trim().max(24, 'Less than 24 characters'),
	city: yup.string().trim().max(32, 'Less than 32 characters'),
	about_me: yup
		.string()
		.trim()
		.max(256, 'Less than 256 characters'),
	history: yup.array().of(
		yup.object().shape({
			year: yup.number().integer().positive(),
			value: yup.string().max(256, 'Less than 256 characters').notRequired(),
		})
	),
	birthdayDate: yup.date().notRequired(),
	socials: yup
		.array()
		.of(
			yup.object().shape({
				socialName: yup
					.mixed<SocialNetworks>()
					.oneOf(Object.keys(SocialNetworksData) as SocialNetworks[], 'Invalid social network')
					.required('Social network is required'),
				userName: yup
					.string()
					.trim()
					.notRequired()
					.test('custom-social-url', 'Enter a valid URL', function (value) {
						const { socialName } = this.parent;
						if (!value) return true; // Якщо поле порожнє — не перевіряємо

						if (socialName === SocialNetworks.DEFAULT) {
							return /^(https?:\/\/)?([\w.-]+)+\.\w{2,}(:\d+)?(\/.*)?$/.test(value);
						}
						return !/^https?:\/\//.test(value); // Якщо це не DEFAULT, то забороняємо URL
					}),
			})
		)
		.notRequired(),
});

export const campSettingsSchema = yup.object().shape({
	camp_name: yup
		.string()
		.trim()
		.required('Camp name is required')
		.min(3, 'Camp name must be at least 3 characters')
		.max(32, 'Less than 32 characters'),
	city: yup
		.string()
		.trim()
		.min(2, 'City name must be at least 2 characters')
		.max(32, 'Less than 32 characters')
		.required('City is required'),
	camp_website: yup
		.string()
		.trim()
		.matches(urlRegex, 'Invalid website address'),
	camp_description: yup.string().trim().max(256, 'Less than 256 characters'),
});

export const createInventoryItemSchema = yup.object().shape({
	title: yup.string().trim().required('Title is required'),
	description: yup.string().trim().max(256, 'Less than 256 characters'),
	price: yup.number().required('Price is required').min(1, 'Price must be at least 1$'),
	quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
	category: yup.string().trim().required('Category is required'),
});

export const editCamperSchema = yup.object().shape({
	first_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'First name must be less than 32 characters'),
	last_name: yup
		.string()
		.trim()
		.required('Field is required')
		.max(32, 'Last name must be less than 32 characters'),
	playa_name: yup.string().trim().max(24, 'Less than 24 characters'),
	city: yup.string().trim().max(32, 'Less than 32 characters'),
	about_me: yup
		.string()
		.trim()
		.max(256, 'Less than 256 characters'),
	role: yup
		.mixed<CamperRole>()
		.oneOf(Object.values(CamperRole) as CamperRole[], 'Invalid role selected'),
	tags: yup
		.array()
		.of(
			yup.object().shape({
				tagName: yup
					.string()
					.trim()
					.test(
						'tagName-required-if-tagDetails',
						'Tag name is required',
						function (value, context) {
							const { tagDetails } = context.parent;
							if (tagDetails && tagDetails.length > 0) {
								return Boolean(value && value.trim());
							}
							return true;
						}
					),
				tagDetails: yup.array().of(yup.string().trim()).notRequired(),
			})
		)
		.notRequired(),
	history: yup.array().of(
		yup.object().shape({
			year: yup.number().integer().positive(),
			value: yup.string().max(256, 'Less than 256 characters').notRequired(),
		})
	),
	birthdayDate: yup.date().notRequired(),
	socials: yup
		.array()
		.of(
			yup.object().shape({
				socialName: yup
					.mixed<SocialNetworks>()
					.oneOf(Object.keys(SocialNetworksData) as SocialNetworks[], 'Invalid social network')
					.required('Social network is required'),
				userName: yup
					.string()
					.trim()
					.notRequired()
					.test('custom-social-url', 'Enter a valid URL', function (value) {
						const { socialName } = this.parent;
						if (!value) return true; // Якщо поле порожнє — не перевіряємо

						if (socialName === SocialNetworks.DEFAULT) {
							return /^(https?:\/\/)?([\w.-]+)+\.\w{2,}(:\d+)?(\/.*)?$/.test(value);
						}
						return !/^https?:\/\//.test(value); // Якщо це не DEFAULT, то забороняємо URL
					}),
			})
		)
		.notRequired(),
});

export const shiftSchema = yup.object().shape({
	title: yup
		.string()
		.trim()
		.required('Title is required')
		.max(32, 'Title must be less than 64 characters'),
	description: yup
		.string()
		.trim()
		.max(255, 'Description must be less than 255 characters'),
	members: yup
		.array()
		.of(
			yup
				.string()
				.trim()
				.required('Member name is required')
		)
		.min(1, 'At least one member is required'),
	start_date: yup
		.date()
		.required('Date is required'),
	time: yup
		.array()
		.of(
			yup.object().shape({
				start_time: yup
					.date()
					.nullable()
					.required('Start time is required'),
				end_time: yup
					.date()
					.nullable()
					.when('start_time', (start_time, schema) =>
						start_time[0]
							? schema.min(start_time, 'End time cannot be before start time')
							: schema
					),
			})
		)
		.min(1, 'At least one time entry is required'),
});

export const createCamperSchema = yup.object().shape({
	role: yup.string().oneOf(Object.values(CamperRole), 'Invalid role'),
	first_name: yup.string().trim().required('Field is required').max(32, 'First name must be less than 32 characters'),
	last_name: yup.string().trim().required('Field is required').max(32, 'Last name must be less than 32 characters'),
	email: yup.string().trim().email('Invalid email address').required('Email is required'),
});

export const createCalendarEventSchema = yup.object().shape({
	event: yup
		.string()
		.trim()
		.required('Title is required')
		.max(24, 'Title must be less than 24 characters'),
	startDate: yup.date().required('Date is required'),
	endDate: yup.date().notRequired(),
});

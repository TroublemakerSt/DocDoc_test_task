import { useFormInput } from './useFormInput';

const pointig = 'below';

export const useUserShippingInfoStep = userShippingInfo => {
	const name = useFormInput({
		initialValue: userShippingInfo.name || '', validatorType: 'isLength', options: { min: 1, max: 255 }, message: { content: 'Имя не должна быть пустым и превышать 255 символов', pointig }
	});
	const surename = useFormInput({
		initialValue: userShippingInfo.surename || '', validatorType: 'isLength', options: { min: 1, max: 255 }, message: { content: 'Фамилия не должна быть пустой и превышать 255 символов', pointig }
	});
	const email = useFormInput({ initialValue: userShippingInfo.email || '', validatorType: 'isEmail', message: { content: 'Некорректный формат Email. Пример: test@test.com', pointig } });
	const phone = useFormInput({
		initialValue: userShippingInfo.phone || '',
		validatorType: 'isMobilePhone',
		options: { strictMode: true },
		message: { content: 'Телефон должен начинаться с кода страны. Например: +7. И содержать корректное число цифр присущих вашей стране.', pointig }
	});

	return {
		name,
		surename,
		email,
		phone
	};
};

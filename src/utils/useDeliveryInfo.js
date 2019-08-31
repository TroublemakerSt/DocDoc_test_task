import { useFormInput } from './useFormInput';

const pointig = 'below';

export const useDeliveryInfo = deliveryInfo => {
	const country = useFormInput({
		initialValue: deliveryInfo.country || ''
	});
	const city = useFormInput({
		initialValue: deliveryInfo.city || '', validatorType: 'isLength', options: { min: 1, max: 255 }, message: { content: 'Город не должн быть пустой строкой и превышать 255 символов', pointig }
	});
	const postcode = useFormInput({ initialValue: deliveryInfo.postcode || '', validatorType: 'isPostalCode', message: { content: 'Некорректный формат почтового индекса. Пример: 398000', pointig } });
	const address = useFormInput({
		initialValue: deliveryInfo.address || '',
		validatorType: 'isLength',
		options: { min: 1, max: 255 },
		message: { content: 'Адрес не может быть пустой строкой и быть длиннее 255 символов', pointig }
	});
	const date = useFormInput({
		initialValue: deliveryInfo.date || '',
		dateField: true
	});
	const comment = useFormInput({
		initialValue: deliveryInfo.date || ''
	});

	return {
		country,
		city,
		postcode,
		address,
		date,
		comment
	};
};

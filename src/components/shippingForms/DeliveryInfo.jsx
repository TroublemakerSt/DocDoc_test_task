import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { string, func } from 'prop-types';
import {
	Button, Form, Header, Image, Modal
} from 'semantic-ui-react';
import {
	DateInput
} from 'semantic-ui-calendar-react';
import 'moment/locale/ru';
import { saveDeliveryInfoStep, changeModalState } from '../../actions/shipping';
import { useDeliveryInfo } from '../../utils/useDeliveryInfo';

const countryOptions = [
	{
		key: 'ru', value: 'ru', flag: 'ru', text: 'Россия'
	},
	{
		key: 'us', value: 'us', flag: 'us', text: 'США'
	},
	{
		key: 'uk', value: 'uk', flag: 'uk', text: 'Великобритания'
	},
	{
		key: 'by', value: 'by', flag: 'by', text: 'Беларусь'
	}
];

function validateFields({
	shippingType = 'delivery', country, city, postcode, address, date
}) {
	if (shippingType === 'delivery') {
		return (!country.value || !!country.error)
		|| (!city.value || !!city.error)
		|| (!postcode.value || !!postcode.error)
		|| (!address.value || !!address.error)
		|| (!date.value || !!date.error);
	}
	return false;
}

function prepareFormByShippingType({
	// eslint-disable-next-line react/prop-types
	shippingType = 'delivery', country, city, postcode, address, date
}) {
	if (shippingType === 'delivery') {
		return (
			<>
				<Form.Group widths="equal">
					<Form.Dropdown
						{...country}
						required
						label="Страна"
						placeholder="Страна"
						fluid
						search
						selection
						options={countryOptions}
					/>
					<Form.Input
						{...city}
						required
						label="Город"
						fluid
						placeholder="Москва"
					/>
					<Form.Input
						{...postcode}
						required
						label="Индекс"
						fluid
						placeholder="398000"
					/>
				</Form.Group>
				<Form.Input {...address} required label="Адрес" fluid placeholder="ул.Маршала Савицкого, 8" />
				{/* <Label required>Дата</Label> */}
				<Form.Field required label="Дата" />
				<DateInput
					name="date"
					placeholder="Дата доставки"
					iconPosition="left"
					localization="ru"
					animation="none"
					hideMobileKeyboard
					clearable
					closable
					{...date}
				/>
			</>
		);
	}

	return null;
}

export const DeliveryInfo = ({ shippingType, handleBack }) => {
	const shippingInfo = useSelector(state => state.shippingData);
	const dispatch = useDispatch();
	const deliveryInfo = useDeliveryInfo(shippingInfo);

	const handleCloseModal = () => dispatch(changeModalState(!shippingInfo.showModal));

	useEffect(() => {
		if (shippingInfo.success) {
			const id = setTimeout(() => document.location.reload(true), 4000);
			return () => clearTimeout(id);
		}
	}, [shippingInfo.success]);

	const hadleSaveUserShippingInfo = () => {
		const preparedData = shippingType === 'delivery' ? {
			country: deliveryInfo.country.value,
			city: deliveryInfo.city.value,
			postcode: deliveryInfo.postcode.value,
			address: deliveryInfo.address.value,
			date: deliveryInfo.date.value,
			comment: deliveryInfo.comment.value,
			...shippingInfo
		} : { ...shippingInfo, comment: deliveryInfo.comment.value };
		dispatch(saveDeliveryInfoStep(preparedData));
	};
	return (
		<>
			{prepareFormByShippingType({ shippingType, ...deliveryInfo })}
			<Form.TextArea {...deliveryInfo.comment} placeholder="Ваш комментарий здесь..." label="Комментарий к заказу" style={{ minHeight: 100 }} />
			<Button
				color="teal"
				disabled={
					shippingInfo.sendingDeliveryData || false
				}
				onClick={handleBack}
			>
				Назад
			</Button>
			<Button
				disabled={
					validateFields({ shippingType, ...deliveryInfo })
					|| shippingInfo.sendingDeliveryData
				}
				color="teal"
				loading={shippingInfo.sendingDeliveryData || false}
				onClick={hadleSaveUserShippingInfo}
			>
				Оформить заказ
			</Button>
			<Modal open={shippingInfo.showModal || false} onClose={!shippingInfo.success ? handleCloseModal : () => {}}>
				<Modal.Header>Оформление доставки</Modal.Header>
				<Modal.Content image>
					<Image wrapped size="medium" src="https://react.semantic-ui.com/images/avatar/large/rachel.png" />
					<Modal.Description>
						{shippingInfo.success ? (
							<>
								<Header>
									Оформление доставки успешно зарегистрировано
									и передано в распределительный цетр нашему оператору.
								</Header>
								<p>Данное уведомление автоматически закроется через 4 секунды</p>
							</>
						) : (
							<>
								<Header>
									Во время оформления доставки возникла непредвиденная проблема.
								</Header>
								<p>Пожалуйста, закройте модальное окно и повторите отправку.</p>
							</>
						)}
					</Modal.Description>
				</Modal.Content>
			</Modal>
		</>
	);
};

DeliveryInfo.propTypes = {
	shippingType: string.isRequired,
	handleBack: func.isRequired
};

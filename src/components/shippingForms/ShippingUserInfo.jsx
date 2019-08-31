import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Button, Form, Segment
} from 'semantic-ui-react';
import { saveUserInfoShippingStep } from '../../actions/shipping';
import { useUserShippingInfoStep } from '../../utils/useUserShippingInfoStep';

export const ShippingUserInfo = () => {
	const userShippingInfo = useSelector(state => state.shippingData);
	const dispatch = useDispatch();
	const {
		name,
		surename,
		email,
		phone
	} = useUserShippingInfoStep(userShippingInfo);
	const hadleSaveUserShippingInfo = () => {
		dispatch(saveUserInfoShippingStep({
			name: name.value,
			surename: surename.value,
			email: email.value,
			phone: phone.value,
			step: 'addressInfo'
		}));
	};
	return (
		<Segment stacked>
			<Form.Group widths="equal">
				<Form.Input
					{...name}
					required
					label="Имя"
					fluid
					icon="user"
					iconPosition="left"
					placeholder="Иван"
				/>
				<Form.Input
					{...surename}
					required
					label="Фамилия"
					fluid
					icon="user"
					iconPosition="left"
					placeholder="Иванов"
				/>
			</Form.Group>
			<Form.Input {...phone} required label="Телефон" fluid icon="phone" iconPosition="left" placeholder="+79101234567" />
			<Form.Input {...email} required label="Email" fluid icon="mail" iconPosition="left" placeholder="test@test.com" />
			<Button
				disabled={
					(!!email.error || !email.value)
					|| (!!phone.error || !phone.value)
					|| (!!name.error || !name.value)
					|| (!!surename.error || !surename.value)
				}
				color="teal"
				onClick={hadleSaveUserShippingInfo}
			>
				Далее
			</Button>
		</Segment>
	);
};

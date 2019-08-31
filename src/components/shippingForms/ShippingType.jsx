import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	Form, Segment
} from 'semantic-ui-react';
import { saveUserInfoShippingStep } from '../../actions/shipping';
import { DeliveryInfo } from './index';

export const ShippingType = () => {
	const dispatch = useDispatch();
	const [shippingType, setShippingType] = useState('delivery');
	const handleChengeShippingType = (_, { value }) => setShippingType(value);
	const handleBack = () => dispatch(saveUserInfoShippingStep({
		step: 'user'
	}));
	return (
		<Segment stacked>
			<Form.Group inline>
				<Form.Radio
					radio
					label="Доставка"
					name="delivery"
					value="delivery"
					checked={shippingType === 'delivery'}
					onChange={handleChengeShippingType}
				/>
				<Form.Radio
					radio
					label="Самовывоз"
					name="pickup"
					value="pickup"
					checked={shippingType === 'pickup'}
					onChange={handleChengeShippingType}
				/>
			</Form.Group>
			<DeliveryInfo shippingType={shippingType} handleBack={handleBack} />
		</Segment>
	);
};

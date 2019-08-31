import React from 'react';
import { useSelector } from 'react-redux';
import {
	Form, Grid
} from 'semantic-ui-react';
import { ShippingUserInfo, ShippingSteps, ShippingType } from './shippingForms/index';

const gridColumnStyle = { maxWidth: 1000 };

export const ShippingContainer = () => {
	const shippingInfo = useSelector(state => state.shippingData);
	return (
		<div className="ui container">
			<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
				<Grid.Column style={gridColumnStyle}>
					<Form size="large">
						<ShippingSteps step={shippingInfo.step} />
						{shippingInfo.step === 'user' && <ShippingUserInfo />}
						{shippingInfo.step === 'addressInfo' && <ShippingType />}
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
};

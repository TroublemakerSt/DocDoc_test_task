import React from 'react';
import { string } from 'prop-types';
import { Icon, Step } from 'semantic-ui-react';

export const ShippingSteps = ({ step }) => (
	<Step.Group>
		<Step active={step === 'user'} disabled={step !== 'user'}>
			<Icon name="user" />
			<Step.Content>
				<Step.Title>Основные данные</Step.Title>
				<Step.Description>Основные данные о получателе</Step.Description>
			</Step.Content>
		</Step>

		<Step active={step === 'addressInfo'} disabled={step !== 'addressInfo'}>
			<Icon name="shipping fast" />
			<Step.Content>
				<Step.Title>Адрес доставки</Step.Title>
				<Step.Description>Выбрать вариант доставки</Step.Description>
			</Step.Content>
		</Step>

		{/* <Step active={step === 'confirm'} disabled={step !== 'confirm'}>
			<Icon name="info" />
			<Step.Content>
				<Step.Title>Подтверждение заказа</Step.Title>
			</Step.Content>
		</Step> */}
	</Step.Group>
);

ShippingSteps.propTypes = {
	step: string.isRequired
};

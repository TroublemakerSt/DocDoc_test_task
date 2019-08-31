import {
	SAVE_SHIPPING_USER_INFO,
	SAVE_DELIVERY_INFO,
	SUCCESS_SAVE_DELIVERY_INFO,
	FAILED_SAVE_DELIVERY_INFO,
	CHANGE_MODAL_STATE
} from '../types';

export default function shippingInfo(state = { step: 'user' }, action) {
	switch (action.type) {
		case SAVE_SHIPPING_USER_INFO:
			return {
				...state,
				...action.userData
			};
		case SAVE_DELIVERY_INFO:
			return {
				...state,
				...action.deliveryData
			};
		case SUCCESS_SAVE_DELIVERY_INFO:
		case FAILED_SAVE_DELIVERY_INFO:
			return {
				...state,
				...action.successData
			};
		case CHANGE_MODAL_STATE:
			return {
				...state,
				showModal: action.showModal
			};
		default:
			return state;
	}
}

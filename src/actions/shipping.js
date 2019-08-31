import axios from 'axios';
import {
	SAVE_SHIPPING_USER_INFO,
	SAVE_DELIVERY_INFO,
	SUCCESS_SAVE_DELIVERY_INFO,
	FAILED_SAVE_DELIVERY_INFO,
	CHANGE_MODAL_STATE
} from '../types';

const API_PATH = 'https://cp.ladux.ru/test.php';

export const saveUserInfoShippingStep = userData => ({
	type: SAVE_SHIPPING_USER_INFO,
	userData
});

export const saveDeliveryInfoStep = deliveryData => dispatch => {
	dispatch({
		type: SAVE_DELIVERY_INFO,
		deliveryData: { ...deliveryData, sendingDeliveryData: true }
	});
	axios({
		method: 'post',
		url: `${API_PATH}`,
		headers: { 'Content-Type': 'application/json;' },
		data: deliveryData
	})
		.then(result => {
			dispatch({
				type: SUCCESS_SAVE_DELIVERY_INFO,
				successData: { sendingDeliveryData: false, showModal: true, success: result.data.success }
			});
		})
		.catch(() => dispatch({
			type: FAILED_SAVE_DELIVERY_INFO,
			successData: { sendingDeliveryData: false, showModal: true, success: false }
		}));
};

export const changeModalState = showModal => ({
	type: CHANGE_MODAL_STATE,
	showModal
});

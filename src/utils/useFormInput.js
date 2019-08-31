import { useState } from 'react';
import validator from 'validator';

export const useFormInput = ({
	initialValue = '', validatorType = null, options = [], message = {}, dateField = false
}) => {
	const [value, setValue] = useState(initialValue);
	const [error, setError] = useState(false);

	const validate = data => {
		if (validatorType === 'isMobilePhone' || validatorType === 'isPostalCode') {
			if (!validator[validatorType](String(data), 'any', options))
				setError(message);
			else
				setError(false);
		}
		else if (!validator[validatorType](String(data), options))
			setError(message);
		else
			setError(false);
	};

	const handleChange = (event, { value: optionsValue }) => {
		if (validatorType)
			validate(event.target.value);
		if (optionsValue)
			setValue(optionsValue);
		else
			setValue(event.target.value);
	};
	return dateField ? {
		value,
		onChange: handleChange,
		error,
		onClear: () => setValue('')
	} : {
		value,
		onChange: handleChange,
		error
	};
};

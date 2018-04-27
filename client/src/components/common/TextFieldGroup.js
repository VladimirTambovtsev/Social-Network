import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextFieldGroup = ({ 
	name,
	placeholder,
	value,
	label,
	id,
	error,
	info,
	type,
	onChange,
	disabled
 }) => {
	return (
		<div>
			<input 
			className={classnames('form-control', { 'is-invalid': error })} 
			type={type} placeholder={placeholder} name={name} value={value} disabled={disabled} id={id}
			onChange={onChange} />
			{error && (<div className="invalid-feedback">{error}</div>)}
		</div>
	);
};

TextFieldGroup.PropTypes = {
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	id: PropTypes.string.id,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
	type: 'text'
};

export default TextFieldGroup;

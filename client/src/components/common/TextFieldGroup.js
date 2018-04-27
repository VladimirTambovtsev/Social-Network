import React from 'react';
import classnames from 'classnames';
import propTypes from 'prop-types';

const TextFieldGroud = ({ 
	name,
	placeholder,
	value,
	label,
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
			onChange={this.onChange} />
			{error && (<div className="invalid-feedback">{error}</div>)}
		</div>
	);
};

export default TextFieldGroud;
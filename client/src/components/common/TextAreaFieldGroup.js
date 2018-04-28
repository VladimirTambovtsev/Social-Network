import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


const TextAreaFieldGroup = ({ 
	name,
	placeholder,
	value,
	id,
	error,
	onChange,
 }) => {
	return (
		<div>
			<textarea 
			className={classnames('form-control', { 'is-invalid': error })} 
			placeholder={placeholder} name={name} value={value} id={id}
			onChange={onChange} />
			{error && (<div className="invalid-feedback">{error}</div>)}
		</div>
	);
};

TextAreaFieldGroup.PropTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	id: PropTypes.string.id,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};

export default TextAreaFieldGroup;

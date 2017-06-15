import React from 'react';
import PropTypes from 'prop-types';

const FormInput = (props) => {
	const { label, name, type, value, onChange } = props;

	let field;
	if (type === 'text') {
		field = (
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				className="font-body border border-gray-lighter rounded full-width"
				style={{ fontSize: '.8rem', padding: '.25rem' }}
			/>
		);
	}
	if (type === 'textarea') {
		field = (
			<textarea
				name={name}
				value={value}
				onChange={onChange}
				className="font-body border border-gray-lighter rounded full-width"
				style={{ fontSize: '.8rem', padding: '.25rem', minHeight: '5rem' }}
			/>
		);
	}

	return (
		<div className="editform flex flex-center">
			<div className="p1">
				<label
					htmlFor={label}
					className="bold"
				>
					{label}
				</label>
			</div>
			<div className="flex-auto p1">
				{field}
			</div>
		</div>
	);
};
FormInput.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
};
FormInput.defaultProps = {
	label: '',
	name: '',
	type: '',
	value: '',
};

export default FormInput;

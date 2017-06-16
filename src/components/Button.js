import React from 'react';
import PropTypes from 'prop-types';

require('../styles/Button.scss');

const Button = (props) => {
	let color;
	if (props.type) {
		switch (props.type) {
		case 'action':
			color = 'green';
			break;
		case 'danger':
			color = 'red';
			break;
		default:
			color = props.type;
		}
	} else {
		color = 'gray';
	}

	return (
		<button
			className={`button ${color}`}
			onClick={props.action}
		>
			<div className="content">
				{props.label}
			</div>
		</button>
	);
};
Button.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	action: PropTypes.func.isRequired,
};
Button.defaultProps = {
	label: 'Button',
	type: '',
};

export default Button;

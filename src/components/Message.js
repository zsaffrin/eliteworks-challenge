import React from 'react';
import PropTypes from 'prop-types';

const Message = (props) => {
	const { type, title, content } = props;

	let color;
	switch (type) {
	case 'success':
		color = 'green';
		break;
	case 'error':
		color = 'red';
		break;
	case 'info':
	default:
		color = 'blue';
	}

	return (
		<div
			className={`m1 p1 bg-${color}-lighter border border-${color}
				${color}-darker`}
		>
			<div className="bold size-lg caps">{title}</div>
			{content}
		</div>
	);
};
Message.propTypes = {
	type: PropTypes.string,
	title: PropTypes.string,
	content: PropTypes.string,
};
Message.defaultProps = {
	type: 'info',
	title: 'Message',
	content: '',
};

export default Message;

import React from 'react';
import PropTypes from 'prop-types';

const ViewProduct = (props) => {
	const { name, description, data } = props.productData;
	const { fortifications, imageUrl, size } = data;

	return (
		<div id="viewProduct" className="p1">
			<div>
				<div className="p1">
					<h2 className="m0">{name}</h2>
				</div>

				<div className="flex mb2">
					<div className="p1 flex-grow" style={{ width: '12rem' }}>
						<img src={imageUrl} alt={name} className="full-width" />
					</div>
					<div className="flex-auto px2">{description}</div>
				</div>

				<div className="flex size-sm p1 border-bottom border-gray-lighter">
					<div className="bold caps" style={{ width: '8rem' }}>
						Size
					</div>
					<div className="flex-auto">{size}</div>
				</div>

				<div className="flex size-sm p1">
					<div className="bold caps" style={{ width: '8rem' }}>
						Fortifications
					</div>
					<div className="flex-auto">{fortifications}</div>
				</div>

				<div>
					<button onClick={props.toggleEditMode}>Edit Product</button>
				</div>
			</div>
		</div>
	);
};
ViewProduct.propTypes = {
	productData: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
		data: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape(),
		]),
	}),
	toggleEditMode: PropTypes.func.isRequired,
};
ViewProduct.defaultProps = {
	productData: {
		name: '',
		description: '',
	},
};

export default ViewProduct;

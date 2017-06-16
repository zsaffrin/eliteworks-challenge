import React from 'react';
import PropTypes from 'prop-types';

const ViewProduct = (props) => {
	const { name, description, data } = props.productData;
	const { color, features, imageUrl, price, size } = data;

	return (
		<div id="viewProduct" className="p1">
			<div>
				<div className="flex p1">
					<h2 className="m0">{name}</h2>
					<div className="flex-auto right">
						<h3 className="m0">{price}</h3>
					</div>
				</div>

				<div className="flex mb2">
					<div className="p1 flex-grow" style={{ width: '12rem' }}>
						<img src={imageUrl} alt={name} className="full-width" />
					</div>
					<div className="flex-auto px2">{description}</div>
				</div>

				<div className="flex flex-wrap size-sm p1 border-bottom border-gray-lighter">
					<div className="bold caps" style={{ width: '6rem' }}>
						Color
					</div>
					<div className="flex-auto">{color}</div>
				</div>

				<div className="flex flex-wrap size-sm p1 border-bottom border-gray-lighter">
					<div className="bold caps" style={{ width: '6rem' }}>
						Size
					</div>
					<div className="flex-auto">{size}</div>
				</div>

				<div className="flex flex-wrap size-sm p1">
					<div className="bold caps" style={{ width: '6rem' }}>
						Features
					</div>
					<div className="flex-auto">{features}</div>
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
		data: PropTypes.shape({
			color: PropTypes.string,
			features: PropTypes.string,
			imageUrl: PropTypes.string,
			price: PropTypes.string,
			size: PropTypes.string,
		}),
	}),
	toggleEditMode: PropTypes.func.isRequired,
};
ViewProduct.defaultProps = {
	productData: {
		name: '',
		description: '',
		data: {},
	},
};

export default ViewProduct;

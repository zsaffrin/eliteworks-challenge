import React from 'react';
import PropTypes from 'prop-types';

const Product = (props) => {
	const { product_id, description, name, data, api_key, created_at,
		updated_at } = props.data;

	return (
		<div className="m1 border p1">
			<div className="bold size-lg caps">Product</div>
			<div className="p1">
				{name}<br />
				{description}<br />
				{JSON.stringify(data)}<br />
			</div>
			<div className="p1 size-sm">
				Product ID: {product_id}<br />
				Created {created_at}<br />
				Fetched using API key {api_key}<br />
				Last updated {updated_at}<br />
			</div>
		</div>
	);
};
Product.propTypes = {
	data: PropTypes.shape(),
};
Product.defaultProps = {
	data: Object.assign({}),
};

export default Product;

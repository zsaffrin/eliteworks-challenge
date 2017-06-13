import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editMode: false,
			product: this.props.data,
		};

		this.enterEditMode = this.enterEditMode.bind(this);
		this.handleProductNameChange = this.handleProductNameChange.bind(this);
		this.reloadProductInfo = this.reloadProductInfo.bind(this);
	}

	enterEditMode() {
		this.setState({ editMode: true });
	}

	reloadProductInfo() {
		this.props.refreshProduct().then(
			response => this.setState({
				editMode: false,
				product: response.data.product,
			}),
		);
	}

	handleProductNameChange(e) {
		this.setState({
			product: {
				...this.state.product,
				name: e.target.value,
			},
		});
	}

	render() {
		const { product_id, description, name, data, api_key, created_at,
			updated_at } = this.state.product;

		const productWindow = this.state.editMode ? (
			<div className="p1">
				<input
					type="text"
					value={this.state.product.name}
					onChange={this.handleProductNameChange}
				/>
				<div>{description}</div>
				<div>{JSON.stringify(data)}</div>
				<div>
					<button onClick={this.reloadProductInfo}>Cancel</button>
				</div>
			</div>
		) : (
			<div className="p1">
				{name}<br />
				{description}<br />
				{JSON.stringify(data)}<br />
			</div>
		);

		let editButton;
		if (!this.state.editMode) {
			editButton = (
				<div>
					<button onClick={this.enterEditMode}>Edit</button>
				</div>
			);
		}

		return (
			<div className="m1 border p1">
				<div className="bold size-lg caps">Product</div>
				{productWindow}
				<div className="p1 size-sm">
					Product ID: {product_id}<br />
					Created {created_at}<br />
					Fetched using API key {api_key}<br />
					Last updated {updated_at}<br />
				</div>
				{editButton}
			</div>
		);
	}
}
Product.propTypes = {
	data: PropTypes.shape().isRequired,
	refreshProduct: PropTypes.func.isRequired,
};

export default Product;

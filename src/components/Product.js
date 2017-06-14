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
		this.saveProductChanges = this.reloadProductInfo.bind(this);
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

	postDataToServer() {
		return new Promise((resolve, reject) => {
			const url = `http://challenge.eliteworks.com/product/set?api_key=${this.state.apiKey}`;
			const { name, description } = this.state.product;
			const data = JSON.stringify({ name, description });

			window.fetch(url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				method: 'POST',
				body: data,
			}).then(
				response => response.json(),
			).then(
				json => resolve(json),
			).catch(
				err => reject(new Error(err)),
			);
		});
	}

	saveProductChanges(e) {
		e.preventDefault();

		this.postDataToServer().then(
			(result) => {
				console.info(result);
			},
		);
	}

	render() {
		const { product_id, description, name, data, api_key, created_at,
			updated_at } = this.state.product;

		const productWindow = this.state.editMode ? (
			<div className="p1">
				<form onSubmit={this.saveProductChanges}>
					<input
						type="text"
						value={this.state.product.name}
						onChange={this.handleProductNameChange}
					/>
					<div>{description}</div>
					<div>{JSON.stringify(data)}</div>
					<div>
						<button type="submit">Save</button>
						<button onClick={this.reloadProductInfo}>Cancel</button>
					</div>
				</form>
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

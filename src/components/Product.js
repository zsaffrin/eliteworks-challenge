import React, { Component } from 'react';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';

import credentials from '../config/credentials';
import Message from './Message';

class Product extends Component {
	constructor() {
		super();
		this.state = {
			apiKey: credentials.eliteworksApiKey,
			editMode: false,
			fetchError: false,
			isFetching: false,
			message: '',
			productLoaded: false,
			product: {},
		};

		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.cancelEdits = this.cancelEdits.bind(this);
		this.handleProductNameChange = this.handleProductNameChange.bind(this);
		this.handleProductDescriptionChange = this.handleProductDescriptionChange.bind(this);
		this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
	}

	componentDidMount() {
		this.loadProductData();
	}

	getApiUrl(method) {
		let url = 'http://challenge.eliteworks.com/product';
		if (method === 'post') {
			url += '/set';
		}
		url += `?api_key=${this.state.apiKey}`;
		return url;
	}

	fetchProductDataFromServer() {
		return new Promise((resolve, reject) => {
			window.fetch(this.getApiUrl('get'), { method: 'GET' })
				.then(response => response.json())
				.then(json => resolve(json))
				.catch(err => reject(new Error(err)));
		});
	}

	loadProductData() {
		this.fetchProductDataFromServer().then(
			data => this.setState({ product: data.data.product }),
		);
	}

	postProductDataToServer(data) {
		return new Promise((resolve, reject) => {
			window.fetch(this.getApiUrl('post'), {
				method: 'POST',
				mode: 'no-cors',
				body: data,
			}).then(response => response)
				.then(json => resolve(json))
				.catch(err => reject(new Error(err)));
		});
	}

	prepareFormData() {
		const { name, description } = this.state.product;
		const formData = new window.FormData();
		formData.append('name', name);
		formData.append('description', description);
		return formData;
	}

	updateProductData() {
		return new Promise((resolve, reject) => {
			const formData = this.prepareFormData();
			this.postProductDataToServer(formData)
				.then(result => resolve(result))
				.catch(err => reject(new Error(err)));
		});
	}

	handleProductNameChange(e) {
		this.setState({
			product: {
				...this.state.product,
				name: e.target.value,
			},
		});
	}

	handleProductDescriptionChange(e) {
		this.setState({
			product: {
				...this.state.product,
				description: e.target.value,
			},
		});
	}

	handleEditFormSubmit(e) {
		e.preventDefault();
		this.updateProductData()
			.then((result) => {
				console.info(result);
				this.toggleEditMode();
				this.loadProductData();
			})
			.catch(err => console.error(err));
	}

	toggleEditMode() {
		this.setState({ editMode: !this.state.editMode });
	}

	cancelEdits() {
		this.loadProductData();
		this.toggleEditMode();
	}

	render() {
		let message;
		if (this.state.fetchError) {
			message = (
				<Message type="error" title="Error" content={this.state.message} />
			);
		}
		if (!this.state.fetchError && (this.state.message.length > 0)) {
			message = (
				<Message type="info" title="Info" content={this.state.message} />
			);
		}

		const { name, description, data } = this.state.product;

		const productInfo = this.state.editMode ? (
			<div>
				<form onSubmit={this.handleEditFormSubmit}>
					<div>
						<input
							type="text"
							value={this.state.product.name}
							onChange={this.handleProductNameChange}
						/>
					</div>
					<div>
						<input
							type="text"
							value={this.state.product.description}
							onChange={this.handleProductDescriptionChange}
						/>
					</div>
					<div>{JSON.stringify(data)}</div>
					<div>
						<button type="submit">Save Changes</button>
						<button onClick={this.cancelEdits}>Cancel</button>
					</div>
				</form>
			</div>
		) : (
			<div>
				<div>{name}</div>
				<div>{description}</div>
				<div>{JSON.stringify(data)}</div>
				<div>
					<button onClick={this.toggleEditMode}>Edit Product</button>
				</div>
			</div>
		);

		return (
			<div className="m1 border p1">
				{message}
				<div className="bold size-lg caps">Product</div>
				{productInfo}
			</div>
		);
	}
}

export default Product;

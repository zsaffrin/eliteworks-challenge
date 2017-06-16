import React, { Component } from 'react';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';

import credentials from '../config/credentials';
import Message from './Message';
import ViewProduct from './ViewProduct';
import EditProduct from './EditProduct';

class Product extends Component {
	static parseDataFieldInProduct(product) {
		const fixedProduct = Object.assign({}, product);
		fixedProduct.data = JSON.parse(fixedProduct.data);
		return fixedProduct;
	}

	static prepareFormData(inputData) {
		const { name, description, data } = inputData;
		const formData = new window.FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('data', JSON.stringify(data));
		return formData;
	}

	constructor() {
		super();
		this.state = {
			apiKey: credentials.eliteworksApiKey,
			editMode: false,
			fetchError: false,
			isFetching: false,
			message: '',
			productLoaded: false,
			product: { data: {} },
		};

		this.toggleEditMode = this.toggleEditMode.bind(this);
		this.cancelEdits = this.cancelEdits.bind(this);
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
		this.fetchProductDataFromServer()
			.then(
				data => Product.parseDataFieldInProduct(data.data.product),
			).then(
				product => this.setState({ product }),
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

	updateProductData(data) {
		return new Promise((resolve, reject) => {
			const formData = Product.prepareFormData(data);
			this.postProductDataToServer(formData)
				.then(result => resolve(result))
				.catch(err => reject(new Error(err)));
		});
	}

	toggleEditMode() {
		this.setState({ editMode: !this.state.editMode });
	}

	cancelEdits() {
		this.loadProductData();
		this.toggleEditMode();
	}

	handleEditFormSubmit(data) {
		this.updateProductData(data)
			.then(() => {
				this.toggleEditMode();
				this.loadProductData();
			})
			.catch(err => console.error(err));
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

		const productInfo = this.state.editMode ? (
			<EditProduct
				productData={this.state.product}
				handleCancel={this.cancelEdits}
				handleSubmit={this.handleEditFormSubmit}
			/>
		) : (
			<ViewProduct
				productData={this.state.product}
				toggleEditMode={this.toggleEditMode}
			/>
		);

		return (
			<div className="m1 border border-gray-light rounder p1">
				{message}
				{productInfo}
			</div>
		);
	}
}

export default Product;

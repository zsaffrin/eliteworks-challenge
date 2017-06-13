import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Promise from 'promise-polyfill';
import 'whatwg-fetch';

import credentials from '../config/credentials';
import Message from './Message';
import Product from './Product';

require('overeasy/dist/overeasy.min.css');

class App extends Component {
	constructor() {
		super();
		this.state = {
			apiKey: credentials.eliteworksApiKey,
			isFetching: false,
			fetchError: false,
			message: '',
			productLoaded: false,
			product: {},
		};

		this.fetchProductFromServer = this.fetchProductFromServer.bind(this);
	}

	componentDidMount() {
		this.updateProductFromServer();
	}

	handleFetchSuccess(response) {
		return this.setState({
			message: response.message,
			productLoaded: true,
			product: response.data.product,
		});
	}

	handleFetchError(response) {
		return this.setState({
			fetchError: true,
			message: response.message,
		});
	}

	processFetchResponse(response) {
		switch (response.result) {
		case 'success':
			this.handleFetchSuccess(response);
			break;
		case 'failure':
			this.handleFetchError(response);
			break;
		default:
			console.error('FetchResponse landed on default case');
		}
	}

	fetchProductFromServer() {
		return new Promise((resolve, reject) => {
			const url = `http://challenge.eliteworks.com/product?api_key=${this.state.apiKey}`;

			window.fetch(url, { method: 'GET' }).then(
				response => response.json(),
			).then(
				json => resolve(json),
			).catch(
				err => reject(new Error(err)),
			);
		});
	}

	updateProductFromServer() {
		this.setState({
			isFetching: true,
			fetchError: false,
			message: '',
			productLoaded: false,
			product: Object.assign({}),
		});

		this.fetchProductFromServer().then(
			json => this.processFetchResponse(json),
		).then(
			this.setState({ isFetching: false }),
		);
	}

	render() {
		let messageDisplay;
		if (this.state.fetchError) {
			messageDisplay = (
				<Message
					type="error"
					title="Error"
					content={this.state.message}
				/>
			);
		}
		if (!this.state.fetchError && (this.state.message.length > 0)) {
			messageDisplay = (
				<Message
					type="info"
					title="Info"
					content={this.state.message}
				/>
			);
		}

		let productDisplay;
		if (this.state.productLoaded) {
			productDisplay = (
				<Product
					data={this.state.product}
					refreshProduct={this.fetchProductFromServer}
				/>
			);
		}

		return (
			<Router>
				<div id="app">
					<h1>EliteWorks Challenge</h1>
					{messageDisplay}
					{productDisplay}
				</div>
			</Router>
		);
	}
}

export default App;

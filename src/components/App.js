import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';

import credentials from '../config/credentials';
import Message from './Message';
import Product from './Product';

require('overeasy/dist/overeasy.min.css');

class App extends Component {
	constructor() {
		super();
		this.state = {
			isFetching: false,
			fetchError: false,
			message: '',
			productLoaded: false,
			product: {},
		};
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

	updateProductFromServer() {
		const url = `http://challenge.eliteworks.com/product?api_key=${credentials.eliteworksApiKey}`;

		this.setState({
			isFetching: true,
			fetchError: false,
			message: '',
			productLoaded: false,
			product: Object.assign({}),
		});

		window.fetch(url, { method: 'GET' }).then(
			response => response.json(),
		).then(
			json => this.processFetchResponse(json),
		).then(
			() => this.setState({ isFetching: false }),
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
			productDisplay = <Product data={this.state.product} />;
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

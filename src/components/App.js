import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';

import credentials from '../config/credentials';

require('overeasy/dist/overeasy.min.css');

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

const Product = (props) => {
	const { data } = props;

	return (
		<div className="m1 border p1">
			<div className="bold size-lg caps">Product</div>
			{JSON.stringify(data)}
		</div>
	);
};
Product.propTypes = {
	data: PropTypes.shape(),
};
Product.defaultProps = {
	data: {},
};

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

	updateFetchingFlag(newValue) {
		return this.setState({ isFetching: newValue });
	}

	handleFetchSuccess(response) {
		return this.setState({
			message: response.message,
			productLoaded: true,
			product: response.data,
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
		let message;
		if (this.state.fetchError) {
			message = (
				<Message
					type="error"
					title="Error"
					content={this.state.message}
				/>
			);
		}
		if (!this.state.fetchError && (this.state.message.length > 0)) {
			message = (
				<Message
					type="info"
					title="Info"
					content={this.state.message}
				/>
			);
		}

		let product;
		if (this.state.productLoaded) {
			product = <Product data={this.state.product} />;
		}

		return (
			<Router>
				<div id="app">
					<h1>EliteWorks Challenge</h1>
					{message}
					{product}
				</div>
			</Router>
		);
	}
}

export default App;

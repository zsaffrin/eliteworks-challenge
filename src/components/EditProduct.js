import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormInput from './FormInput';

class EditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			imageUrl: '',
			description: '',
			size: '',
			fortifications: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentDidMount() {
		this.mapPropsToState();
	}

	mapPropsToState() {
		const { name, description, data } = this.props.productData;
		const { fortifications, imageUrl, size } = data;

		this.setState({ name, imageUrl, description, size, fortifications });
	}

	handleInputChange(e) {
		const { target } = e;
		this.setState({ [target.name]: target.value });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const { name, imageUrl, description, size, fortifications } = this.state;
		const payload = {
			name,
			description,
			data: {
				fortifications,
				imageUrl,
				size,
			},
		};

		this.props.handleSubmit(payload);
	}

	render() {
		const { name, imageUrl, description, size, fortifications } = this.state;

		return (
			<div id="editProduct" className="p1">
				<h2>Edit Product</h2>
				<form onSubmit={this.handleFormSubmit}>
					<FormInput
						label="Name"
						name="name"
						value={name}
						type="text"
						onChange={this.handleInputChange}
					/>
					<FormInput
						label="Description"
						name="description"
						value={description}
						type="textarea"
						onChange={this.handleInputChange}
					/>
					<FormInput
						label="Size"
						name="size"
						value={size}
						type="text"
						onChange={this.handleInputChange}
					/>
					<FormInput
						label="Image URL"
						name="imageUrl"
						value={imageUrl}
						type="text"
						onChange={this.handleInputChange}
					/>
					<FormInput
						label="Fortifications"
						name="fortifications"
						value={fortifications}
						type="text"
						onChange={this.handleInputChange}
					/>
					<div className="p1">
						<button type="submit">Save Changes</button>
						<button onClick={this.props.handleCancel}>Cancel</button>
					</div>
				</form>
			</div>
		);
	}
}
EditProduct.propTypes = {
	productData: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
		data: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.shape(),
		]),
	}),
	handleCancel: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};
EditProduct.defaultProps = {
	productData: {
		name: '',
		description: '',
	},
};

export default EditProduct;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import FormInput from './FormInput';

class EditProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			color: '',
			desription: '',
			features: '',
			imageUrl: '',
			price: '',
			size: '',
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	componentDidMount() {
		this.mapPropsToState();
	}

	mapPropsToState() {
		const { name, description, data } = this.props.productData;
		const { color, features, imageUrl, price, size } = data;

		this.setState({
			color,
			description,
			features,
			imageUrl,
			name,
			price,
			size,
		});
	}

	handleInputChange(e) {
		const { target } = e;
		this.setState({ [target.name]: target.value });
	}

	handleFormSubmit(e) {
		e.preventDefault();

		const {
			color,
			description,
			features,
			imageUrl,
			name,
			price,
			size,
		} = this.state;

		const payload = {
			name,
			description,
			data: {
				color,
				features,
				imageUrl,
				price,
				size,
			},
		};

		this.props.handleSubmit(payload);
	}

	render() {
		const fields = [
			{
				label: 'Name',
				fieldname: 'name',
				value: this.state.name,
				type: 'text',
			},
			{
				label: 'Description',
				fieldname: 'description',
				value: this.state.description,
				type: 'textarea',
			},
			{
				label: 'Price',
				fieldname: 'price',
				value: this.state.price,
				type: 'text',
			},
			{
				label: 'Size',
				fieldname: 'size',
				value: this.state.size,
				type: 'text',
			},
			{
				label: 'Color',
				fieldname: 'color',
				value: this.state.color,
				type: 'text',
			},
			{
				label: 'Image URL',
				fieldname: 'imageUrl',
				value: this.state.imageUrl,
				type: 'text',
			},
			{
				label: 'Features',
				fieldname: 'features',
				value: this.state.features,
				type: 'text',
			},
		];

		return (
			<div id="editProduct" className="p1">
				<h2>Edit Product</h2>
				<form onSubmit={this.handleFormSubmit}>
					{fields.map((field) => {
						const { label, fieldname, value, type } = field;
						return (
							<FormInput
								key={fieldname}
								label={label}
								name={fieldname}
								value={value}
								type={type}
								onChange={this.handleInputChange}
							/>
						);
					})}
					<div className="mt2 flex p1">
						<div className="pr1">
							<Button
								label="Save Changes"
								type="action"
								action={this.handleFormSubmit}
							/>
						</div>
						<div className="pr1">
							<Button
								label="Cancel"
								action={this.props.handleCancel}
							/>
						</div>
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
		data: PropTypes.shape({
			color: PropTypes.string,
			features: PropTypes.string,
			imageUrl: PropTypes.string,
			price: PropTypes.string,
			size: PropTypes.string,
		}),
	}),
	handleCancel: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};
EditProduct.defaultProps = {
	productData: {
		name: '',
		description: '',
		data: {},
	},
};

export default EditProduct;

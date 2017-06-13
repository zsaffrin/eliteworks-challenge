const Webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'index.js');
const clientPath = path.join(__dirname, 'client');

const config = {
	entry: {
		app: [
			'whatwg-fetch',
			sourcePath,
		],
	},
	devtool: 'source-map',
	output: {
		path: clientPath,
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				use: 'file-loader?name=fonts/[name].[ext]',
			},
			{
				test: /\.svg$/,
				use: 'file-loader?name=svg/[name].[ext]',
			},
		],
	},
	plugins: [
		new Webpack.optimize.OccurrenceOrderPlugin(),
	],
};

module.exports = config;

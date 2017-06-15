import React from 'react';

import Product from './Product';

require('overeasy/dist/overeasy.min.css');
require('../styles/App.scss');

const App = () => (
	<div id="app">
		<h1>EliteWorks Challenge</h1>
		<Product />
	</div>
);

export default App;

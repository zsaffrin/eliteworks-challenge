import React from 'react';

import Product from './Product';

require('overeasy/dist/overeasy.min.css');
require('../styles/App.scss');

const App = () => (
	<div id="app">
		<div className="p1">
			<h1 className="m0">EliteWorks Hiring Challenge</h1>
		</div>
		<Product />
	</div>
);

export default App;

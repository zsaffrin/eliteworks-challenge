import React from 'react';

import Product from './Product';

require('overeasy/dist/overeasy.min.css');
require('../styles/App.scss');

const App = () => (
	<div id="app">
		<div className="p1">
			<h1 className="m0">EliteWorks Hiring Challenge</h1>
			<p>
				A React app that can Get and Post to a product item by consuming the
				EliteWorks API
			</p>
			<div className="flex flex-center">
				<div>
					Built by&nbsp;
					<a
						href="http://zachsaffrin.com"
						target="_blank"
						rel="noreferrer noopener"
						className="red hover-green"
					>
						Zach Saffrin
					</a>
				</div>
				<div className="flex-grow px1 size-sm">
					&lt;&nbsp;
					<a
						href="mailto:zach.saffrin@gmail.com"
						className="red hover-underline hover-green"
					>
						zach.saffrin@gmail.com
					</a>
					&nbsp;&gt;
				</div>
			</div>

		</div>
		<div className="p2">
			<div className="container">
				<Product />
			</div>
		</div>
	</div>
);

export default App;

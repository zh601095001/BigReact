import React from 'react';
import ReactDom from 'react-dom';

const jsx = (
	<div>
		<span>big-react</span>
	</div>
);

console.log(React);
console.log(jsx);
console.log(ReactDom)
const root = document.getElementById('root');
ReactDom.createRoot(root).render(jsx)
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
	const [num, setNum] = useState(0);
	window.setNum = setNum;
	return (
		<div>
			<span>{num}</span>
		</div>
	);
};
ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

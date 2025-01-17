import { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
	const [num, setNum] = useState(100);

	const arr =
		num % 2 === 0
			? [<li key="1" aaa={10}>1</li>, <li key="2">2</li>, <li key="3">3</li>]
			: [<li key="3">3</li>, <li key="2">2</li>, <li key="1">1</li>];

	return <ul onClickCapture={() => setNum(num + 1)}>{arr}</ul>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

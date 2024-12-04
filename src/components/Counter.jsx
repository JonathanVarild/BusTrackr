function Counter(props) {
	return (
		<div>
			<h1>Counter: {props.count}</h1>
			<p>Status: {props.status}</p>
			{props.error && <p style={{ color: "red" }}>Error: {props.error}</p>}
			<button onClick={incrementACB}>Increment</button>
			<button onClick={decrementACB}>Decrement</button>
			<button onClick={randomizeACB}>Randomize</button>
		</div>
	);

	function incrementACB() {
		props.increment();
	}

	function decrementACB() {
		props.decrement();
	}

	function randomizeACB() {
		props.randomize();
	}
}

export default Counter;

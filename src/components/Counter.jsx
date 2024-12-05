function Counter(props) {
	return (
		<div>
			<h1>Counter: {props.count}</h1>
			<p>Status negative: {props.statusNegative}</p>
			<p>Status positive: {props.statusPositive}</p>
			{props.errorNegative && <p style={{ color: "red" }}>Error negative: {props.errorNegative}</p>}
			{props.errorPositive && <p style={{ color: "red" }}>Error positive: {props.errorPositive}</p>}
			<button onClick={incrementACB}>Increment</button>
			<button onClick={decrementACB}>Decrement</button>
			<button onClick={randomizeNegativeACB}>Randomize negative</button>
			<button onClick={randomizePositiveACB}>Randomize positive</button>
		</div>
	);

	function incrementACB() {
		props.increment();
	}

	function decrementACB() {
		props.decrement();
	}

	function randomizeNegativeACB() {
		props.randomizeNegative();
	}

	function randomizePositiveACB() {
		props.randomizePositive();
	}
}

export default Counter;

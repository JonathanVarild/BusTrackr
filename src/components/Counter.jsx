function Counter(props) {

	return (
		<div>
			<h1>Counter: {props.count}</h1>
			<button onClick={incrementACB}>Increment</button>
			<button onClick={decrementACB}>Decrement</button>
		</div>
	);

    function incrementACB() {
        props.increment()
    }

    function decrementACB() {
        props.decrement()
    }
}

export default Counter;

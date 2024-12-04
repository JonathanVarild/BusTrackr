import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, fetchRandomNegativeNumber, fetchRandomPositiveNumber } from "../store/counter";
import Counter from "../components/Counter";

function CounterTest() {
	const count = useSelector((state) => state.counter.count);
	const statusNegative = useSelector((state) => state.counter.negativeNumberFetch.status);
	const errorNegative = useSelector((state) => state.counter.negativeNumberFetch.error);
	const statusPositive = useSelector((state) => state.counter.positiveNumberFetch.status);
	const errorPositive = useSelector((state) => state.counter.positiveNumberFetch.error);

	const dispatch = useDispatch();

	return (
		<Counter
			count={count}
			statusNegative={statusNegative}
			errorNegative={errorNegative}
			statusPositive={statusPositive}
			errorPositive={errorPositive}
			increment={incrementACB}
			decrement={decrementACB}
			randomizeNegative={randomizeNegativeACB}
			randomizePositive={randomizePositiveACB}
		/>
	);

	function incrementACB() {
		dispatch(increment());
	}

	function decrementACB() {
		dispatch(decrement());
	}

	function randomizeNegativeACB() {
		dispatch(fetchRandomNegativeNumber());
	}

	function randomizePositiveACB() {
		dispatch(fetchRandomPositiveNumber());
	}
}

export default CounterTest;

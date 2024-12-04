import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, fetchRandomNumber } from "../store/counter";
import Counter from "../components/Counter";

function CounterTest() {
	const count = useSelector((state) => state.counter.count);
	const status = useSelector((state) => state.counter.status);
	const error = useSelector((state) => state.counter.error);

	const dispatch = useDispatch();

	return <Counter count={count} status={status} error={error} increment={incrementACB} decrement={decrementACB} randomize={randomizeACB} />;

	function incrementACB() {
		dispatch(increment());
	}

	function decrementACB() {
		dispatch(decrement());
	}

	function randomizeACB() {
		dispatch(fetchRandomNumber());
	}
}

export default CounterTest;

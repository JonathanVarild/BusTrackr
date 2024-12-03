import { useSelector } from "react-redux";
import { increment, decrement } from "../store/counter";
import store from "../store";
import Counter from "../components/Counter";

function CounterTest() {
	const count = useSelector((state) => state.counter.count);
	return <Counter count={count} increment={incrementACB} decrement={decrementACB} />;

	function incrementACB() {
		store.dispatch(increment());
	}

	function decrementACB() {
		store.dispatch(decrement());
	}
}

export default CounterTest;

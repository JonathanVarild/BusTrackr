import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define an asynchronous thunk to fetch a random number from the API
// Thunks allow you to handle asynchronous operations in Redux
export const fetchRandomNegativeNumber = createAsyncThunk("counter/fetchRandomNegativeNumber", async (_, { requestId }) => {
	const response = await fetch("http://www.random.org/integers/?num=1&min=-20&max=-1&col=1&base=10&format=plain&rnd=new");
	const data = await response.text();
	console.log("Request solved: " + data);
	await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 2000)); // Simulate a delay of 2-3 seconds
	return parseInt(data);
});

export const fetchRandomPositiveNumber = createAsyncThunk("counter/fetchRandomPositiveNumber", async () => {
	const response = await fetch("http://www.random.org/integers/?num=1&min=1&max=20&col=1&base=10&format=plain&rnd=new");
	const data = await response.text();
	console.log("Request solved: " + data);
	await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 5000)); // Simulate a delay of 2-3 seconds
	return parseInt(data);
});

const counterSlice = createSlice({
	name: "counter", // The name of the slice (used in Redux DevTools)
	initialState: {
		count: 0, // The initial value of the counter
		negativeNumberFetch: {
			status: "idle", // Tracks the status of the fetch (idle, loading, succeeded, failed)
			error: null, // Stores any errors from the API call
		},
		positiveNumberFetch: {
			status: "idle", // Tracks the status of the fetch (idle, loading, succeeded, failed)
			error: null, // Stores any errors from the API call
		},
		requestId: null, // Stores the ID of the latest request that was made.

	},
	reducers: {
		increment: (state) => {
			state.count += 1;
		},
		decrement: (state) => {
			state.count -= 1;
		},
	},
	extraReducers: (builder) => {
		// Handle the states of the fetchRandomNumber async thunk
		builder
			.addCase(fetchRandomNegativeNumber.pending, (state, action) => {
				state.negativeNumberFetch.status = "loading"; // Set status to loading while fetching
				state.requestId = action.meta.requestId;
			})
			.addCase(fetchRandomNegativeNumber.fulfilled, (state, action) => {
				if (state.requestId == action.meta.requestId) {
					state.positiveNumberFetch.status = "idle"; // Fetch was successful
					state.negativeNumberFetch.status = "succeeded"; // Fetch was successful
					state.count = action.payload; // Update the counter with the random number
				}
			})
			.addCase(fetchRandomNegativeNumber.rejected, (state, action) => {
				state.negativeNumberFetch.status = "failed"; // Fetch failed
				state.negativeNumberFetch.error = action.error.message; // Store the error message
			});

		builder
			.addCase(fetchRandomPositiveNumber.pending, (state, action) => {
				state.positiveNumberFetch.status = "loading"; // Set status to loading while fetching
				state.requestId = action.meta.requestId;
			})
			.addCase(fetchRandomPositiveNumber.fulfilled, (state, action) => {
				if (state.requestId == action.meta.requestId) {
					state.negativeNumberFetch.status = "idle";
					state.positiveNumberFetch.status = "succeeded"; // Fetch was successful
					state.count = action.payload; // Update the counter with the random number
				}
			})
			.addCase(fetchRandomPositiveNumber.rejected, (state, action) => {
				state.positiveNumberFetch.status = "failed"; // Fetch failed
				state.positiveNumberFetch.error = action.error.message; // Store the error message
			});
	},
});

// Export the synchronous actions to be used in components
export const { increment, decrement } = counterSlice.actions;

// Export the reducer to be included in the Redux store
export default counterSlice.reducer;

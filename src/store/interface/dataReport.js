import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResolvedCB } from "./utilities";

const apiUrl = import.meta.env.VITE_API_URL;

export const dataReportInitalState = {
	dataReport: {
		status: "idle",
		requestId: null,
		error: null,
		data: null,
	},
};

export const fetchDataReport = createAsyncThunk("interface/fetchDataReport", async (_, { getState, abort, requestId }) => {
	const state = getState().interface;

	if (state.dataReport.requestId !== requestId) return abort("Request already in progress.");

	return await fetch(apiUrl + "/api/data_report", {
		method: "POST",
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
		credentials: "include",
	}).then(fetchResolvedCB);
});

export function dataReportBuilder(builder) {
	builder
		.addCase(fetchDataReport.pending, (state, action) => {
			if (state.dataReport.requestId === null) {
				state.dataReport.status = "loading";
				state.dataReport.requestId = action.meta.requestId;
			}
		})
		.addCase(fetchDataReport.fulfilled, (state, action) => {
			if (state.dataReport.requestId === action.meta.requestId) {
				state.dataReport.status = "idle";
				state.dataReport.requestId = null;
				state.dataReport.data = {
					agreements: action.payload.agreements,
					loginLogs: action.payload.login_logs,
					reportLogs: action.payload.report_logs,
					favoriteLines: action.payload.favorite_lines,
					userData: action.payload.userData,
				};
			}
		})
		.addCase(fetchDataReport.rejected, (state, action) => {
			if (state.dataReport.requestId === action.meta.requestId) {
				state.dataReport.status = "failed";
				state.dataReport.requestId = null;
				state.dataReport.error = action.error.message;
			}
		});
}

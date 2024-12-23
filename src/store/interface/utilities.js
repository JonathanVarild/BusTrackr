export async function fetchResolvedCB(resp) {
	if (resp.status < 200 || resp.status > 200) {
		const error = await resp.json();
		return Promise.reject(new Error(error.message));
	}
	return resp.json();
}

export const lastClickedTypes = {
	VEHICLE: "vehicle",
	SEARCH: "search",
	TRENDING: "trending",
	FAVORITES: "favorites"
}

export function parseStringTime(stringTime) {
	return new Date(stringTime + "Z").toLocaleString("sv-SE").replace(",", "");
}

export function parseUserData(action, state) {
	const userData = action.payload.userData;
	const agreementsData = action.payload.agreements;
	const latestReport = action.payload.latest_report;

	if (!userData || !agreementsData) return;

	state.authenticate.userInfo = {
		id: userData.id,
		username: userData.username,
		email: userData.email,
		dateOfBirth: userData.date_of_birth,
		lastLoginTime: userData.latest_login ? parseStringTime(userData.latest_login.timestamp) : "Never",
		lastLoginFrom: userData.latest_login ? userData.latest_login.ip : "None",
		termsOfServiceAccepted: agreementsData.terms_of_service
			? `Accepted ${parseStringTime(agreementsData.terms_of_service.timestamp)} from ${agreementsData.terms_of_service.ip}`
			: "Never",
		dataPolicyAccepted: agreementsData.data_policy ? `Accepted ${parseStringTime(agreementsData.data_policy.timestamp)} from ${agreementsData.data_policy.ip}` : "Never",
		accountCreated: parseStringTime(userData.registration_date),
		lastReportGenerated: latestReport ? `Generated ${parseStringTime(latestReport.timestamp)} from ${latestReport.ip}` : "Never",
	};
}

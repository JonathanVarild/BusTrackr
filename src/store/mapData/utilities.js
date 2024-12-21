export function createLocation(latitude, longitude) {
	return { latitude, longitude };
}

export const lastClickedTypes = {
	VEHICLE: "vehicle",
	STOP: "stop",
	SEARCH: "search",
}
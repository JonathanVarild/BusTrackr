export function createLocation(latitude, longitude) {
	return { latitude, longitude };
}

export const blueBusses = ["1", "2", "3", "4", "6", "172", "173", "175", "176", "177", "178", "179", "471", "474", "670", "676", "677", "873", "875"];
export function isBlueBus(line) {
	return blueBusses.includes(line);
}

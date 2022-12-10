export const schemaValidator = (
	schemaKeys: string[],
	obj: { [key: string]: any }
): boolean => {
	return Object.keys(obj).every((value, index) => value === schemaKeys[index]);
};

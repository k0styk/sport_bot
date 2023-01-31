export const generateUnclosedCommandRegExp = (command: string) =>
	new RegExp(`^\/${command}`, 'gi');
export const generateClosedCommandRegExp = (command: string) =>
	new RegExp(`^\/${command}$`, 'i');
export const generateMatchedCommandRegExp = (command: string) =>
	new RegExp(`\/${command} (.+)`, '');

export const generateRegExp = (text: string) => new RegExp(`^${text}$`, "gi");
export const generateCommandRegExp = (command: string) =>
	new RegExp(`^\/${command}$`, "i");

export const hasExtension = (file: string, extensions: string[]) =>
	extensions.some(ext => file.toLowerCase().endsWith(ext));
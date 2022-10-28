import { ITtyError } from './interfaces';

export const isTtyError = (error: unknown): error is ITtyError => {
	return (
		error instanceof Error &&
		`isTtyError` in error &&
		typeof (error as any).isTtyError === `boolean`
	);
};

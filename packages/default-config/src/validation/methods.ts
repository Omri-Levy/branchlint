import { nameSchema, subjectSchema } from './schemas';
import { ZodSchema } from 'zod';

export const validate = (
	schema: ZodSchema,
	input: string,
): boolean | string => {
	const result = schema.safeParse(input);

	if (!result.success) {
		return result.error.format()._errors.join(`\n`);
	}

	return true;
};

export const nameValidate = (input: string): boolean | string =>
	validate(nameSchema, input);

export const subjectValidate = (input: string): boolean | string =>
	validate(subjectSchema, input);

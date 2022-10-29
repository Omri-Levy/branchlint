import { z } from 'zod';

export const withNameSchema = z
	.object({
		name: z.string(),
	})
	.passthrough();

export const stringFunctionSchema = z.function().returns(z.string());

export const optionalStringFunctionSchema = stringFunctionSchema.optional();

export const cliSchema = z.object({
	separator: z.string(),
	command: stringFunctionSchema,
	prefix: withNameSchema,
	middle: withNameSchema,
	suffix: withNameSchema,
	postCommand: withNameSchema,
	successMessage: optionalStringFunctionSchema,
	errorMessage: optionalStringFunctionSchema,
});

export const commandSchema = z.object({
	command: z.string({
		invalid_type_error: `Expected the return type of the command function to be a string.`,
	}),
});

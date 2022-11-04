import {z} from 'zod';

export const withNameSchema = z
	.object({
		name: z.string(),
	})
	.passthrough();

export const cliSchema = z.object({
	separator: z.string(),
	command: z
		.function()
		.args(z.object({
			branchName: z.string(),
			answers: z.record(z.string(), z.any()),
		}))
		.returns(z.string()),
	transformer: z
		.function()
		.args(z.object({
			answers: z.record(z.string(), z.any()),
		}))
		.returns(z.string()),
	prefix: withNameSchema,
	middle: withNameSchema,
	suffix: withNameSchema,
	postCommand: withNameSchema,
	successMessage: z
		.function()
		.args(z.object({
			branchName: z.string(),
			answers: z.record(z.string(), z.any()),
		}))
		.returns(z.string())
		.optional(),
	errorMessage: z
		.function()
		.args(z.object({
			error: z.unknown(),
		}))
		.returns(z.string())
		.optional(),
});

export const commandSchema = z.object({
	command: z.string({
		invalid_type_error: `Expected the return type of the command function to be a string.`,
	}),
});

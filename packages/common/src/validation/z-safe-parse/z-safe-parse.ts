import { SomeZodObject, z } from 'zod';

export const zSafeParse = <TSchema extends SomeZodObject>(
	schema: TSchema,
	input: any,
): z.SafeParseReturnType<z.input<TSchema>, z.output<TSchema>> => {
	const result = schema.safeParse(input);

	if (!result.success) {
		console.error(
			[
				`❌ Invalid .branchlintrc.cjs file.`,
				...result.error.issues.map(
					({ path, message }) => `${path.join(`.`)}: ${message}`,
				),
			].join(`\n`),
		);
	}

	return result;
};

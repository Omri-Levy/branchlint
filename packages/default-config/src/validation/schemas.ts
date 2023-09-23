import z, { ZodEffects, ZodString } from 'zod';
import lodash from 'lodash';

export const kebabCasePreprocess = (
	min: number,
	max: number,
	field: string,
): ZodEffects<ZodString, ZodString[`_output`], unknown> =>
	z.preprocess((val) => {
		if (typeof val !== `string`) {
			return val;
		}

		return lodash.kebabCase(val);
	}, z.string().min(min, `${field} must include at least ${min} character(s)`).max(max, `Name must include at most ${max} character(s)`));

export const nameSchema = kebabCasePreprocess(1, 70, `Name`);

export const subjectSchema = kebabCasePreprocess(1, 50, `Branch subject`);

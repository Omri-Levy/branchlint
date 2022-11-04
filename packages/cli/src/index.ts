#! /usr/bin/env node

import inquirer from 'inquirer';
import {exec} from 'child_process';
import {isTtyError, zSafeParse} from './utils';
import {resolve} from 'path';
import {isInstanceOfFunction} from './utils/is-instance-of-function';
import {cliSchema, commandSchema} from './validation';

export {branchlintConfig} from './utils/branchlint-config/branchlint-config';
export {TBranchlintConfig} from './types';

void (async () => {
	const branchlintrc = await import(
		resolve(process.cwd(), `.branchlintrc.cjs`)
		// On error, use the default
		)
		.then((mod) => mod.default)
		.catch(async () => await import(`@branchlint/default-config`));
	let errorMessage: (({error}: { error: unknown }) => string) | undefined;

	try {
		const {
			separator,
			prefix,
			middle,
			suffix,
			postCommand,
			successMessage,
			transformer,
			...config
		} = cliSchema.parse(branchlintrc);

		errorMessage = config.errorMessage;
		// Build the CLI steps from the config
		const answers = await inquirer.prompt([
			prefix,
			middle,
			suffix,
			postCommand,
		]);

		// Convert input from the CLI using the config's transformer into the branch name.
		const branchName = transformer(answers);
		const command = config.command({branchName, answers});

		// Make sure exec receives a string to avoid errors.
		const {success: isValidCommand} = zSafeParse(commandSchema, {
			command: config.command({branchName, answers}),
		});

		if (!isValidCommand) {
			return;
		}

		// i.e execute git checkout -b john-doe/feat/add-branchlint
		exec(command);

		if (!isInstanceOfFunction(successMessage)) return;

		console.log(successMessage({branchName, answers}));
	} catch (error) {
		// CLI/Inquirer specific error.
		if (isTtyError(error)) {
			console.error(
				`💥 Prompt couldn't be rendered in the current environment`,
			);

			return;
		}

		// Log the error if errorMessage is not a function, otherwise pass the error as an argument.
		console.error(
			isInstanceOfFunction(errorMessage) ? errorMessage({error}) : error,
		);

		process.exit(1);
	}
})();

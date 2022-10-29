#! /usr/bin/env node

import inquirer from 'inquirer';
import { kebabCase } from 'lodash';
import { exec } from 'child_process';
import { isTtyError, zSafeParse } from './utils';
import { resolve } from 'path';
import { isInstanceOfFunction } from './utils/is-instance-of-function';
import { cliSchema, commandSchema } from './validation';

void (async () => {
	const { default: config } = await import(
		resolve(process.cwd(), `.branchlintrc.cjs`)
		// On error, use the default config.
	).catch(async () => await import(`@branchlint/default-config`));

	try {
		const { success: isValidConfig } = zSafeParse(cliSchema, config);

		if (!isValidConfig) {
			return;
		}

		// Build the CLI steps from the config
		const answers = await inquirer.prompt([
			config.prefix,
			config.middle,
			config.suffix,
			config.postCommand,
		]);
		// Convert input from the CLI to kebab-case and separate prefix, middle, and suffix by the passed separator.
		// Don't transform checkout.
		const { checkout, ...toTransform } = answers;
		const branchName = Object.values(
			toTransform as Record<PropertyKey, string>,
		)
			?.map(kebabCase)
			?.join(config.separator);
		const command = config.command(branchName, answers);

		// Make sure exec receives a string to avoid errors.
		const { success: isValidCommand } = zSafeParse(commandSchema, {
			command: config.command(),
		});

		if (!isValidCommand) {
			return;
		}

		// i.e execute git checkout -b john-doe/feat/add-branchlint
		exec(command);

		if (!isInstanceOfFunction(config.successMessage)) return;

		console.log(config.successMessage(branchName, answers));
	} catch (error) {
		// CLI/Inquirer specific error.
		if (isTtyError(error)) {
			console.error(
				`💥 Prompt couldn't be rendered in the current environment`,
			);

			return;
		}

		// Log the error if config.errorMessage is not a function, otherwise pass the error as an argument.
		console.error(
			isInstanceOfFunction(config.errorMessage)
				? config.errorMessage(error)
				: error,
		);

		process.exit(1);
	}
})();

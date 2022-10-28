import inquirer from 'inquirer';
import { kebabCase } from 'lodash';
import { exec } from 'child_process';
import { isTtyError } from './utils';
import { nameValidate, subjectValidate } from './validation';

void (async () => {
	try {
		const name = {
			type: `input`,
			name: `name`,
			message: `What is your name?`,
			prefix: `👋`,
			validate: nameValidate,
		};
		const typeOfChange = {
			type: `list`,
			name: `typeOfChange`,
			message: `Select the type of change that you're committing:`,
			prefix: `🚧`,
			choices: [
				`feat`,
				`fix`,
				`docs`,
				`style`,
				`refactor`,
				`perf`,
				`test`,
				`build`,
				`ci`,
				`chore`,
				`revert`,
			],
		};
		const branchSubject = {
			type: `input`,
			name: `branchSubject`,
			message: `What is the branch's main subject? (i.e feature's name)`,
			prefix: `🏷️`,
			validate: subjectValidate,
		};
		const shouldCheckout = {
			type: `confirm`,
			name: `checkout`,
			message: `Checkout to new branch?`,
			default: true,
			prefix: `🍻`,
		};
		const { checkout, ...answers } = await inquirer.prompt([
			name,
			typeOfChange,
			branchSubject,
			shouldCheckout,
		]);
		const branchName = Object.values(answers as Record<PropertyKey, string>)
			?.map(kebabCase)
			?.join(`/`);
		const command = (checkout as boolean)
			? `git checkout -b ${branchName} && git push -u origin ${branchName}`
			: `git branch ${branchName}`;

		exec(command);
		console.log(`🎉 Created a branch named ${branchName}`);
	} catch (error) {
		if (!isTtyError(error)) {
			console.error(`💥 Failed to create a branch...`);

			process.exit(1);
		}

		if (error.isTtyError) {
			console.error(
				`Prompt couldn't be rendered in the current environment`,
			);
		}
	}
})();

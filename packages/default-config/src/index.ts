import {nameValidate, subjectValidate} from './validation';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {kebabCase} from 'lodash';
import {branchlintConfig} from '@branchlint/common';

const separator = `/`;
const {prefix, setUpstream, checkout} = yargs(hideBin(process.argv))
	.scriptName(`branchlint`)
	.option(`prefix`, {
		describe: `Provides a default prefix for cases where prefix does not change between uses.`,
		type: `string`,
	})
	.option(`set-upstream`, {
		describe: `Runs git push -u origin [BRANCH_NAME] after branch creation.`,
		alias: `u`,
		type: `boolean`,
	})
	.option(`checkout`, {
		describe: `Decides whether to run git checkout -b [BRANCH_NAME] or git branch [BRANCH_NAME] for branch creation.`,
		alias: `c`,
		type: `boolean`,
		default: undefined,
	})
	.parseSync();

module.exports = branchlintConfig({
	separator,
	prefix: {
		type: `input`,
		name: `name`,
		message: `What is your name?`,
		prefix: `👋`,
		validate: nameValidate,
		default: prefix || undefined,
	},
	middle: {
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
	},
	suffix: {
		type: `input`,
		name: `branchSubject`,
		message: `What is the branch's main subject? (i.e feature's name)`,
		prefix: `🏷️`,
		validate: subjectValidate,
	},
	postCommand: {
		type: `confirm`,
		name: `checkout`,
		message: `Checkout to new branch?`,
		default: true,
		prefix: `🍻`,
		when: typeof checkout !== `boolean`,
	},
	transformer: ({answers}) => {
		// Convert input from the CLI to kebab-case and separate prefix, middle, and suffix by the configured separator.
		// Don't transform checkout.
		const {checkout, ...toTransform} = answers;

		return Object.values(toTransform)
			.map(kebabCase)
			.join(separator);
	},
	command: ({
				  branchName,
				  answers,
			  }) => {
		const {checkout} = answers;
		const command = (checkout as boolean)
			? `git checkout -b ${branchName}`
			: `git branch ${branchName}`;

		return `${command}${
			setUpstream ? ` && git push -u origin ${branchName}` : ``
		}`;
	},
	successMessage: ({branchName}) =>
		`🎉 Created a branch named ${branchName}`,
	errorMessage: () => `💥 Failed to create a branch...`,
});

import { nameValidate, subjectValidate } from './validation';

export default {
	separator: `/`,
	prefix: {
		type: `input`,
		name: `name`,
		message: `What is your name?`,
		prefix: `👋`,
		validate: nameValidate,
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
	},
	command: (
		branchName: string,
		answers: Record<PropertyKey, string | boolean>,
	) => {
		const { checkout } = answers;

		return (checkout as boolean)
			? `git checkout -b ${branchName} && git push -u origin ${branchName}`
			: `git branch ${branchName}`;
	},
	successMessage: (branchName: string) =>
		`🎉 Created a branch named ${branchName}`,
	errorMessage: () => `💥 Failed to create a branch...`,
};

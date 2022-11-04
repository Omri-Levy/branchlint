import {z} from "zod";
import {cliSchema} from "./validation";
import {Answers, DistinctQuestion} from "inquirer";

export type CliSchema = z.infer<typeof cliSchema>;

export type TBranchlintConfig<T extends Answers = Answers> = CliSchema & {
	prefix: DistinctQuestion<T>;
	middle: DistinctQuestion<T>;
	suffix: DistinctQuestion<T>;
	postCommand: DistinctQuestion<T>;
}

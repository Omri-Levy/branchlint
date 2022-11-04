import {Answers} from "inquirer";
import {TBranchlintConfig} from "../../types";

export const branchlintConfig = <T extends Answers = Answers>(config: TBranchlintConfig<T>): TBranchlintConfig<T> => config;

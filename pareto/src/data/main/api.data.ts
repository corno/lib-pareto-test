import * as pd from 'pareto-core-data'

import { aconstructor, afunction, algorithm, dependent } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "createTestProgram": algorithm(aconstructor("this", {}, "CreateTester"), {}, dependent(null, {
            "getTestSet": afunction("this", {}, "GetTestSet"),
            "createTestParametersParser": aconstructor("parameters", {}, "CreateTestParametersParser"),

            "createTester": aconstructor("analyse", {}, "CreateTester"),
        }, {})),
    }),
}
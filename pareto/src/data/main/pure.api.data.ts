import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "createTestProgram": algorithm(functionReference("main", {}, "Main"), constructor(null, {
            "getTestSet": functionReference("this", {}, "GetTestSet"),
            "log": functionReference("common", {}, "Log"),
            "logError": functionReference("common", {}, "Log"),
            "onTestErrors": functionReference("common", {}, "Signal"),
        })),
    }),
}
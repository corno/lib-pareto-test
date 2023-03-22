import * as pd from 'pareto-core-data'

import { constructor, afunction, algorithm, aSideEffect, dependent, procedure, sfunction } from "lib-pareto-typescript-project/dist/submodules/project/shorthands"

import * as g_project from "lib-pareto-typescript-project/dist/submodules/project"
const d = pd.d

export const $: g_project.T.ModuleDefinition.api.root<pd.SourceLocation> = {
    'algorithms': d({
        "validateFile": algorithm(afunction("this", {}, "ValidateFile"), {}, dependent(null, {
            "readFile": afunction("fs", {}, "ReadFileOrAbort"),
            "diffData": sfunction("diff", {}, "DiffData"),
        }, {
            "writeFile": aSideEffect("fs", {}, "WriteFileFireAndForget"),
            "unlink": aSideEffect("fs", {}, "UnlinkFireAndForget")
        })),
        "createTester": algorithm(constructor("analyse", {}, "CreateTester"), {}, dependent(null, {
            "runTests": afunction("this", {}, "RunTests"),
            "isZero": sfunction("boolean", {}, "IsZero"),
            "summarize": sfunction("analyse", {}, "Summarize"),
            "serializeTestResult": procedure("analyse", {}, "SerializeTestResult"),
            "serializeSummary": procedure("analyse", {}, "SerializeSummary"),
        }, {
        })),
        "createTestRunner": algorithm(afunction("this", {}, "RunTests"), {}, dependent(null, {
            "diffData": sfunction("diff", {}, "DiffData"),
            "stringsAreEqual": sfunction("diff", {}, "StringsAreEqual"),
            "validateFile": afunction("this", {}, "ValidateFile"),
        }, {})),

        //"increment": algorithm(functionReference("this", {}, "Increment")),
    }),
}
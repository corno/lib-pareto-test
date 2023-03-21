import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "createFileValidator": algorithm(functionReference("this", {}, "ValidateFile"), constructor(null, {
            "readFile": functionReference("this", {}, "ReadFile"),
            "diffData": functionReference("diff", {}, "DiffData"),
            "writeFile": functionReference("fs", {}, "WriteFile"),
            "unlink": functionReference("fs", {}, "UnlinkFireAndForget"),
        })),
        "createTester": algorithm(functionReference("analyse", {}, "TestTestSet"), constructor(null, {
            "runTests": functionReference("this", {}, "RunTests"),
            "isZero": functionReference("boolean", {}, "IsZero"),
            "summarize": functionReference("analyse", {}, "Summarize"),
            "serializeTestResult": functionReference("analyse", {}, "SerializeTestResult"),
            "serializeSummary": functionReference("analyse", {}, "SerializeSummary"),
        })),
        "createTestRunner": algorithm(functionReference("this", {}, "RunTests"), constructor(null, {
            "diffData": functionReference("diff", {}, "DiffData"),
            "stringsAreEqual": functionReference("diff", {}, "StringsAreEqual"),
            "validateFile": functionReference("this", {}, "ValidateFile"),
        })),

        //"increment": algorithm(functionReference("this", {}, "Increment")),
    }),
}
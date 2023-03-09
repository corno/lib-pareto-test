import * as pd from 'pareto-core-data'

import { functionReference, constructor, algorithm, typeReference } from "lib-pareto-typescript-project/dist/submodules/api/shorthands"

import * as gapi from "lib-pareto-typescript-project/dist/submodules/api"
const d = pd.d

export const $: gapi.T.API<pd.SourceLocation> = {
    'algorithms': d({
        "createBoundTester": algorithm(functionReference("this", {}, "TestTestSet"), constructor(null, {
            "onTestErrors": functionReference("common", {}, "Signal"),
            "log": functionReference("common", {}, "Log"),
            "onError": functionReference("common", {}, "Log"),
        })),
        "createFileValidator": algorithm(functionReference("this", {}, "ValidateFile"), constructor(null, {
            "readFile": functionReference("this", {}, "ReadFile"),
            "diffData": functionReference("diff", {}, "DiffData"),
            "writeFile": functionReference("fs", {}, "WriteFile"),
            "unlink": functionReference("fs", {}, "UnlinkFireAndForget"),
        })),
        "createSummarizer": algorithm(functionReference("this", {}, "Summarize"), constructor(null, {
            "increment": functionReference("this", {}, "Increment"),
        })),
        "createSummarySerializer": algorithm(functionReference("this", {}, "SerializeSummary"), constructor(null, {
            "add": functionReference("arithmetic", {}, "Add"),
            "isZero": functionReference("boolean", {}, "IsZero"),
            "negate": functionReference("arithmetic", {}, "Negate"),
            "log": functionReference("common", {}, "Log"),
        })),
        "createTester": algorithm(functionReference("this", {}, "TestTestSet"), constructor(null, {
            "runTests": functionReference("this", {}, "RunTests"),
            "isZero": functionReference("boolean", {}, "IsZero"),
            "summarize": functionReference("this", {}, "Summarize"),
            "onTestErrors": functionReference("common", {}, "Signal"),
            "serializeTestResult": functionReference("this", {}, "SerializeTestResult"),
            "serializeSummary": functionReference("this", {}, "SerializeSummary"),
        })),
        "createTestParametersParser": algorithm(functionReference("this", {}, "ParseTestParameters"), constructor(null, {
            "onError": functionReference("this", {}, "HandleArgumentError"),
        })),
        "createTestRunner": algorithm(functionReference("this", {}, "RunTests"), constructor(null, {
            "diffData": functionReference("diff", {}, "DiffData"),
            "stringsAreEqual": functionReference("diff", {}, "StringsAreEqual"),
            "validateFile": functionReference("this", {}, "ValidateFile"),
        })),
        "createTestResultSerializer": algorithm(functionReference("this", {}, "SerializeTestResult"), constructor(null, {
            "isABeforeB": functionReference("collation", {}, "IsABeforeB"),
            "log": functionReference("common", {}, "Log"),
        })),
        "increment": algorithm(functionReference("this", {}, "Increment")),
    }),
}
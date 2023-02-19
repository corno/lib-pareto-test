import * as pd from 'pareto-core-data'

import {
    nested,
    array,
    typeReference,
    interfaceReference,
    method, dictionary, group, member, taggedUnion, types, func, data
} from "lib-pareto-typescript-project/dist/submodules/glossary/shorthands"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/submodules/moduleDefinition/shorthands"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/submodules/moduleDefinition"

const d = pd.d

export const $: mmoduleDefinition.T.ModuleDefinition<pd.SourceLocation> = {
    'glossary': {
        'imports': d({
            "public": "../../../../main",
            "common": "glo-pareto-common",
            "main": "res-pareto-main"
        }),
        'parameters': d({}),
        'types': d({
        }),
        'interfaces': d({
            "HandleTestParameters": method(typeReference("public", "TestParameters")),
        }),
        'functions': d({
            "HandleArgumentError": func(typeReference("public", "ArgumentError"), null, null, null),
            "Increment": func(typeReference("common", "Number"), null, null, data(typeReference("common", "Number"), false)),
            "ParseTestParameters": func(typeReference("main", "Arguments"), null, interfaceReference("HandleTestParameters"), null),
            "ReadFile": func(typeReference("common", "Path"), null, null, data(typeReference("common", "String"), true)),
            "RunTests": func(typeReference("public", "TestSet"), null, null, data(typeReference("public", "TestSetResult"), true)),
            "ValidateFile": func(typeReference("public", "ValidateFileData"), null, null, data(typeReference("public", "TestElementResult"), true)),
            "Summarize": func(typeReference("public", "TestSetResult"), null, null, data(typeReference("public", "Summary"), false)),
            "SerializeSummary": func(typeReference("public", "Summary"), null, null, null),
            "SerializeTestResult": func(typeReference("public", "TestSetResult"), null, null, null),
            "TestTestSet": func(typeReference("public", "TestSet"), null, null, null),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "public": "../../../main",
            "arithmetic": "res-pareto-arithmetic",
            "collation": "res-pareto-collation",
            "boolean": "res-pareto-boolean",
            "diff": "res-pareto-diff",
            "fs": "lib-pareto-filesystem",
        }),
        'algorithms': d({
            "createBoundTester": algorithm(definitionReference("TestTestSet"), constructor(null, {
                "onTestErrors": definitionReference("common", {}, "Signal"),
                "log": definitionReference("common", {}, "Log"),
                "onError": definitionReference("common", {}, "Log"),
            })),
            "createFileValidator": algorithm(definitionReference("ValidateFile"), constructor(null, {
                "readFile": definitionReference("ReadFile"),
                "diffData": definitionReference("diff", {}, "DiffData"),
                "writeFile": definitionReference("fs", {}, "WriteFile"),
                "unlink": definitionReference("fs", {}, "UnlinkFireAndForget"),
            })),
            "createSummarizer": algorithm(definitionReference("Summarize"), constructor(null, {
                "increment": definitionReference("Increment"),
            })),
            "createSummarySerializer": algorithm(definitionReference("SerializeSummary"), constructor(null, {
                "add": definitionReference("arithmetic", {}, "Add"),
                "isZero": definitionReference("boolean", {}, "IsZero"),
                "negate": definitionReference("arithmetic", {}, "Negate"),
                "log": definitionReference("common", {}, "Log"),
            })),
            "createTester": algorithm(definitionReference("TestTestSet"), constructor(null, {
                "runTests": definitionReference("RunTests"),
                "isZero": definitionReference("boolean", {}, "IsZero"),
                "summarize": definitionReference("Summarize"),
                "onTestErrors": definitionReference("common", {}, "Signal"),
                "serializeTestResult": definitionReference("SerializeTestResult"),
                "serializeSummary": definitionReference("SerializeSummary"),
            })),
            "createTestParametersParser": algorithm(definitionReference("ParseTestParameters"), constructor(null, {
                "onError": definitionReference("HandleArgumentError"),
            })),
            "createTestRunner": algorithm(definitionReference("RunTests"), constructor(null, {
                "diffData": definitionReference("diff", {}, "DiffData"),
                "stringsAreEqual": definitionReference("diff", {}, "StringsAreEqual"),
                "validateFile": definitionReference("ValidateFile"),
            })),
            "createTestResultSerializer": algorithm(definitionReference("SerializeTestResult"), constructor(null, {
                "isABeforeB": definitionReference("collation", {}, "IsABeforeB"),
                "log": definitionReference("common", {}, "Log"),
            })),
            "increment": algorithm(definitionReference("Increment")),
        })
    },
}
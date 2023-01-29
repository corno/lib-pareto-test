import * as pr from 'pareto-core-raw'

import {
    nested,
    array,
    typeReference,
    procedure,
    callback,
    interfaceReference,
    method, dictionary, group, member, taggedUnion, types, _function
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"

import { definitionReference, constructor, algorithm } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "public": "../../../public",
            "common": "glo-pareto-common",
            "main": "res-pareto-main"
        }),
        'parameters': d({}),
        'templates': d({}),
        'types': types({
        }),
        'interfaces': d({
            "HandleTestParameters": method(typeReference("public", "TestParameters")),
        }),
        'functions': d({
            "HandleArgumentError": procedure(typeReference("public", "ArgumentError")),
            "Increment": _function(typeReference("common", "Number"), typeReference("common", "Number")),
            "ParseTestParameters": callback(typeReference("main", "Arguments"), interfaceReference("HandleTestParameters")),
            "ReadFile": _function(typeReference("common", "Path"), typeReference("common", "String"), true),
            "RunTests": _function(typeReference("public", "TestSet"), typeReference("public", "TestSetResult"), true),
            "ValidateFile": _function(typeReference("public", "ValidateFileData"), typeReference("public", "TestElementResult"), true),
            "Summarize": _function(typeReference("public", "TestSetResult"), typeReference("public", "Summary")),
            "SerializeSummary": procedure(typeReference("public", "Summary")),
            "SerializeTestResult": procedure(typeReference("public", "TestSetResult")),
            "TestTestSet": procedure(typeReference("public", "TestSet")),
        }),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "public": "../../public",
            "arithmetic": "res-pareto-arithmetic",
            "collation": "res-pareto-collation",
            "boolean": "res-pareto-boolean",
            "diff": "res-pareto-diff",
            "fs": "lib-pareto-filesystem",
        }),
        'algorithms': d({
            "createBoundTester": algorithm(definitionReference("TestTestSet"), constructor(null, {
                "onTestErrors": definitionReference("common", "Signal"),
                "log": definitionReference("common", "Log"),
                "onError": definitionReference("common", "Log"),
            })),
            "createFileValidator": algorithm(definitionReference("ValidateFile"), constructor(null, {
                "readFile": definitionReference("ReadFile"),
                "diffData": definitionReference("diff", "DiffData"),
                "writeFile": definitionReference("fs", "WriteFile"),
                "unlink": definitionReference("fs", "UnlinkFireAndForget"),
            })),
            "createSummarizer": algorithm(definitionReference("Summarize"), constructor(null, {
                "increment": definitionReference("Increment"),
            })),
            "createSummarySerializer": algorithm(definitionReference("SerializeSummary"), constructor(null, {
                "add": definitionReference("arithmetic", "Add"),
                "isZero": definitionReference("boolean", "IsZero"),
                "negate": definitionReference("arithmetic", "Negate"),
                "log": definitionReference("common", "Log"),
            })),
            "createTester": algorithm(definitionReference("TestTestSet"), constructor(null, {
                "runTests": definitionReference("RunTests"),
                "isZero": definitionReference("boolean", "IsZero"),
                "summarize": definitionReference("Summarize"),
                "onTestErrors": definitionReference("common", "Signal"),
                "serializeTestResult": definitionReference("SerializeTestResult"),
                "serializeSummary": definitionReference("SerializeSummary"),
            })),
            "createTestParametersParser": algorithm(definitionReference("ParseTestParameters"), constructor(null, {
                "onError": definitionReference("HandleArgumentError"),
            })),
            "createTestRunner": algorithm(definitionReference("RunTests"), constructor(null, {
                "diffData": definitionReference("diff", "DiffData"),
                "stringsAreEqual": definitionReference("diff", "StringsAreEqual"),
                "validateFile": definitionReference("ValidateFile"),
            })),
            "createTestResultSerializer": algorithm(definitionReference("SerializeTestResult"), constructor(null, {
                "isABeforeB": definitionReference("collation", "IsABeforeB"),
                "log": definitionReference("common", "Log"),
            })),
            "increment": algorithm(definitionReference("Increment")),
        })
    },
}
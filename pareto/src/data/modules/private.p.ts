import * as pr from 'pareto-core-raw'
import {
    externalReference as er,
    string as str,
    reference as ref,
    boolean as bln,
    number as nr,
    nested,
    optional,
    array,
    externalTypeReference,
    typeReference,
    procedure,
    callback,
    interfaceReference,
    method,
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"
import { dictionary, group, member, taggedUnion, types, _function } from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"


import { definitionReference, externalDefinitionReference, constructor } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"
import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary
const a = pr.wrapRawArray


export const $: mmoduleDefinition.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "public": "../../../public",
            "common": "glo-pareto-common",
            "main": "lib-pareto-main"
        }),
        'parameters': d({}),
        'templates': d({}),
        'types': types({
        }),
        'interfaces': d({
            "HandleTestParameters": method(externalTypeReference("public", "TestParameters")),
        }),
        'functions': d({
            "HandleArgumentError": procedure(externalTypeReference("public", "ArgumentError")),
            "Increment": _function(externalTypeReference("common", "Number"), externalTypeReference("common", "Number")),
            "ParseTestParameters": callback(externalTypeReference("main", "Arguments"), interfaceReference("HandleTestParameters")),
            "ReadFile": _function(externalTypeReference("common", "Path"), externalTypeReference("common", "String"), true),
            "RunTests": _function(externalTypeReference("public", "TestSet"), externalTypeReference("public", "TestSetResult"), true),
            "ValidateFile": _function(externalTypeReference("public", "ValidateFileData"), externalTypeReference("public", "TestElementResult"), true),
            "Summarize": _function(externalTypeReference("public", "TestSetResult"), externalTypeReference("public", "Summary")),
            "SerializeSummary": procedure(externalTypeReference("public", "Summary")),
            "SerializeTestResult": procedure(externalTypeReference("public", "TestSetResult")),
            "TestTestSet": procedure(externalTypeReference("public", "TestSet")),
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
            "createBoundTester": {
                'definition': definitionReference("TestTestSet"),
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "onTestErrors": {
                            'context': ['import', "common"],
                            'function': "Signal"
                        },
                        "log": {
                            'context': ['import', "common"],
                            'function': "Log"
                        },
                        "onError": {
                            'context': ['import', "common"],
                            'function': "Log"
                        },
                    }),
                }]
            },
            "createFileValidator": {
                'definition': definitionReference("ValidateFile"),
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "readFile": definitionReference("ReadFile"),
                        "diffData": {
                            'context': ['import', "diff"],
                            'function': "DiffData",
                        },
                        "writeFile": {
                            'context': ['import', "fs"],
                            'function': "WriteFile"
                        },
                        "unlink": {
                            'context': ['import', "fs"],
                            'function': "UnlinkFireAndForget"
                        },
                    }),
                }]
            },
            "createSummarizer": {
                'definition': definitionReference("Summarize"),
                'type': constructor(null, {
                    "increment": definitionReference("Increment"),
                }),
            },
            "createSummarySerializer": {
                'definition': definitionReference("SerializeSummary"),
                'type': constructor(null, {
                    "add": {
                        'context': ['import', "arithmetic"],
                        'function': "Add",
                    },
                    "isZero": {
                        'context': ['import', "boolean"],
                        'function': "IsZero",
                    },
                    "negate": {
                        'context': ['import', "arithmetic"],
                        'function': "Negate",
                    },
                    "log": {
                        'context': ['import', "common"],
                        'function': "Log",
                    },
                }),
            },
            "createTester": {
                'definition': definitionReference("TestTestSet"),
                'type': constructor(null, {
                    "runTests": definitionReference("RunTests"),
                    "isZero": {
                        'context': ['import', "boolean"],
                        'function': "IsZero",
                    },
                    "summarize": definitionReference("Summarize"),
                    "onTestErrors": {
                        'context': ['import', "common"],
                        'function': "Signal"
                    },
                    "serializeTestResult": definitionReference("SerializeTestResult"),
                    "serializeSummary": definitionReference("SerializeSummary"),
                }),
            },
            "createTestParametersParser": {
                'definition': definitionReference("ParseTestParameters"),
                'type': constructor(null, {
                    "onError": definitionReference("HandleArgumentError"),
                }),
            },
            "createTestRunner": {
                'definition': definitionReference("RunTests"),
                'type': constructor(null, {
                    "diffData": {
                        'context': ['import', "diff"],
                        'function': "DiffData",
                    },
                    "stringsAreEqual": {
                        'context': ['import', "diff"],
                        'function': "StringsAreEqual",
                    },
                    "validateFile": definitionReference("ValidateFile"),
                }),
            },
            "createTestResultSerializer": {
                'definition': definitionReference("SerializeTestResult"),
                'type': constructor(null, {
                    "isABeforeB": externalDefinitionReference("collation", "IsABeforeB"),
                    "log": externalDefinitionReference("common", "Log"),
                }),
            },
            "increment": {
                'definition': definitionReference("Increment"),
                'type': ['reference', null],
            }
        })
    },
}
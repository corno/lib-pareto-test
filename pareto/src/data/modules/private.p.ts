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
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"
import { dictionary, group, member, taggedUnion, types, _function } from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"


import { definitionReference, externalDefinitionReference, constructor } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"
import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary
const a = pr.wrapRawArray


export const $: mmoduleDefinition.TModuleDefinition = {

    'glossary': {
        'imports': d({
            "public": "../../public",
            "common": "glo-pareto-common",
            "main": "lib-pareto-main"
        }),
        'namespace': {
            'types': types({
                // "WriteFileData": group({
                //     "path": member(er("common", "Path")),
                //     "data": member(str()),
                // })
            }),
            'interfaces': d({
                "HandleTestParameters": ['method', {
                    'data': {
                        'context': ['import', "public"],
                        'namespaces': a([]),
                        'type': "TestParameters"
                    },
                    'interface': null,
                }]
            }),

        },
        'functions': d({
            "HandleArgumentError": procedure(externalTypeReference("public", "ArgumentError")),
            "Increment": _function(externalTypeReference("common", "Number"), externalTypeReference("common", "Number")),
            // "IsZero": _function(number(), boolean()),
            // "Negate": _function(number(), number()),
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
                'definition':{
                    'function': "TestTestSet",
                },

                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "onTestErrors": {
                            'context': ['import', "common"],
                            'function': "Signal"
                        },
                        "log":  {
                            'context': ['import', "common"],
                            'function': "Log"
                        },
                        "onError":  {
                            'context': ['import', "common"],
                            'function': "Log"
                        },
                    }),
                }]
            },
            "createFileValidator": {
                'definition': {
                    'function': "ValidateFile",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "readFile": {
                            'function': "ReadFile",
                        },
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

                'definition': {
                    'function': "Summarize",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "increment": {
                            'function': "Increment",
                        },
                    }),
                }],
            },
            "createSummarySerializer": {
                'definition': {
                    'function': "SerializeSummary",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
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
                }],
            },
            "createTester": {
                'definition': {
                    'function': "TestTestSet",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "runTests": {
                            'function': "RunTests",
                        },
                        "isZero": {
                            'context': ['import', "boolean"],
                            'function': "IsZero",
                        },
                        "summarize": {
                            'function': "Summarize",
                        },
                        "onTestErrors": {
                            'context': ['import', "common"],
                            'function': "Signal"
                        },
                        "serializeTestResult": {
                            'function': "SerializeTestResult"
                        },
                        "serializeSummary": {
                            'function': "SerializeSummary"
                        },
                    }),
                }],
            },
            "createTestParametersParser": {
                'definition': {
                    

                    'function': "ParseTestParameters"
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "onError": {
                            'function': "HandleArgumentError"
                        },

                    }),
                }],
            },
            "createTestRunner": {
                'definition': {
                    'function': "RunTests",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "diffData":  {
                            'context': ['import', "diff"],
                            'function': "DiffData",
                        },
                        "stringsAreEqual":  {
                            'context': ['import', "diff"],
                            'function': "StringsAreEqual",
                        },
                        "validateFile": {
                            'function': "ValidateFile",
                            'async': true,
                        },
                    }),
                }],
            },
            "createTestResultSerializer": {
                'definition': {
                    'function': "SerializeTestResult",
                },
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "isABeforeB": {
                            'context': ['import', "collation"],
                            'function': "IsABeforeB",
                        },
                        "log": {
                            'context': ['import', "common"],
                            'function': "Log",
                        },
                    }),
                }],
            },
            "increment": {

                'definition': {
                    'function': "Increment"
                },
                'type': ['reference', null],
            }
        })
    },
}
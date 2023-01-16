import * as pr from "pareto-core-raw"
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
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"
import { dictionary, group, member, taggedUnion, types, _function } from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"


import { string, reference, externalReference, number, boolean } from "lib-pareto-typescript-project/dist/modules/moduleDefinition/api/shorthands.p"
import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"

const d = pr.wrapRawDictionary


export const $: mmoduleDefinition.TModuleDefinition = {

    'glossary': {
        'imports': d({
            "public": "../../public",
            "common": "glo-pareto-common"
        }),
        'namespace': {
            'types': types({
                "WriteFileData": group({
                    "path": member(er("common", "Path")),
                    "data": member(str()),
                })
            }),
            'interfaces': d({}),

        },
        'functions': d({
            "Increment": _function(externalTypeReference("common", "Number"), externalTypeReference("common", "Number")),
            // "IsZero": _function(number(), boolean()),
            // "Negate": _function(number(), number()),
            "ReadFile": _function(externalTypeReference("common", "Path"), externalTypeReference("common", "String"), true),
            "RunTests": _function(externalTypeReference("public", "TestSet"), externalTypeReference("public", "TestSetResult"), true),
            "ValidateFile": _function(externalTypeReference("public", "ValidateFileData"), externalTypeReference("public", "TestElementResult"), true),
            "Summarize": _function(externalTypeReference("public", "TestSetResult"), externalTypeReference("public", "Summary")),


        }),
        'callbacks': d({}),
        'pipes': d({}),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
            "public": "../../public",
            "arithmetic": "res-pareto-arithmetic",
            "collation": "res-pareto-collation",
            "boolean": "res-pareto-boolean",
            "diff": "res-pareto-diff",
            "fs": "res-pareto-filesystem",
        }),
        'algorithms': d({
            "createArgumentsParser": {
                'definition': ['procedure', externalTypeReference("public", "Arguments")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "callback": ['procedure', externalTypeReference("public", "TestParameters")],
                        "onError": ['procedure', externalTypeReference("common", "String")],
                    }),
                }]
            },
            "createBoundTester": {
                'definition': ['procedure', externalTypeReference("public", "TestSet")],

                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "onTestErrors": ['procedure', externalTypeReference("common", "Null")],
                        "log": ['procedure', externalTypeReference("common", "String")],
                        "onError": ['procedure', externalTypeReference("common", "String")],
                    }),
                }]
            },
            "createFileValidator": {
                'definition': ['function', {
                    'function': "ValidateFile",
                    'async': true,
                }],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "readFile": ['function', {
                            'function': "ReadFile",
                            'async': true,
                        }],
                        "diffData": ['function', {
                            'context': ['import', "diff"],
                            'function': "DiffData",
                        }],

                        "writeFile": ['procedure', typeReference("WriteFileData")],
                        "unlink": ['procedure', externalTypeReference("fs", "Unlink_Data")],
                    }),
                }]
            },
            "createSummarizer": {

                'definition': ['function', {
                    'function': "Summarize",
                }],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "increment": ['function', {
                            'function': "Increment",
                        }],
                    }),
                }],
            },
            "createSummarySerializer": {
                'definition': ['procedure', externalTypeReference("public", "Summary")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "add": ['function', {
                            'context': ['import', "arithmetic"],
                            'function': "Add",
                        }],
                        "isZero": ['function', {
                            'context': ['import', "boolean"],
                            'function': "IsZero",
                        }],
                        "negate": ['function', {
                            'context': ['import', "arithmetic"],
                            'function': "Negate",
                        }],


                        "log": ['procedure', externalTypeReference("common", "String")],
                    }),
                }],
            },
            "createTester": {
                'definition': ['procedure', externalTypeReference("public", "TestSet")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "runTests": ['function', {
                            'function': "RunTests",
                            'async': true,
                        }],
                        "isZero": ['function', {
                            'context': ['import', "boolean"],
                            'function': "IsZero",
                        }],
                        "summarize": ['function', {
                            'function': "Summarize",
                        }],
                        "onTestErrors": ['procedure', externalTypeReference("common", "Null")],
                        "serializeTestResult": ['procedure', externalTypeReference("public", "TestSetResult")],
                        "serializeSummary": ['procedure', externalTypeReference("public", "Summary")],
                    }),
                }],
            },
            "createTestParametersParser": {
                'definition': ['procedure', externalTypeReference("public", "Arguments")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "callback": ['procedure', externalTypeReference("public", "TestParameters")],
                        "onError": ['procedure', externalTypeReference("public", "ArgumentError")],

                    }),
                }],
            },
            "createTestRunner": {
                'definition': ['function', {
                    'function': "RunTests",
                    'async': true,
                }],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "diffData": ['function', {
                            'context': ['import', "diff"],
                            'function': "DiffData",
                        }],
                        "stringsAreEqual": ['function', {
                            'context': ['import', "diff"],
                            'function': "StringsAreEqual",
                        }],
                        "validateFile": ['function', {
                            'function': "ValidateFile",
                            'async': true,
                        }],
                    }),
                }],
            },
            "createTestResultSerializer": {
                'definition': ['procedure', externalTypeReference("public", "TestSetResult")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "isABeforeB": ['function', {
                            'context': ['import', "collation"],
                            'function': "IsABeforeB",
                        }],
                        "log": ['procedure', externalTypeReference("common", "String")],
                    }),
                }],
            },
            "increment": {

                'definition': ['function', {
                    'function': "Increment"
                }],
                'type': ['reference', null],
            }
        })
    },
}
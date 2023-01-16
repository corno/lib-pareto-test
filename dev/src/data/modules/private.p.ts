import * as pr from "pareto-core-raw"
import {
    externalReference as er,
    string as str,
    nullType,
    type,
    reference as ref,
    boolean as bln,
    number as nr,
    nested,
    optional,
    array,
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
            "Increment": _function(number(), number()),
            // "IsZero": _function(number(), boolean()),
            // "Negate": _function(number(), number()),
            "ReadFile": _function(externalReference("common", "Path"), string(), true),
            "RunTests": _function(externalReference("public", "TestSet"), externalReference("public", "TestSetResult"), true),
            "ValidateFile": _function(externalReference("public", "ValidateFileData"), externalReference("public", "TestElementResult"), true),
            "Summarize": _function(externalReference("public", "TestSetResult"), externalReference("public", "Summary")),


        }),
        'callbacks': d({}),
        'pipes': d({}),
    },
    'api': {
        'imports': d({
            "public": "../../public",
            "arithmetic": "res-pareto-arithmetic",
            "collation": "res-pareto-collation",
            "boolean": "res-pareto-boolean",
            "diff": "res-pareto-diff",
            "fs": "res-pareto-filesystem",
        }),
        'algorithms': d({
            "createArgumentsParser": {
                'definition': ['procedure', ['type', externalReference("public", "Arguments")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "callback": ['procedure', ['type', externalReference("public", "TestParameters")]],
                        "onError": ['procedure', ['type', string()]],
                    }),
                }]
            },
            "createBoundTester": {
                'definition': ['procedure', ['type', externalReference("public", "TestSet")]],

                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "onTestErrors": ['procedure', ['null', null]],
                        "log": ['procedure', ['type', string()]],
                        "onError": ['procedure', ['type', string()]],
                    }),
                }]
            },
            "createFileValidator": {
                'definition': ['function', {
                    'function': "ValidateFile",
                    'async': true,
                }],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "readFile": ['function', {
                            'function': "ReadFile",
                            'async': true,
                        }],
                        "diffData": ['function', {
                            'context': ['import', "diff"],
                            'function': "DiffData",
                        }],

                        "writeFile": ['procedure', ['type', reference("WriteFileData")]],
                        "unlink": ['procedure', ['type', externalReference("fs", "Unlink_Data")]],
                    }),
                }]
            },
            "createSummarizer": {

                'definition': ['function', {
                    'function': "Summarize",
                }],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "increment": ['function', {
                            'function': "Increment",
                        }],
                    }),
                }],
            },
            "createSummarySerializer": {
                'definition': ['procedure', ['type', externalReference("public", "Summary")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
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


                        "log": ['procedure', ['type', string()]],
                    }),
                }],
            },
            "createTester": {
                'definition': ['procedure', ['type', externalReference("public", "TestSet")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
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
                        "onTestErrors": ['procedure', ['null', null]],
                        "serializeTestResult": ['procedure', ['type', externalReference("public", "TestSetResult")]],
                        "serializeSummary": ['procedure', ['type', externalReference("public", "Summary")]],
                    }),
                }],
            },
            "createTestParametersParser": {
                'definition': ['procedure', ['type', externalReference("public", "Arguments")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "callback": ['procedure', ['type', externalReference("public", "TestParameters")]],
                        "onError": ['procedure', ['type', externalReference("public", "ArgumentError")]],

                    }),
                }],
            },
            "createTestRunner": {
                'definition': ['function', {
                    'function': "RunTests",
                    'async': true,
                }],
                'type': ['constructor', {
                    'configuration data': ['null', null],
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
                'definition': ['procedure', ['type', externalReference("public", "TestSetResult")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "isABeforeB": ['function', {
                            'context': ['import', "collation"],
                            'function': "IsABeforeB",
                        }],
                        "log": ['procedure', ['type', string()]],
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
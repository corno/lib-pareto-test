import * as pr from "pareto-core-raw"

import { group, member, nullType, types, _function } from "lib-pareto-typescript-project/dist/modules//glossary/api/shorthands.p"
import { externalReference as er, string as str } from "lib-pareto-typescript-project/dist/modules//glossary/api/shorthands.p"
import { string, reference, externalReference, number, boolean } from "lib-pareto-typescript-project/dist/modules/api/api/shorthands.p"

import * as mproject from "lib-pareto-typescript-project/dist/modules//project"
import { api } from "./api.p"


const wd = pr.wrapRawDictionary

export const project: mproject.TProject = {
    'modules': wd({
        "public": {
            'definition': api,
            'implementation': {}
        },
        "private": {
            'definition': {

                'glossary': {
                    'imports': wd({
                        "api": "../../public",
                        "common": "glo-pareto-common"
                    }),
                    'types': types({
                        "WriteFileData": group({
                            "path": member(er("common", "Path")),
                            "data": member(str()),
                        })
                    }),
                    'functions': wd({
                        "Increment": _function(number(), number()),
                        // "IsZero": _function(number(), boolean()),
                        // "Negate": _function(number(), number()),
                        "ReadFile": _function(externalReference("common", "Path"), string(), true),
                        "RunTests": _function(externalReference("api", "TestSet"), externalReference("api", "TestSetResult"), true),
                        "ValidateFile": _function(externalReference("api", "ValidateFileData"), externalReference("api", "TestElementResult"), true),
                        "Summarize": _function(externalReference("api", "TestSetResult"), externalReference("api", "Summary")),


                    }),
                    'interfaces': wd({}),
                    'callbacks': wd({}),
                    'pipes': wd({}),
                },
                'api': {
                    'imports': wd({
                        "api": "../../public",
                        "arithmetic": "res-pareto-arithmetic",
                        "collation": "res-pareto-collation",
                        "boolean": "res-pareto-boolean",
                        "diff": "res-pareto-diff",
                        "fs": "res-pareto-filesystem",
                    }),
                    'algorithms': wd({
                        "createArgumentsParser": {
                            'definition': ['procedure', ['type', externalReference("api", "Arguments")]],
                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
                                    "callback": ['procedure', ['type', externalReference("api", "TestParameters")]],
                                    "onError": ['procedure', ['type', string()]],
                                }),
                            }]
                        },
                        "createBoundTester": {
                            'definition': ['procedure', ['type', externalReference("api", "TestSet")]],

                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
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
                                'dependencies': wd({
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
                                'dependencies': wd({
                                    "increment": ['function', {
                                        'function': "Increment",
                                    }],
                                }),
                            }],
                        },
                        "createSummarySerializer": {
                            'definition': ['procedure', ['type', externalReference("api", "Summary")]],
                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
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
                            'definition': ['procedure', ['type', externalReference("api", "TestSet")]],
                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
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
                                    "serializeTestResult": ['procedure', ['type', externalReference("api", "TestSetResult")]],
                                    "serializeSummary": ['procedure', ['type', externalReference("api", "Summary")]],
                                }),
                            }],
                        },
                        "createTestParametersParser": {
                            'definition': ['procedure', ['type', externalReference("api", "Arguments")]],
                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
                                    "callback": ['procedure', ['type', externalReference("api", "TestParameters")]],
                                    "onError": ['procedure', ['type', externalReference("api", "ArgumentError")]],

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
                                'dependencies': wd({
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
                            'definition': ['procedure', ['type', externalReference("api", "TestSetResult")]],
                            'type': ['constructor', {
                                'configuration data': ['null', null],
                                'dependencies': wd({
                                    "isABeforeB": ['function', {
                                        'context': ['import', "collation"],
                                        'function': "IsABeforeB",
                                    }],
                                    "log": ['procedure', ['type', string()]],
                                }),
                            }],
                        },
                    })
                },
            },
            'implemenation': {}
        }
    }),
    'main': "public"
}
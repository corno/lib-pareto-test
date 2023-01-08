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
                    'callbacks': wd({}),
                    'interfaces': wd({}),
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
                        "createArgumentsParser": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({}),
                                'downstreams': wd({
                                    "callback": ['type', externalReference("api", "TestParameters")],
                                    "onError": ['type', string()],
                                }),
                            },
                            'type': ['type', externalReference("api", "Arguments")],
                        }],
                        "createBoundTester": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({}),
                                'downstreams': wd({
                                    "onTestErrors": ['null', null],
                                    "log": ['type', string()],
                                    "onError": ['type', string()],
                                }),
                            },
                            'type': ['type', externalReference("api", "TestSet")],
                        }],
                        "createFileValidator": ['function constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({
                                    "readFile": {
                                        'function': "ReadFile",
                                        'async': true,
                                    },
                                    "diffData": {
                                        'context': ['import', "diff"],
                                        'function': "DiffData",
                                    },
                                }),
                                'side effects': wd({
                                    "writeFile": ['type', reference("WriteFileData")],
                                    "unlink": ['type', externalReference("fs", "Unlink_Data")],
                                }),
                            },
                            'function': {
                                'function': "ValidateFile",
                                'async': true,
                            },
                        }],
                        "createSummarizer": ['function constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({
                                    "increment": {
                                        'function': "Increment",
                                    },
                                }),
                                'side effects': wd({
                                    //     "log": {
                                    //         'type': ['procedure', ['type', string()]],

                                    //     },
                                }),
                            },
                            'function': {
                                'function': "Summarize",
                            },
                        }],
                        "createSummarySerializer": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({
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

                                }),
                                'downstreams': wd({
                                    "log": ['type', string()],
                                }),
                            },
                            // 'dependencies': wd({
                            // }),
                            'type': ['type', externalReference("api", "Summary")],
                        }],
                        "createTester": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({

                                    "runTests": {
                                        'function': "RunTests",
                                        'async': true,
                                    },
                                    "isZero": {
                                        'context': ['import', "boolean"],
                                        'function': "IsZero",
                                    },
                                    "summarize": {
                                        'function': "Summarize",
                                    },
                                }),
                                'downstreams': wd({
                                    "onTestErrors": ['null', null],
                                    "serializeTestResult": ['type', externalReference("api", "TestSetResult")],
                                    "serializeSummary": ['type', externalReference("api", "Summary")],
                                }),
                            },
                            'type': ['type', externalReference("api", "TestSet")],
                        }],
                        "createTestParametersParser": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({}),
                                'downstreams': wd({
                                    "callback": ['type', externalReference("api", "TestParameters")],
                                    "onError": ['type', externalReference("api", "ArgumentError")],
                                }),
                            },
                            'type': ['type', externalReference("api", "Arguments")],

                        }],
                        "createTestRunner": ['function constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({
                                    "diffData": {
                                        'context': ['import', "diff"],
                                        'function': "DiffData",
                                    },
                                    "stringsAreEqual": {
                                        'context': ['import', "diff"],
                                        'function': "StringsAreEqual",
                                    },
                                    "validateFile": {
                                        'function': "ValidateFile",
                                        'async': true,
                                    },

                                }),
                            },
                            'function': {
                                'function': "RunTests",
                                'async': true,
                            }
                        }],
                        "createTestResultSerializer": ['procedure constructor', {
                            'configuration data': ['null', null],
                            'dependencies': {
                                'functions': wd({
                                    "isABeforeB": {
                                        'context': ['import', "collation"],
                                        'function': "IsABeforeB",
                                    },
                                }),
                                'downstreams': wd({
                                    "log": ['type', string()],
                                }),
                            },
                            'type': ['type', externalReference("api", "TestSetResult")],
                        }],
                    })
                },
            },
            'implemenation': {}
        }
    }),
    'main': "public"
}
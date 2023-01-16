import * as pr from "pareto-core-raw"
import {
    array,
    boolean,
    dictionary,
    externalReference,
    group,
    member,
    nullType,
    type,
    number,
    reference,
    string,
    taggedUnion,
    types,
    _function,
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"

import {
    reference as ref,
    string as str,
} from "lib-pareto-typescript-project/dist/modules//moduleDefinition/api/shorthands.p"

import * as NAPI from "lib-pareto-typescript-project/dist/modules/moduleDefinition"


const d = pr.wrapRawDictionary

export const api: NAPI.TModuleDefinition = {
    'glossary': {
        'imports': d({
            "diff": "res-pareto-diff",
            //"fs": "res-pareto-filesystem",
            "common": "glo-pareto-common",
        }),
        'namespace': {
            'types': types({
                "Arguments": array(string()),
                "ArgumentError": taggedUnion({
                    "missing": nullType(),
                    "too many": nullType(),
                }),
                "Summary": group({
                    "numberOfTests": member(number()),
                    "numberOfErrors": member(number()),
                }),
                "TestElement": group({
                    "type": member(taggedUnion({
                        "subset": type(reference("TestSet")),
                        "test": type(group({
                            "type": member(taggedUnion({
                                "boolean": type(boolean()),
                                "short string": type(group({
                                    "expected": member(string()),
                                    "actual": member(string()),
                                })),
                                "long string": type(group({
                                    "expected": member(string()),
                                    "actual": member(string()),
                                })),
                                "file string": type(reference("ValidateFileData")),
                            })),
                        })),
                    })),
                }),
                "TestElementResult": group({
                    "type": member(taggedUnion({
                        "subset": type(reference("TestSetResult")),
                        "test": type(group({
                            "success": member(boolean()),
                            "type": member(reference("TestType")),
                        })),
                    }))
                }),
                "TestParameters": group({
                    "testDirectory": member(string()),
                }),
                "TestSet": group({
                    "elements": member(dictionary(reference("TestElement")))
                }),
                "TestSetResult": group({
                    "elements": member(dictionary(reference("TestElementResult")))
                }),
                "TestType": taggedUnion({
                    "boolean": nullType(),
                    "long string": type(group({
                        "parts": member(array(externalReference("diff", "MultilinePart")))
                    })),
                    "short string": type(group({
                        "expected": member(string()),
                        "actual": member(string()),
                    })),
                    "file string": type(group({
                        "fileLocation": member(string()),
                        "parts": member(array(externalReference("diff", "MultilinePart")))
                    })),
                }),
                "ValidateFileData": group({
                    "expectedFile": member(group({
                        "path": member(externalReference("common", "Path")),
                        "fileName": member(string()),
                        "extension": member(string())
                    })),
                    "actual": member(string())
                }),
            }),
            'interfaces': d({}),
        },
        'functions': d({
            "GetTestSet": _function(ref("TestParameters"), ref("TestSet"), true)
        }),
        'callbacks': d({}),
        'pipes': d({}),
    },
    'api': {
        'imports': d({}),
        'algorithms': d({
            "createTestProgram": {
                'definition': ['procedure', ['type', ref("Arguments")]],
                'type': ['constructor', {
                    'configuration data': ['null', null],
                    'dependencies': d({
                        "getTestSet": ['function', {
                            'function': "GetTestSet",
                            'async': true,
                        }],
                        "log": ['procedure', ['type', str()]],
                        "logError": ['procedure', ['type', str()]],
                        "onTestErrors": ['procedure', ['null', null]],
                    }),
                }]
            },

        })
    }
}
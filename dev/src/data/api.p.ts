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
} from "lib-pareto-typescript-project/dist/modules//api/api/shorthands.p"

import * as NAPI from "lib-pareto-typescript-project/dist/modules//api"


const wd = pr.wrapRawDictionary

export const api: NAPI.TModuleDefinition = {
    'glossary': {
        'imports': wd({
            "diff": "res-pareto-diff",
            //"fs": "res-pareto-filesystem",
            "common": "glo-pareto-common",
        }),
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
        'functions': wd({
            "GetTestSet": _function(['reference', "TestParameters"], ['reference', "TestSet"], true)
        }),
        'callbacks': wd({}),
        'interfaces': wd({}),
    },
    'api': {
        'imports': wd({}),
        'algorithms': wd({
            "createTestProgram": ['constructor', {
                'data': ['null', null],
                'dependencies': wd({
                    "getTestSet": {
                        'type': ['function', {
                            'context': ['local', null],
                            'function': "GetTestSet",
                            'async': true,
                        }],
                    },
                    "log": {
                        'type': ['procedure', ['type', str()]],
                    },
                    "logError": {
                        'type': ['procedure', ['type', str()]],
                    },
                    "onTestErrors": {
                        'type': ['procedure', ['null', null]],
                    },
                }),
                'result': {
                    'type': ['procedure', ['type', ref("Arguments")]],
                }
            }]
        })
    }
}
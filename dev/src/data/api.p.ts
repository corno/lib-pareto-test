import * as pr from "pareto-core-raw"
import {
    array,
    boolean,
    dictionary,
    externalReference,
    externalTypeReference,
    group,
    member,
    null_,
    number,
    reference,
    string,
    taggedUnion,
    typeReference,
    types,
    _function,
} from "lib-pareto-typescript-project/dist/modules/glossary/api/shorthands.p"

import {
    reference as ref,
    string as str,
} from "lib-pareto-typescript-project/dist/modules//moduleDefinition/api/shorthands.p"

import * as mmoduleDefinition from "lib-pareto-typescript-project/dist/modules/moduleDefinition"


const d = pr.wrapRawDictionary

export const $: mmoduleDefinition.TModuleDefinition = {
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
                    "missing": null_(),
                    "too many": null_(),
                }),
                "Summary": group({
                    "numberOfTests": member(number()),
                    "numberOfErrors": member(number()),
                }),
                "TestElement": group({
                    "type": member(taggedUnion({
                        "subset": reference("TestSet"),
                        "test": group({
                            "type": member(taggedUnion({
                                "boolean": boolean(),
                                "short string": group({
                                    "expected": member(string()),
                                    "actual": member(string()),
                                }),
                                "long string": group({
                                    "expected": member(string()),
                                    "actual": member(string()),
                                }),
                                "file string": reference("ValidateFileData"),
                            })),
                        }),
                    })),
                }),
                "TestElementResult": group({
                    "type": member(taggedUnion({
                        "subset": reference("TestSetResult"),
                        "test": group({
                            "success": member(boolean()),
                            "type": member(reference("TestType")),
                        }),
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
                    "boolean": null_(),
                    "long string": group({
                        "parts": member(array(externalReference("diff", "MultilinePart")))
                    }),
                    "short string": group({
                        "expected": member(string()),
                        "actual": member(string()),
                    }),
                    "file string": group({
                        "fileLocation": member(string()),
                        "parts": member(array(externalReference("diff", "MultilinePart")))
                    }),
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
            "GetTestSet": _function(typeReference("TestParameters"), typeReference("TestSet"), true)
        }),
        'callbacks': d({}),
        'pipes': d({}),
    },
    'api': {
        'imports': d({
            "common": "glo-pareto-common",
        }),
        'algorithms': d({
            "createTestProgram": {
                'definition': ['procedure', typeReference("Arguments")],
                'type': ['constructor', {
                    'configuration data': null,
                    'dependencies': d({
                        "getTestSet": ['function', {
                            'function': "GetTestSet",
                            'async': true,
                        }],
                        "log": ['procedure', externalTypeReference("common", "String")],
                        "logError": ['procedure', externalTypeReference("common", "String")],
                        "onTestErrors": ['procedure', externalTypeReference("common", "Null")],
                    }),
                }]
            },

        })
    }
}
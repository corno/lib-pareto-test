import * as pr from "pareto-core-raw"
import {
    array,
    boolean,
    dictionary,
    externalReference,
    group,
    member,
    number,
    reference,
    string,
    taggedUnion,
    types,
    _function,
    _null,
} from "../modules/glossary/api/shorthands.p"

import {
    reference as ref,
    string as str,
    _null as nll,
} from "../modules/api/api/shorthands.p"

import * as NAPI from "../modules/api"


const wd = pr.wrapRawDictionary

export const api: NAPI.TModuleDefinition = {
    glossary: {
        'imports': wd({
            "diff": "res-pareto-diff",
            //"fs": "res-pareto-filesystem",
            "common": "glo-pareto-common",
        }),
        'types': types({
            "Arguments": array(string()),
            "ArgumentError": taggedUnion({
                "missing": _null(),
                "too many": _null(),
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
                    })
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
                "boolean": _null(),
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
        'functions': wd({
            "GetTestSet": _function(["reference", "TestParameters"], ["reference", "TestSet"], true)
        }),
        'callbacks': wd({}),
        'interfaces': wd({}),
    },
    api: {
        imports: wd({}),
        algorithms: wd({
            "createTestProgram": ["constructor", {
                data: ["null", null],
                dependencies: wd({
                    "getTestSet": {
                        type: ["function", {
                            context: ["local", null],
                            function: "GetTestSet",
                            async: true,
                        }],
                    },
                    "log": {
                        type: ["procedure", str()],
                    },
                    "logError": {
                        type: ["procedure", str()],
                    },
                    "onTestErrors": {
                        type: ["procedure", nll()],
                    },
                }),
                result: {
                    type: ["procedure", ref("Arguments")],
                }
            }]
        })
    }
}
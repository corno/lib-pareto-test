import * as pr from "pareto-core-raw"
import {
    array,
    boolean,
    dictionary,
    externalReference,
    group,
    number,
    reference,
    string,
    taggedUnion,
    types,
    _function,
    _null,
} from "../glossary/glossary/shorthands.p"

import { NAPI } from "../glossary/api/types.p"


const wd = pr.wrapRawDictionary

export const api: NAPI.ModuleDefinition = {
    glossary: {
        'imports': wd({
            "diff": "res-pareto-diff",
            "fs": "res-pareto-filesystem",
        }),
        'types': types({
            "Arguments": array(string()),
            "ArgumentError": taggedUnion({
                "missing": _null(),
                "too many": _null(),
            }),
            "Summary": group({
                "numberOfTests": number(),
                "numberOfErrors": number(),
            }),
            "TestElement": group({
                "type": taggedUnion({
                    "subset": reference("TestSet"),
                    "test": group({
                        "type": taggedUnion({
                            "boolean": boolean(),
                            "short string": group({
                                "expected": string(),
                                "actual": string(),
                            }),
                            "long string": group({
                                "expected": string(),
                                "actual": string(),
                            }),
                            "file string": reference("ValidateFileData"),
                        }),
                    }),
                }),
            }),
            "TestElementResult": group({
                "type": taggedUnion({
                    "subset": reference("TestSetResult"),
                    "test": group({
                        "success": boolean(),
                        "type": reference("TestType"),
                    })
                })
            }),
            "TestParameters": group({
                "testDirectory": string(),
            }),
            "TestSet": group({
                "elements": dictionary(reference("TestElement"))
            }),
            "TestSetResult": group({
                "elements": dictionary(reference("TestElementResult"))
            }),
            "TestType": taggedUnion({
                "boolean": _null(),
                "long string": group({
                    "parts": array(externalReference("diff", "MultilinePart"))
                }),
                "short string": group({
                    "expected": string(),
                    "actual": string(),
                }),
                "file string": group({
                    "fileLocation": string(),
                    "parts": array(externalReference("diff", "MultilinePart"))
                }),
            }),
            "ValidateFileData": group({
                "expectedFile": group({
                    "path": externalReference("common", "Path"),
                    "fileName": string(),
                    "extension": string()
                }),
                "actual": string()
            }),
        }),
        'procedures': wd({
            "OnTestErrors": {
                data: ["null", null]
            },
            "Log": {
                data: ["string", null]
            },
            "RunProgram": {
                data: ["reference", "Arguments"]
            },
        }),
        'functions': wd({
           "GetTestSet": _function(["reference", "TestParameters"], ["reference", "TestSet"])
        })
    },
    api: wd({
        "createTestProgram": ["constructor", {
            data: ["null", null],
            dependencies: wd({
                "getTestSet": {
                    type: ["function", null],
                    algorithm: "GetTestSet"
                },
                "log": {
                    type: ["procedure", null],
                    algorithm: "Log"
                },
                "logError": {
                    type: ["procedure", null],
                    algorithm: "Log"
                },
                "onTestErrors": {
                    type: ["procedure", null],
                    algorithm: "OnTestErrors"
                },
            }),
            result: {
                type: ["procedure", null],
                algorithm: "RunProgram"
            }
        }]
    })
}
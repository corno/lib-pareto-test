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
} from "../modules/glossary/api/shorthands.p"

import {
    reference as ref,
    string as str,
    _null as nll,
} from "../modules/api/api/shorthands.p"

import* as NAPI from "../modules/api"


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
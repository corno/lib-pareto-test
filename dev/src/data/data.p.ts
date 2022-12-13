import * as pr from "pareto-core-raw"
import { array, boolean, dictionary, externalReference, group, number, reference, string, taggedUnion, types, _null } from "../glossary/shorthands.p"

import { API, Glossary, Project } from "../glossary/types.p"


const wd = pr.wrapRawDictionary


export const foo: Glossary = {
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
                "parts": array(externalReference("MultilinePart", "diff"))
            }),
            "short string": group({
                "expected": string(),
                "actual": string(),
            }),
            "file string": group({
                "fileLocation": string(),
                "parts": array(externalReference("MultilinePart", "diff"))
            }),
        }),
        "ValidateFileData": group({
            "expectedFile": group({
                "path": externalReference("Path", "fs"),
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
        "GetTestSet": {
            "async": false,
            "data": ["reference", "TestParameters"],
            "return value": ["reference", "TestSet"],
        }
    })
}

export const api: API = {
    glossary: foo,
    api: wd({
        "createTestProgram": ["constructor", {
            data: ["null", null],
            dependencies: wd({
                "getTestSet": ["function", "GetTestSet"],
                "log": ["procedure", "Log"],
                "logError": ["procedure", "Log"],
                "onTestErrors": ["procedure", "OnTestErrors"],
            }),
            result: ["procedure", "RunProgram"]
        }]
    })
}

export const data: Project = {
    api: api,
    implementation: {
        "internal api": {
            glossary: {
                'imports': wd({
                }),
                'types': types({
                }),
                'procedures': wd({
                }),
                'functions': wd({
                })
            },
            api: wd({}),
        },
        "implementations": wd({
            "createTestProgram": {
                "type": ["pure", null],
                "definition": ["public", "createTestProgram"]
            }
        }),
        "api mapping": wd({
            "createTestProgram": "createTestProgram"
        }),
    },
}
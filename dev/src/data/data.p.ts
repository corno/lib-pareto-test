import * as pr from "pareto-core-raw"
import { array, boolean, dictionary, group, number, reference, string, taggedUnion, types, _null } from "../glossary/shorthands.p"

import { Glossary } from "../glossary/types.p"


const wd = pr.wrapRawDictionary


export const foo: Glossary = {
    'imports': wd({
        "diff": "res-pareto-diff",
        "fs": "res-pareto-filesystem",
    }),
    'types': types({
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
                "parts": array(reference("MultilinePart", "diff"))
            }),
            "short string": group({
                "expected": string(),
                "actual": string(),
            }),
            "file string": group({
                "fileLocation": string(),
                "parts": array(reference("MultilinePart", "diff"))
            }),
        }),
        "ValidateFileData": group({
            "expectedFile": group({
                "path": reference("Path", "fs"),
                "fileName": string(),
                "extension": string()
            }),
            "actual": string()
        }),
    }),
    'procedures': wd({
        "OnTestErrors": {
            type: _null()
        },
        "Log": {
            type: string()
        },
        "RunProgram": {
            type: array(string())
        },
    }),
    'functions': wd({
        "GetTestSet": {
            "async": false,
            "type": reference("TestParameters"),
            "return type": reference("TestSet"),
        }
    })
}

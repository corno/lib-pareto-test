import * as pr from "pareto-core-raw"
import { array, boolean, dictionary, externalReference, group, number, reference, string, taggedUnion, types, _function, _null } from "../glossary/shorthands.p"

import { API, Glossary, Project } from "../glossary/types.p"


const wd = pr.wrapRawDictionary

export const data: Project = {
    api: {
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
                "GetTestSet": _function(["reference", "TestParameters"], ["reference", "TestSet"])
            })
        },
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
    },
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
                    "Increment": _function(["number", null], ["number", null])
                    //export type AValidateFile = pt.AsyncFunction<TValidateFileData, TTestElementResult>

                    // export type ARunTests = pt.AsyncFunction<TTestSet, TTestSetResult>

                    // export type AReadFile = pt.AsyncFunction<common.TPath, string>


                    // export type FIsZero = pt.Function<number, boolean>

                    // export type FSummarize = pt.Function<TTestSetResult, TSummary>

                    // export type FNegate = pt.Function<number, number>

                    // export type FIncrement = pt.Function<number, number>



                    // export type PUnlink = pt.Procedure<common.TPath>

                    // export type PSerializeTestResult = pt.Procedure<TTestSetResult>

                    // export type PSerializeSummary = pt.Procedure<TSummary>

                    // export type PTest = pt.Procedure<TTestSet>

                    // export type PTest2 = pt.Procedure<TTestParameters>

                    // export type POnArgumentError = pt.Procedure<TArgumentError>

                    // export type PRunTests = pt.Procedure<TTestParameters>

                    // export type PWriteFile = pt.Procedure<{
                    //     path: common.TPath,
                    //     data: string,
                    // }>

                })
            },
            api: wd({}),
        },
        "implementations": wd({
            "createTestProgram": {
                "type": ["pure", null],
                "definition": ["public", null],
                "def": "createTestProgram",
            }
        }),
        "api mapping": wd({
            "createTestProgram": "createTestProgram"
        }),
    },
}
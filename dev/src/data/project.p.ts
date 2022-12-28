import * as pr from "pareto-core-raw"

import { types, _function } from "../glossary/glossary/shorthands.p"
import { string, _null, reference, externalReference } from "../glossary/api/shorthands.p"

import { NProject } from "../glossary/project/types.p"
import { api } from "./api.p"


const wd = pr.wrapRawDictionary

export const project: NProject.Project = {
    "api": api,
    "private definitions": {

        "glossary": {
            'imports': wd({
                "api": "../../api"
            }),
            'types': types({
            }),
            'procedures': wd({
                "OnArgumentError": {
                    data: string()
                },
                "RunTests": {
                    data: externalReference("api", "TestParameters")
                },



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

                // export type POnArgumentError = pt.Procedure<TArgumentError>

                // export type PRunTests = pt.Procedure<TTestParameters>

                // export type PWriteFile = pt.Procedure<{
                //     path: common.TPath,
                //     data: string,
                // }>
            }),
            'functions': wd({
                "Increment": _function(_null(), _null()),

                "ValidateFile": _function(reference("ValidateFileData"), reference("TestElementResult"), true),
                "RunTests": _function(reference("TestSet"), reference("TestSetResult"), true),
                "ReadFile": _function(externalReference("common", "Path"), string(), true),

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


                // export type PWriteFile = pt.Procedure<{
                //     path: common.TPath,
                //     data: string,
                // }>

            })
        },
        "api": wd({}),
    },
    "private implementations": wd({
        "createArgumentsParser": {
            "type": ["binding", null],
            "definition": ["constructor", {
                data: ["null", null],
                dependencies: wd({
                    // onError: ["procedure", "OnArgumentError"],
                    // callback: ["procedure", "RunTests"],
                }),
                result: {
                    type: ["procedure", null],
                    algorithm: "RunProgram"
                }
            }],
        },
        "createFileValidator": {
            "type": ["pure", null],
            "definition": ["constructor", {
                data: ["null", null],
                dependencies: wd({
                    // onError: ["procedure", "OnArgumentError"],
                    // callback: ["procedure", "RunTests"],
                }),
                result: {
                    type: ["procedure", null],
                    algorithm: "XX"
                }
            }],
        },
        // "createSummarizer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createSummarySerializer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTester": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTester2": {
        //     "type": ["binding", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTestParametersParser": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTestProgram": {
        //     "type": ["binding", null],
        //     "scope": ["public", "createTestProgram"],
        // },
        // "createTestResultSerializer": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "createTestsRunner": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
        // "increment": {
        //     "type": ["pure", null],
        //     "scope": ["public", "XX"],
        // },
    }),
    "public implementations": wd({}),


}
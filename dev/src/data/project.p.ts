import * as pr from "pareto-core-raw"

import { types, _function } from "../glossary/glossary/shorthands.p"
import { _null } from "../glossary/api/shorthands.p"

import { NProject } from "../glossary/project/types.p"
import { api } from "./api.p"


const wd = pr.wrapRawDictionary

export const project: NProject.Project = {
    api: api,
    implementation: {
        "internal glossary": {
            'imports': wd({
            }),
            'types': types({
            }),
            'procedures': wd({
            }),
            'functions': wd({
                "Increment": _function(_null(), _null())




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
        "implementations": wd({
            // "createTestProgram": {
            //     "type": ["pure", null],
            //     "definition": ["public", null],
            //     "def": "createTestProgram",
            // }
        }),
        "api mapping": wd({
            "createTestProgram": "createTestProgram"
        }),
    },
}
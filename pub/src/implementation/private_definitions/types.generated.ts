import * as pt from "pareto-core-types"
import * as api from "../../api"

import * as common from "glo-pareto-common"
import { TSummary, TTestSet, TTestSetResult } from "../../api"


export type POnArgumentError = ($: api.TArgumentError) => void

export type PRunTests = ($: api.TTestParameters) => void

export type FIncrement = ($: number) => number

export type AReadFile = pt.AsyncFunction<common.TPath, string>

export type ARunTests = ($: api.TTestSet) => pt.AsyncValue<api.TTestSetResult>

export type AValidateFile = ($: api.TValidateFileData) => pt.AsyncValue<api.TTestElementResult>


export type FSummarize = pt.Function<TTestSetResult, TSummary>

export type FIsZero = pt.Function<number, boolean>

export type PWriteFile = pt.Procedure<{
    path: common.TPath,
    data: string,
}>

export type FNegate = pt.Function<number, number>

export type PSerializeSummary = pt.Procedure<TSummary>
export type PTest = pt.Procedure<TTestSet>

export type PSerializeTestResult = pt.Procedure<TTestSetResult>

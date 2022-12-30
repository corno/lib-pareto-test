import * as pt from "pareto-core-types"

import * as common from "glo-pareto-common"

import { TArgumentError, TTestElementResult, TTestParameters, TTestSet, TTestSetResult, TValidateFileData } from "../../../api"
import { TSummary } from "../types.p"

export type AValidateFile = pt.AsyncFunction<TValidateFileData, TTestElementResult>

export type ARunTests = pt.AsyncFunction<TTestSet, TTestSetResult>

export type AReadFile = pt.AsyncFunction<common.TPath, string>


export type FIsZero = pt.Function<number, boolean>

export type FSummarize = pt.Function<TTestSetResult, TSummary>

export type FNegate = pt.Function<number, number>

export type FIncrement = pt.Function<number, number>



export type PUnlink = pt.Procedure<common.TPath>

export type PSerializeTestResult = pt.Procedure<TTestSetResult>

export type PSerializeSummary = pt.Procedure<TSummary>

export type PTest = pt.Procedure<TTestSet>

export type POnArgumentError = pt.Procedure<TArgumentError>

export type PRunTests = pt.Procedure<TTestParameters>

export type PWriteFile = pt.Procedure<{
    path: common.TPath,
    data: string,
}>

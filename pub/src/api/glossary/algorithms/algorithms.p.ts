import * as pt from "pareto-core-types"

import * as common from "glo-pareto-common"

import { TArgumentError, TSummary, TTestElementResult, TTestParameters, TTestSet, TTestSetResult, TValidateFileData } from "../types/types.p"

export type FValidateFile = pt.AsyncFunction<TValidateFileData, TTestElementResult>

export type FGetTestSet = pt.AsyncFunction<TTestParameters, TTestSet>

export type FRunTests = pt.AsyncFunction<TTestSet, TTestSetResult>

export type FReadFile = pt.AsyncFunction<common.TPath, string>


export type FIsZero = pt.Function<number, boolean>

export type FSummarize = pt.Function<TTestSetResult, TSummary>

export type FNegate = pt.Function<number, number>

export type FIncrement = pt.Function<number, number>

export type IUnlink = pt.Procedure<common.TPath>

export type ISerializeTestResult = pt.Procedure<TTestSetResult>

export type ISerializeSummary = pt.Procedure<TSummary>

export type ITest = pt.Procedure<TTestSet>

export type ITest2 = pt.Procedure<TTestParameters>

export type IRunProgram = pt.Procedure<pt.Array<string>>

export type PLog = pt.Procedure<string>

export type POnTestErrors = pt.Procedure<null>

export type IOnArgumentError = pt.Procedure<TArgumentError>

export type IRunTests = pt.Procedure<TTestParameters>
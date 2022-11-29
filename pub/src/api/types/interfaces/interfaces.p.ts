import * as pt from "pareto-core-types"

import * as fs from "res-pareto-filesystem"

import { TSummary, TTestParameters, TTestSet, TTestSetResult } from "../types/types.p"

export type IWriteFile = pt.Procedure<{
    path: fs.TPath,
    data: string,
}>

export type IUnlink = pt.Procedure<fs.TPath>

export type ISerializeTestResult = pt.Procedure<TTestSetResult>

export type ISerializeSummary = pt.Procedure<TSummary>

export type ITest = pt.Procedure<TTestSet>

export type ITest2 = pt.Procedure<TTestParameters>

export type IRunProgram = pt.Procedure<pt.Array<string>>

export type PLog = pt.Procedure<string>

export type POnTestErrors = pt.Procedure<null>

export type IOnArgumentError = pt.Procedure<
    | ["missing", null]
    | ["too many", null]
>

export type IRunTests = ($: TTestParameters) => void
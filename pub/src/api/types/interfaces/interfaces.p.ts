import * as pt from "pareto-core-types"

import * as fs from "res-pareto-filesystem"

import { TSummary, TTestParameters, TTestSet, TTestSetResult } from "../types/types.p"

export type Interface<T> = ($: T) => void


export type IWriteFile = Interface<{
    path: fs.TPath,
    data: string,
}>

export type IUnlink = Interface<fs.TPath>

export type ISerializeTestResult = Interface<TTestSetResult>

export type ISerializeSummary = Interface<TSummary>

export type ITest = Interface<TTestSet>

export type ITest2 = Interface<TTestParameters>

export type IRunProgram = Interface<pt.Array<string>>

export type PLog = Interface<string>

export type IOnTestErrors = Interface<null>

export type IOnArgumentError = Interface<
    | ["missing", null]
    | ["too many", null]
>

export type IRunTests = ($: TTestParameters) => void
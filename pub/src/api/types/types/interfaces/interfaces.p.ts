import * as pt from "pareto-core-types"

import { TSummary, TTestSet, TTestSetResult } from "../types/types.p"

export type Interface<T> = ($: T) => void



export type ISerializeTestResult = Interface<TTestSetResult>

export type ISerializeSummary = Interface<TSummary>

export type ITest = Interface<TTestSet>

export type IRunProgram = Interface<pt.Array<string>>

export type ILog = Interface<string>
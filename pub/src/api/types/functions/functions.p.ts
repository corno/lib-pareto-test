import * as pt from "pareto-core-types"

import * as fs from "res-pareto-filesystem"

import { TSummary, TTestElementResult, TTestParameters, TTestSet, TTestSetResult, TValidateFileData } from "../types/types.p"

export type Function<In, Out> = ($: In) => Out
export type AsyncFunction<In, Out> = ($: In) => pt.AsyncValue<Out>




export type FValidateFile = AsyncFunction<TValidateFileData, TTestElementResult>

export type FGetTestSet = AsyncFunction<TTestParameters, TTestSet>

export type FRunTests = AsyncFunction<TTestSet, TTestSetResult>

export type FReadFile = AsyncFunction<fs.TPath, string>






export type FIsZero = Function<number, boolean>

export type FSummarize = Function<TTestSetResult, TSummary>

export type FNegate = Function<number, number>

export type FIncrement = Function<number, number>
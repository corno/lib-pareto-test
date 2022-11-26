import * as pt from "pareto-core-types"

import { TSummary, TTestElementResult, TTestSet, TTestSetResult, TValidateFileData } from "../types/types.p"

export type FValidateFile = (
    $: TValidateFileData
) => pt.AsyncValue<TTestElementResult>

export type FGetTestSet = (
    $: {
        readonly "testDirectory": string
    }
) => pt.AsyncValue<TTestSet>

export type FSummarize = (
    $: TTestSetResult,
) => TSummary

export type FRunTests = (
    $: TTestSet,
) => pt.AsyncValue<TTestSetResult>


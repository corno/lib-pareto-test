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

export type FTest = (
    $: TTestSet,
    $i: {
        out: ($: string) => void
        onTestErrors: ($: null) => void
    }
) => void

export type FSerializeSummary = (
    $: {
        readonly "summary": TSummary,
    },
    $i: {
        readonly "log": ($: string) => void
    },
) => void


export type FSummarize = (
    $: TTestSetResult,
) => TSummary


export type FSerializeTestResult = (
    $: {
        readonly "testResult": TTestSetResult,
    },
    $i: {
        readonly "log": ($: string) => void
    },
) => void


export type FRunTests = (
    $: TTestSet,
) => pt.AsyncValue<TTestSetResult>


export type FParseArguments = (
    $: pt.Array<string>,
    $i: {
        onMissing: () => void
        onTooMany: () => void
        callback: ($: string) => void
    }
) => void
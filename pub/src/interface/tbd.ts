import * as pt from "pareto-core-types"

import { TSummary } from "./types/Summary"
import { TTestSetResult, TTestSet } from "./types/TestResult"

import * as diff from "api-pareto-diff"


// export type SerializeTestResult = (
//     $: {
//         testResult: TTestResult,
//         showSummary: boolean,
//     },
//     $i: {
//         log: (str: string) => void
//     },
// ) => void

// export type Summarize = (
//     $: TTestResult
// ) => TSummary

export type RunTests = (
    $: {
        testSet: TTestSet
    },
    $i: {
        onDone: ($: TTestSetResult) => void
    },
    $d: {
        startAsync: ($: pt.AsyncNonValue) => void
        diffData: diff.DiffData
    }
) => pt.AsyncNonValue
import * as pt from "pareto-core-types"

import { TSummary } from "./types/Summary"
import { TTestSetResult, TTestSet } from "./types/TestResult"

import * as diff from "api-pareto-diff"

import * as hfs from "api-pareto-handledfilesystem"


export type SerializeTestResult = (
    $: {
        testResult: TTestSetResult,
        showSummary: boolean,
    },
    $i: {
        log: (str: string) => void
    },
) => void

export type Summarize = (
    $: TTestSetResult
) => TSummary

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
        validateFile: ValidateFileDependencies
    }
) => pt.AsyncNonValue

export type ValidateFileDependencies = {
    file: hfs.File
    writeFile: hfs.WriteFile
    unlink: hfs.Unlink
    startAsync: ($: pt.AsyncNonValue) => void
    diffData: diff.DiffData
}
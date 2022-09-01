import * as pt from "pareto-core-types"

import * as diff from "api-pareto-diff"
import * as fs from "api-pareto-filesystem"
import * as fsLib from "lib-pareto-filesystem"
import * as main from "api-pareto-main"


import { TSummary } from "./types/Summary"
import { TTestSetResult, TTestSet } from "./types/TestResult"



export type SerializeTestResult = (
    $: {
        testResult: TTestSetResult,
    },
    $i: {
        log: (str: string) => void
    },
) => void

export type SerializeSummary = (
    $: {
        summary: TSummary,
    },
    $i: {
        log: (str: string) => void
    },
) => void

export type Summarize = (
    $: TTestSetResult
) => TSummary

export type DiffDependencies = {
    diffData: diff.DiffData
    stringsAreEqual: diff.StringsAreEqual
}

export type RunTestsDependencies = {
    fs: HandledFileSystemDependencies
    diff: DiffDependencies
}

export type RunTests = (
    $: {
        testSet: TTestSet
    },
    $d: {
        rtd: RunTestsDependencies
        startAsync: ($: pt.AsyncNonValue) => void
    }
) => pt.AsyncValue<TTestSetResult>

export type HandledFileSystemDependencies = {
    readFile: fsLib.ReadFileOrAbort
    writeFile: fsLib.WriteFileFireAndForget
    unlink: fsLib.UnlinkFireAndForget
}

export type CreateTester = (
    $d: {
        getTestSet: (
            $: {
                testDirectory: string
            }
        ) => pt.AsyncValue<TTestSet>,
        fs: {
            readFile: fs.ReadFile
            writeFile: fs.WriteFile
            unlink: fs.Unlink
        },
        diff: {
            diffData: diff.DiffData
            stringsAreEqual: diff.StringsAreEqual
        }
    }
) => main.ProgramMain
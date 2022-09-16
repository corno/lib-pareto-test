import * as pt from "pareto-core-types"

import * as diff from "api-pareto-diff"
import * as fs from "api-pareto-filesystem"
import * as arithmetic from "api-pareto-arithmetic"
import * as collation from "api-pareto-collation"
import * as bool from "api-pareto-boolean"
import * as main from "api-pareto-main"


import { TSummary } from "../types/Summary"
import { TTestSetResult, TTestSet } from "../types/TestResult"
import { DRunTestsDependencies } from "../dependencies/x"




export type PSerializeTestResult = (
    $: {
        readonly "testResult": TTestSetResult,
    },
    $i: {
        readonly "log": ($: string) => void
    },
    $d: {
        readonly "isYinBeforeYang": collation.FIsYinBeforeYang
    }
) => void

export type PSerializeSummary = (
    $: {
        readonly "summary": TSummary,
    },
    $i: {
        readonly "log": ($: string) => void
    },
    $d: {
        readonly "isZero": bool.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negative": arithmetic.FNegative
    }
) => void

export type FSummarize = (
    $: TTestSetResult,
    $d: {
        readonly "increment": ($: number) => number
    },
) => TSummary

export type FRunTests = (
    $: {
        readonly "testSet": TTestSet
    },
    $d: {
        readonly "rtd": DRunTestsDependencies
    },
    $a: pt.ProcessAsyncValue
) => pt.AsyncValue<TTestSetResult>

export type FGetTestSet = (
    $: {
        readonly "testDirectory": string
    },
) => pt.AsyncValue<TTestSet>

export type FCreateTester = (
    $d: {
        readonly "getTestSet": FGetTestSet,
        readonly "fs": {
            readonly "readFile": fs.FReadFile
            readonly "writeFile": fs.FWriteFile
            readonly "unlink": fs.FUnlink
        },
        readonly "diff": {
            readonly "diffData": diff.FDiffData
            readonly "stringsAreEqual": diff.FStringsAreEqual
        },
        readonly "isZero": bool.FIsZero,
        readonly "add": arithmetic.FAdd,
        readonly "negative": arithmetic.FNegative,
        readonly "isYinBeforeYang": collation.FIsYinBeforeYang,
        readonly "increment": ($: number) => number
    },
    $a: pt.ProcessAsyncValue
) => main.PProgramMain
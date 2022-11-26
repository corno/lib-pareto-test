import * as pt from "pareto-core-types"

import * as diff from "glo-pareto-diff"
// import * as fs from "api-pareto-filesystem"
import * as arithmetic from "glo-pareto-arithmetic"
// import * as collation from "api-pareto-collation"
// import * as bool from "api-pareto-boolean"

import * as bound from "./types"
import { FGetTestSet, TTestSet } from "./types"

export type CCreateTestResultSerializer = (
    $i: {
        readonly "log": bound.ILog
    },
    $d: {
        readonly "sortedForEach": <T>(
            $: pt.Dictionary<T>,
            $i: ($: {
                key: string,
                value: T,
            }) => void
        ) => void
    }
) => bound.ISerializeTestResult

export type CCreateSummarizer = (
    $i: {
        readonly "log": bound.ILog
    },
    $d: {
        readonly "increment": ($: number) => number
    },
) => bound.FSummarize

export type CCreateTestRunner = (
    $d: {
        readonly validateFile: bound.FValidateFile,


        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
) => bound.FRunTests


export type CCreateTester = (
    $i: {
        onTestErrors: ($: null) => void
        readonly "serializeTestResult": bound.ISerializeTestResult
        readonly "serializeSummary": bound.ISerializeSummary
    },
    $d: {
        readonly "runTests": bound.FRunTests
        readonly "isZero": ($: number) => boolean,
        readonly "summarize": bound.FSummarize
    },
    $a: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void
) => bound.ITest

export type CCreateFileValidator = (
    $i: {
        readonly "writeFile": ($: {
            path: bound.TPath,
            data: string,
        }) => void
        readonly "unlink": ($: bound.TPath) => void
    },
    $d: {
        readonly "readFile": ($: bound.TPath) => pt.AsyncValue<string>
        diffData: diff.FDiffData,
    },
) => bound.FValidateFile


export type CCreateSummarySerializer = (
    $i: {
        readonly "log": bound.ILog
    },
    $d: {
        readonly "isZero": ($: number) => boolean
        readonly "add": arithmetic.FAdd
        readonly "negative": ($: number) => number
    }
) => bound.ISerializeSummary


export type CCreateArgumentsParser = (
    $i: {
        onMissing: () => void
        onTooMany: () => void
        callback: ($: string) => void
    }
) => bound.IRunProgram



export type CCreateTestProgram = (
    $f: {
        getTestSet: FGetTestSet
    }
) => bound.IRunProgram
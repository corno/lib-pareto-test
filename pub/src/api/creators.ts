import * as pt from "pareto-core-types"

import * as diff from "glo-pareto-diff"
import * as fs from "lib-pareto-filesystem"
import * as arithmetic from "glo-pareto-arithmetic"
// import * as collation from "api-pareto-collation"
// import * as bool from "api-pareto-boolean"

import * as bound from "./types"

export type ProcessAsyncValue = <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void

export type CCreateTestResultSerializer = (
    $i: {
        readonly "log": bound.ILog
    },
    $f: {
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
    $f: {
        readonly "increment": bound.FIncrement
    },
) => bound.FSummarize

export type CCreateTestRunner = (
    $f: {
        readonly "validateFile": bound.FValidateFile,
        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
) => bound.FRunTests


export type CCreateTester = (
    $i: {
        readonly "onTestErrors": bound.IOnTestErrors
        readonly "serializeTestResult": bound.ISerializeTestResult
        readonly "serializeSummary": bound.ISerializeSummary
    },
    $f: {
        readonly "runTests": bound.FRunTests
        readonly "isZero": bound.FIsZero,
        readonly "summarize": bound.FSummarize
    },
    $a: ProcessAsyncValue
) => bound.ITest

export type CCreateFileValidator = (
    $i: {
        readonly "writeFile": bound.IWriteFile
        readonly "unlink": fs.FUnlinkFireAndForget
    },
    $f: {
        readonly "readFile": bound.FReadFile
        readonly "diffData": diff.FDiffData,
    },
) => bound.FValidateFile


export type CCreateSummarySerializer = (
    $i: {
        readonly "log": bound.ILog
    },
    $f: {
        readonly "isZero": bound.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negate": bound.FNegate
    }
) => bound.ISerializeSummary


export type CCreateTestParametersParser = (
    $i: {
        readonly "onError": bound.IOnArgumentError
        readonly "callback": bound.ITest2
    }
) => bound.IRunProgram



export type CCreateTestProgram = (
    $f: {
        readonly "getTestSet": bound.FGetTestSet
    }
) => bound.IRunProgram
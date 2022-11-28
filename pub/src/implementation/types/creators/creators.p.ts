import * as pt from "pareto-core-types"

import * as diff from "res-pareto-diff"
import * as fs from "lib-pareto-filesystem"
import * as arithmetic from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
// import * as bool from "api-pareto-boolean"

import * as api from "../../../api"

export type ProcessAsyncValue = <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void

export type CCreateTestResultSerializer = (
    $d: {
        readonly "log": api.PLog
        readonly "isABeforeB": collation.FIsABeforeB
    },
) => api.ISerializeTestResult

export type CCreateSummarizer = (
    $i: {
        readonly "log": api.PLog
    },
    $f: {
        readonly "increment": api.FIncrement
    },
) => api.FSummarize

export type CCreateTestRunner = (
    $f: {
        readonly "validateFile": api.FValidateFile,
        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
) => api.FRunTests


export type CCreateTester = (
    $i: {
        readonly "onTestErrors": api.IOnTestErrors
        readonly "serializeTestResult": api.ISerializeTestResult
        readonly "serializeSummary": api.ISerializeSummary
    },
    $f: {
        readonly "runTests": api.FRunTests
        readonly "isZero": api.FIsZero,
        readonly "summarize": api.FSummarize
    },
    $a: ProcessAsyncValue
) => api.ITest

export type CCreateFileValidator = (
    $i: {
        readonly "writeFile": api.IWriteFile
        readonly "unlink": fs.PUnlinkFireAndForget
    },
    $f: {
        readonly "readFile": api.FReadFile
        readonly "diffData": diff.FDiffData,
    },
) => api.FValidateFile


export type CCreateSummarySerializer = (
    $d: {
        readonly "log": api.PLog
        readonly "isZero": api.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negate": api.FNegate
    }
) => api.ISerializeSummary


export type CCreateTestParametersParser = (
    $i: {
        readonly "onError": api.IOnArgumentError
        readonly "callback": api.ITest2
    }
) => api.IRunProgram



import * as pt from "pareto-core-types"

import * as diff from "glo-pareto-diff"
// import * as fs from "api-pareto-filesystem"
import * as arithmetic from "glo-pareto-arithmetic"
// import * as collation from "api-pareto-collation"
// import * as bool from "api-pareto-boolean"

import * as bound from "./types"

export type FCreateTestResultSerializer = (
    $d: {
        readonly "sortedForEach": <T>(
            $: pt.Dictionary<T>,
            $i: ($: {
                key: string,
                value: T,
            }) => void
        ) => void
    }
) => bound.FSerializeTestResult

export type FCreateSummarizer = (
    $d: {
        readonly "increment": ($: number) => number
    },
) => bound.FSummarize

export type FCreateTestRunner = (
    $d: {
        readonly validateFile: bound.FValidateFile,


        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
) => bound.FRunTests


export type FCreateTester = (
    $d: {
        readonly "runTests": bound.FRunTests
        readonly "isZero": ($: number) => boolean,
        readonly "summarize": bound.FSummarize
        readonly "serializeTestResult": bound.FSerializeTestResult
        readonly "serializeSummary": bound.FSerializeSummary
    },
    $a: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void
) => bound.FTest

export type FCreateFileValidator = (
    $d: {
        readonly "readFile": ($: bound.TPath) => pt.AsyncValue<string>
        readonly "writeFile": ($: {
            path: bound.TPath,
            data: string,
        }) => void
        readonly "unlink": ($: bound.TPath) => void
        diffData: diff.FDiffData,
    },
) => bound.FValidateFile


export type FCreateSummarySerializer = (
    $d: {
        readonly "isZero": ($: number) => boolean
        readonly "add": arithmetic.FAdd
        readonly "negative": ($: number) => number
    }
) => bound.FSerializeSummary
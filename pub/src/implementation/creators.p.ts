import * as pt from "pareto-core-types"

import * as diff from "res-pareto-diff"
import * as fs from "lib-pareto-filesystem"
import * as arithmetic from "res-pareto-arithmetic"
import * as collation from "res-pareto-collation"
// import * as bool from "api-pareto-boolean"

import * as api from "../api"
import * as glo from "./glossary/algorithms/algorithms.p"



export type AsyncProcessingCreator<Dependencies, Algorithm> = (
    $d: Dependencies,
    $a: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void
) => Algorithm

export type CCreateTestResultSerializer = pt.Creator<
    {
        readonly "log": api.PLog
        readonly "isABeforeB": collation.FIsABeforeB
    },
    glo.PSerializeTestResult
>

export type CCreateSummarizer = pt.Creator<
    {
        readonly "log": api.PLog
        readonly "increment": glo.FIncrement
    },
    glo.FSummarize
>

export type CCreateTestRunner = pt.Creator<
    {
        readonly "validateFile": glo.AValidateFile,
        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
    glo.ARunTests
>

export type CCreateTester = AsyncProcessingCreator<
    {
        readonly "onTestErrors": api.POnTestErrors
        readonly "serializeTestResult": glo.PSerializeTestResult
        readonly "serializeSummary": glo.PSerializeSummary
        readonly "runTests": glo.ARunTests
        readonly "isZero": glo.FIsZero,
        readonly "summarize": glo.FSummarize
    },
    glo.PTest
>

export type CCreateFileValidator = pt.Creator<
    {
        readonly "writeFile": glo.PWriteFile
        readonly "unlink": fs.PUnlinkFireAndForget
        readonly "readFile": glo.AReadFile
        readonly "diffData": diff.FDiffData,
    },
    glo.AValidateFile
>

export type CCreateSummarySerializer = pt.Creator<
    {
        readonly "log": api.PLog
        readonly "isZero": glo.FIsZero
        readonly "add": arithmetic.FAdd
        readonly "negate": glo.FNegate
    },
    glo.PSerializeSummary
>

export type CCreateTestParametersParser = pt.Creator<
    {
        readonly "onError": glo.POnArgumentError
        readonly "callback": glo.PTest2
    },
    api.IRunProgram
>


export type CCreateArgumentsParser = pt.Creator<
    {
        onError: ($: string) => void
        callback: ($: api.TTestParameters) => void
    },
    api.IRunProgram
>

export type CCreateTester2 = pt.Creator<
    {
        onError: ($: string) => void
        log: ($: string) => void
        onTestErrors: ($: null) => void
    },
    glo.PTest
>
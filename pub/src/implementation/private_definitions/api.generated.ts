import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mapi from "../../api"
import * as marithmetic from "res-pareto-arithmetic"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"

export type CCreateArgumentsParser = ($: null, $d: {
    readonly "callback": pt.Procedure<mapi.TTestParameters>
    readonly "onError": pt.Procedure<string>
}) => pt.Procedure<mapi.TArguments>

export type CCreateFileValidator = ($: null, $d: {
    readonly "diffData": mdiff.FDiffData
    readonly "readFile": glo.AReadFile
    readonly "unlink": pt.Procedure<mfs.TUnlink_Data>
    readonly "writeFile": pt.Procedure<glo.TWriteFileData>
}) => glo.AValidateFile

export type CCreateSummarizer = ($: null, $d: {
    readonly "increment": glo.FIncrement
    readonly "log": pt.Procedure<string>
}) => glo.FSummarize

export type CCreateSummarySerializer = ($: null, $d: {
    readonly "add": marithmetic.FAdd
    readonly "isZero": glo.FIsZero
    readonly "log": pt.Procedure<string>
    readonly "negate": glo.FNegate
}) => pt.Procedure<mapi.TSummary>


///////////////////////////////////

export type CCreateTestParametersParser = pt.Creator<
    {
        readonly "onError": POnArgumentError
        readonly "callback": PRunTests
    },
    pt.Procedure<api.TArguments>
>



export type POnArgumentError = ($: api.TArgumentError) => void

export type PRunTests = ($: api.TTestParameters) => void

export type PSerializeSummary = ($: api.TSummary) => void

export type PSerializeTestResult = ($: api.TTestSetResult) => void

export type PTest = ($: api.TTestSet) => void

export type PWriteFile = ($: glo.TWriteFileData) => void

export type AsyncProcessingCreator<Dependencies, Algorithm> = (
    $d: Dependencies,
    $a: <T>($: pt.AsyncValue<T>, $i: ($: T) => void) => void
) => Algorithm

import * as api from "../../api"

export type CCreateTestRunner = pt.Creator<
    {
        readonly "validateFile": glo.AValidateFile,
        readonly "diffData": diff.FDiffData
        readonly "stringsAreEqual": diff.FStringsAreEqual

    },
    glo.ARunTests
>

import * as diff from "res-pareto-diff"
import * as collation from "res-pareto-collation"

export type CCreateTester2 = pt.Creator<
    {
        onError: ($: string) => void
        log: ($: string) => void
        onTestErrors: ($: null) => void
    },
    PTest
>


export type CCreateTestResultSerializer = pt.Creator<
    {
        readonly "log": pt.Procedure<string>
        readonly "isABeforeB": collation.FIsABeforeB
    },
    PSerializeTestResult
>


export type CCreateTester = AsyncProcessingCreator<
    {
        readonly "onTestErrors": pt.Procedure<null>
        readonly "serializeTestResult": PSerializeTestResult
        readonly "serializeSummary": PSerializeSummary
        readonly "runTests": glo.ARunTests
        readonly "isZero": glo.FIsZero,
        readonly "summarize": glo.FSummarize
    },
    PTest
>
export type API2 = {}
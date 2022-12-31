import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mapi from "../../api"
import * as marithmetic from "res-pareto-arithmetic"
import * as mcollation from "res-pareto-collation"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"

export type CCreateArgumentsParser = ($: null, $d: {
    readonly "callback": pt.Procedure<mapi.TTestParameters>
    readonly "onError": pt.Procedure<string>
}) => pt.Procedure<mapi.TArguments>

export type CCreateBoundTester = ($: null, $d: {
    readonly "log": pt.Procedure<string>
    readonly "onError": pt.Procedure<string>
    readonly "onTestErrors": pt.Procedure<null>
}) => pt.Procedure<mapi.TTestSet>

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

export type CCreateTester = ($: null, $d: {
    readonly "isZero": glo.FIsZero
    readonly "onTestErrors": pt.Procedure<null>
    readonly "runTests": glo.ARunTests
    readonly "serializeSummary": pt.Procedure<mapi.TSummary>
    readonly "serializeTestResult": pt.Procedure<mapi.TTestSetResult>
    readonly "summarize": glo.FSummarize
}) => pt.Procedure<mapi.TTestSet>

export type CCreateTestParametersParser = ($: null, $d: {
    readonly "callback": pt.Procedure<mapi.TTestParameters>
    readonly "onError": pt.Procedure<mapi.TArgumentError>
}) => pt.Procedure<mapi.TArguments>

export type CCreateTestResultSerializer = ($: null, $d: {
    readonly "isABeforeB": mcollation.FIsABeforeB
    readonly "log": pt.Procedure<string>
}) => pt.Procedure<mapi.TTestSetResult>

export type CCreateTestRunner = ($: null, $d: {
    readonly "diffData": mdiff.FDiffData
    readonly "stringsAreEqual": mdiff.FStringsAreEqual
    readonly "validateFile": glo.AValidateFile
}) => glo.ARunTests

export type API2 = {
    CreateArgumentsParser: CCreateArgumentsParser
    CreateBoundTester: CCreateBoundTester
    CreateFileValidator: CCreateFileValidator
    CreateSummarizer: CCreateSummarizer
    CreateSummarySerializer: CCreateSummarySerializer
    CreateTester: CCreateTester
    CreateTestParametersParser: CCreateTestParametersParser
    CreateTestResultSerializer: CCreateTestResultSerializer
    CreateTestRunner: CCreateTestRunner
}
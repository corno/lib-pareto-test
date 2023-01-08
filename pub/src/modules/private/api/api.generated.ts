import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mapi from "../../public"
import * as marithmetic from "res-pareto-arithmetic"
import * as mcollation from "res-pareto-collation"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"

export type CcreateArgumentsParser = ($d: {
    readonly "callback": pt.Procedure<mapi.TTestParameters>
    readonly "onError": pt.Procedure<string>
}) => pt.Procedure<mapi.TArguments>

export type CcreateBoundTester = ($d: {
    readonly "log": pt.Procedure<string>
    readonly "onError": pt.Procedure<string>
    readonly "onTestErrors": pt.Procedure<null>
}) => pt.Procedure<mapi.TTestSet>

export type CcreateFileValidator = ($d: {
    readonly "diffData": mdiff.FDiffData
    readonly "readFile": glo.AReadFile
    readonly "unlink": pt.Procedure<mfs.TUnlink_Data>
    readonly "writeFile": pt.Procedure<glo.TWriteFileData>
}) => glo.AValidateFile

export type CcreateSummarizer = ($d: {
    readonly "increment": glo.FIncrement
    readonly "log": pt.Procedure<string>
}) => glo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly "add": marithmetic.FAdd
    readonly "isZero": glo.FIsZero
    readonly "log": pt.Procedure<string>
    readonly "negate": glo.FNegate
}) => pt.Procedure<mapi.TSummary>

export type CcreateTester = ($d: {
    readonly "isZero": glo.FIsZero
    readonly "onTestErrors": pt.Procedure<null>
    readonly "runTests": glo.ARunTests
    readonly "serializeSummary": pt.Procedure<mapi.TSummary>
    readonly "serializeTestResult": pt.Procedure<mapi.TTestSetResult>
    readonly "summarize": glo.FSummarize
}) => pt.Procedure<mapi.TTestSet>

export type CcreateTestParametersParser = ($d: {
    readonly "callback": pt.Procedure<mapi.TTestParameters>
    readonly "onError": pt.Procedure<mapi.TArgumentError>
}) => pt.Procedure<mapi.TArguments>

export type CcreateTestResultSerializer = ($d: {
    readonly "isABeforeB": mcollation.FIsABeforeB
    readonly "log": pt.Procedure<string>
}) => pt.Procedure<mapi.TTestSetResult>

export type CcreateTestRunner = ($d: {
    readonly "diffData": mdiff.FDiffData
    readonly "stringsAreEqual": mdiff.FStringsAreEqual
    readonly "validateFile": glo.AValidateFile
}) => glo.ARunTests

export type API = {
    createArgumentsParser: CcreateArgumentsParser
    createBoundTester: CcreateBoundTester
    createFileValidator: CcreateFileValidator
    createSummarizer: CcreateSummarizer
    createSummarySerializer: CcreateSummarySerializer
    createTester: CcreateTester
    createTestParametersParser: CcreateTestParametersParser
    createTestResultSerializer: CcreateTestResultSerializer
    createTestRunner: CcreateTestRunner
}
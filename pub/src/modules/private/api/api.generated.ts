import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mapi from "../../public"
import * as marithmetic from "res-pareto-arithmetic"
import * as mboolean from "res-pareto-boolean"
import * as mcollation from "res-pareto-collation"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"

export type CcreateArgumentsParser = ($d: {
    readonly "dcallback": pt.Procedure<mapi.TTestParameters>
    readonly "donError": pt.Procedure<string>
}) => pt.Procedure<mapi.TArguments>

export type CcreateBoundTester = ($d: {
    readonly "dlog": pt.Procedure<string>
    readonly "donError": pt.Procedure<string>
    readonly "donTestErrors": pt.Procedure<null>
}) => pt.Procedure<mapi.TTestSet>

export type CcreateFileValidator = ($d: {
    readonly "fdiffData": mdiff.FDiffData
    readonly "freadFile": glo.AReadFile
    readonly "seunlink": pt.Procedure<mfs.TUnlink_Data>
    readonly "sewriteFile": pt.Procedure<glo.TWriteFileData>
}) => glo.AValidateFile

export type CcreateSummarizer = ($d: {
    readonly "fincrement": glo.FIncrement
}) => glo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly "fadd": marithmetic.FAdd
    readonly "fisZero": mboolean.FIsZero
    readonly "fnegate": marithmetic.FNegate
    readonly "dlog": pt.Procedure<string>
}) => pt.Procedure<mapi.TSummary>

export type CcreateTester = ($d: {
    readonly "fisZero": mboolean.FIsZero
    readonly "frunTests": glo.ARunTests
    readonly "fsummarize": glo.FSummarize
    readonly "donTestErrors": pt.Procedure<null>
    readonly "dserializeSummary": pt.Procedure<mapi.TSummary>
    readonly "dserializeTestResult": pt.Procedure<mapi.TTestSetResult>
}) => pt.Procedure<mapi.TTestSet>

export type CcreateTestParametersParser = ($d: {
    readonly "dcallback": pt.Procedure<mapi.TTestParameters>
    readonly "donError": pt.Procedure<mapi.TArgumentError>
}) => pt.Procedure<mapi.TArguments>

export type CcreateTestResultSerializer = ($d: {
    readonly "fisABeforeB": mcollation.FIsABeforeB
    readonly "dlog": pt.Procedure<string>
}) => pt.Procedure<mapi.TTestSetResult>

export type CcreateTestRunner = ($d: {
    readonly "fdiffData": mdiff.FDiffData
    readonly "fstringsAreEqual": mdiff.FStringsAreEqual
    readonly "fvalidateFile": glo.AValidateFile
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
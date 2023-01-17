import * as pt from 'pareto-core-types'

import * as glo from "./types.generated"

import * as marithmetic from "res-pareto-arithmetic"
import * as mboolean from "res-pareto-boolean"
import * as mcollation from "res-pareto-collation"
import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"
import * as mpublic from "../../public"

export type CcreateArgumentsParser = ($d: {
    readonly 'pr_callback': pt.Procedure<mpublic.TTestParameters>
    readonly 'pr_onError': pt.Procedure<mcommon.TString>
}) => pt.Procedure<mpublic.TArguments>

export type CcreateBoundTester = ($d: {
    readonly 'pr_log': pt.Procedure<mcommon.TString>
    readonly 'pr_onError': pt.Procedure<mcommon.TString>
    readonly 'pr_onTestErrors': pt.Procedure<mcommon.TNull>
}) => pt.Procedure<mpublic.TTestSet>

export type CcreateFileValidator = ($d: {
    readonly 'sf_diffData': mdiff.FDiffData
    readonly 'af_readFile': glo.AReadFile
    readonly 'pr_unlink': pt.Procedure<mfs.TUnlink_Data>
    readonly 'pr_writeFile': pt.Procedure<glo.TWriteFileData>
}) => glo.AValidateFile

export type CcreateSummarizer = ($d: {
    readonly 'sf_increment': glo.FIncrement
}) => glo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly 'sf_add': marithmetic.FAdd
    readonly 'sf_isZero': mboolean.FIsZero
    readonly 'pr_log': pt.Procedure<mcommon.TString>
    readonly 'sf_negate': marithmetic.FNegate
}) => pt.Procedure<mpublic.TSummary>

export type CcreateTester = ($d: {
    readonly 'sf_isZero': mboolean.FIsZero
    readonly 'pr_onTestErrors': pt.Procedure<mcommon.TNull>
    readonly 'af_runTests': glo.ARunTests
    readonly 'pr_serializeSummary': pt.Procedure<mpublic.TSummary>
    readonly 'pr_serializeTestResult': pt.Procedure<mpublic.TTestSetResult>
    readonly 'sf_summarize': glo.FSummarize
}) => pt.Procedure<mpublic.TTestSet>

export type CcreateTestParametersParser = ($d: {
    readonly 'pr_callback': pt.Procedure<mpublic.TTestParameters>
    readonly 'pr_onError': pt.Procedure<mpublic.TArgumentError>
}) => pt.Procedure<mpublic.TArguments>

export type CcreateTestResultSerializer = ($d: {
    readonly 'sf_isABeforeB': mcollation.FIsABeforeB
    readonly 'pr_log': pt.Procedure<mcommon.TString>
}) => pt.Procedure<mpublic.TTestSetResult>

export type CcreateTestRunner = ($d: {
    readonly 'sf_diffData': mdiff.FDiffData
    readonly 'sf_stringsAreEqual': mdiff.FStringsAreEqual
    readonly 'af_validateFile': glo.AValidateFile
}) => glo.ARunTests

export type Cincrement = glo.FIncrement

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
    increment: Cincrement
}
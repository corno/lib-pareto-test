import * as pt from "pareto-core-types"

import * as glo from "./types.generated"

import * as mapi from "../../public"
import * as marithmetic from "res-pareto-arithmetic"
import * as mboolean from "res-pareto-boolean"
import * as mcollation from "res-pareto-collation"
import * as mdiff from "res-pareto-diff"
import * as mfs from "res-pareto-filesystem"

export type CcreateArgumentsParser = ($d: {
    readonly "pr_callback": pt.Procedure<mapi.TTestParameters>
    readonly "pr_onError": pt.Procedure<string>
}) => pt.Procedure<mapi.TArguments>

export type CcreateBoundTester = ($d: {
    readonly "pr_log": pt.Procedure<string>
    readonly "pr_onError": pt.Procedure<string>
    readonly "pr_onTestErrors": pt.Procedure<null>
}) => pt.Procedure<mapi.TTestSet>

export type CcreateFileValidator = ($d: {
    readonly "sf_diffData": mdiff.FDiffData
    readonly "af_readFile": glo.AReadFile
    readonly "pr_unlink": pt.Procedure<mfs.TUnlink_Data>
    readonly "pr_writeFile": pt.Procedure<glo.TWriteFileData>
}) => glo.AValidateFile

export type CcreateSummarizer = ($d: {
    readonly "sf_increment": glo.FIncrement
}) => glo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly "sf_add": marithmetic.FAdd
    readonly "sf_isZero": mboolean.FIsZero
    readonly "pr_log": pt.Procedure<string>
    readonly "sf_negate": marithmetic.FNegate
}) => pt.Procedure<mapi.TSummary>

export type CcreateTester = ($d: {
    readonly "sf_isZero": mboolean.FIsZero
    readonly "pr_onTestErrors": pt.Procedure<null>
    readonly "af_runTests": glo.ARunTests
    readonly "pr_serializeSummary": pt.Procedure<mapi.TSummary>
    readonly "pr_serializeTestResult": pt.Procedure<mapi.TTestSetResult>
    readonly "sf_summarize": glo.FSummarize
}) => pt.Procedure<mapi.TTestSet>

export type CcreateTestParametersParser = ($d: {
    readonly "pr_callback": pt.Procedure<mapi.TTestParameters>
    readonly "pr_onError": pt.Procedure<mapi.TArgumentError>
}) => pt.Procedure<mapi.TArguments>

export type CcreateTestResultSerializer = ($d: {
    readonly "sf_isABeforeB": mcollation.FIsABeforeB
    readonly "pr_log": pt.Procedure<string>
}) => pt.Procedure<mapi.TTestSetResult>

export type CcreateTestRunner = ($d: {
    readonly "sf_diffData": mdiff.FDiffData
    readonly "sf_stringsAreEqual": mdiff.FStringsAreEqual
    readonly "af_validateFile": glo.AValidateFile
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
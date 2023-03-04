import * as pt from 'pareto-core-types'

import * as garithmetic from "res-pareto-arithmetic"
import * as gboolean from "res-pareto-boolean"
import * as gcollation from "res-pareto-collation"
import * as gcommon from "glo-pareto-common"
import * as gdiff from "res-pareto-diff"
import * as gfs from "lib-pareto-filesystem"
import * as gthis from "./glossary"

export type CcreateBoundTester = ($d: {
    readonly 'log': gcommon.FLog
    readonly 'onError': gcommon.FLog
    readonly 'onTestErrors': gcommon.FSignal
}) => gthis.FTestTestSet

export type CcreateFileValidator = ($d: {
    readonly 'diffData': gdiff.FDiffData
    readonly 'readFile': gthis.FReadFile
    readonly 'unlink': gfs.FUnlinkFireAndForget
    readonly 'writeFile': gfs.FWriteFile
}) => gthis.FValidateFile

export type CcreateSummarizer = ($d: {
    readonly 'increment': gthis.FIncrement
}) => gthis.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly 'add': garithmetic.FAdd
    readonly 'isZero': gboolean.FIsZero
    readonly 'log': gcommon.FLog
    readonly 'negate': garithmetic.FNegate
}) => gthis.FSerializeSummary

export type CcreateTester = ($d: {
    readonly 'isZero': gboolean.FIsZero
    readonly 'onTestErrors': gcommon.FSignal
    readonly 'runTests': gthis.FRunTests
    readonly 'serializeSummary': gthis.FSerializeSummary
    readonly 'serializeTestResult': gthis.FSerializeTestResult
    readonly 'summarize': gthis.FSummarize
}) => gthis.FTestTestSet

export type CcreateTestParametersParser = ($d: {
    readonly 'onError': gthis.FHandleArgumentError
}) => gthis.FParseTestParameters

export type CcreateTestResultSerializer = ($d: {
    readonly 'isABeforeB': gcollation.FIsABeforeB
    readonly 'log': gcommon.FLog
}) => gthis.FSerializeTestResult

export type CcreateTestRunner = ($d: {
    readonly 'diffData': gdiff.FDiffData
    readonly 'stringsAreEqual': gdiff.FStringsAreEqual
    readonly 'validateFile': gthis.FValidateFile
}) => gthis.FRunTests

export type Cincrement = gthis.FIncrement

export type API = {
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
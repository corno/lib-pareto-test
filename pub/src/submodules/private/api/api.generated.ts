import * as pt from 'pareto-core-types'

import * as gglo from "./glossary"

import * as garithmetic from "res-pareto-arithmetic"
import * as gboolean from "res-pareto-boolean"
import * as gcollation from "res-pareto-collation"
import * as gcommon from "glo-pareto-common"
import * as gdiff from "res-pareto-diff"
import * as gfs from "lib-pareto-filesystem"
import * as gpublic from "../../../main"

export type CcreateBoundTester = ($d: {
    readonly 'log': gcommon.FLog
    readonly 'onError': gcommon.FLog
    readonly 'onTestErrors': gcommon.FSignal
}) => gglo.FTestTestSet

export type CcreateFileValidator = ($d: {
    readonly 'diffData': gdiff.FDiffData
    readonly 'readFile': gglo.FReadFile
    readonly 'unlink': gfs.FUnlinkFireAndForget
    readonly 'writeFile': gfs.FWriteFile
}) => gglo.FValidateFile

export type CcreateSummarizer = ($d: {
    readonly 'increment': gglo.FIncrement
}) => gglo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly 'add': garithmetic.FAdd
    readonly 'isZero': gboolean.FIsZero
    readonly 'log': gcommon.FLog
    readonly 'negate': garithmetic.FNegate
}) => gglo.FSerializeSummary

export type CcreateTester = ($d: {
    readonly 'isZero': gboolean.FIsZero
    readonly 'onTestErrors': gcommon.FSignal
    readonly 'runTests': gglo.FRunTests
    readonly 'serializeSummary': gglo.FSerializeSummary
    readonly 'serializeTestResult': gglo.FSerializeTestResult
    readonly 'summarize': gglo.FSummarize
}) => gglo.FTestTestSet

export type CcreateTestParametersParser = ($d: {
    readonly 'onError': gglo.FHandleArgumentError
}) => gglo.FParseTestParameters

export type CcreateTestResultSerializer = ($d: {
    readonly 'isABeforeB': gcollation.FIsABeforeB
    readonly 'log': gcommon.FLog
}) => gglo.FSerializeTestResult

export type CcreateTestRunner = ($d: {
    readonly 'diffData': gdiff.FDiffData
    readonly 'stringsAreEqual': gdiff.FStringsAreEqual
    readonly 'validateFile': gglo.FValidateFile
}) => gglo.FRunTests

export type Cincrement = gglo.FIncrement

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
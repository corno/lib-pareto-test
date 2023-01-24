import * as pt from 'pareto-core-types'

import * as glo from "./types.generated"

import * as marithmetic from "res-pareto-arithmetic"
import * as mboolean from "res-pareto-boolean"
import * as mcollation from "res-pareto-collation"
import * as mcommon from "glo-pareto-common"
import * as mdiff from "res-pareto-diff"
import * as mfs from "lib-pareto-filesystem"
import * as mpublic from "../../public"

export type CcreateBoundTester = ($d: {
    readonly 'log': mcommon.FLog
    readonly 'onError': mcommon.FLog
    readonly 'onTestErrors': mcommon.FSignal
}) => glo.FTestTestSet

export type CcreateFileValidator = ($d: {
    readonly 'diffData': mdiff.FDiffData
    readonly 'readFile': glo.FReadFile
    readonly 'unlink': mfs.FUnlinkFireAndForget
    readonly 'writeFile': mfs.FWriteFile
}) => glo.FValidateFile

export type CcreateSummarizer = ($d: {
    readonly 'increment': glo.FIncrement
}) => glo.FSummarize

export type CcreateSummarySerializer = ($d: {
    readonly 'add': marithmetic.FAdd
    readonly 'isZero': mboolean.FIsZero
    readonly 'log': mcommon.FLog
    readonly 'negate': marithmetic.FNegate
}) => glo.FSerializeSummary

export type CcreateTester = ($d: {
    readonly 'isZero': mboolean.FIsZero
    readonly 'onTestErrors': mcommon.FSignal
    readonly 'runTests': glo.FRunTests
    readonly 'serializeSummary': glo.FSerializeSummary
    readonly 'serializeTestResult': glo.FSerializeTestResult
    readonly 'summarize': glo.FSummarize
}) => glo.FTestTestSet

export type CcreateTestParametersParser = ($d: {
    readonly 'onError': glo.FHandleArgumentError
}) => glo.FParseTestParameters

export type CcreateTestResultSerializer = ($d: {
    readonly 'isABeforeB': mcollation.FIsABeforeB
    readonly 'log': mcommon.FLog
}) => glo.FSerializeTestResult

export type CcreateTestRunner = ($d: {
    readonly 'diffData': mdiff.FDiffData
    readonly 'stringsAreEqual': mdiff.FStringsAreEqual
    readonly 'validateFile': glo.FValidateFile
}) => glo.FRunTests

export type Cincrement = glo.FIncrement

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
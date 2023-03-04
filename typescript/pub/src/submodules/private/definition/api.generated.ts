import * as pt from 'pareto-core-types'

import * as g_arithmetic from "res-pareto-arithmetic"
import * as g_boolean from "res-pareto-boolean"
import * as g_collation from "res-pareto-collation"
import * as g_common from "glo-pareto-common"
import * as g_diff from "res-pareto-diff"
import * as g_fs from "lib-pareto-filesystem"
import * as g_this from "./glossary"

export type createBoundTester = ($d: {
    readonly 'log': g_common.F.Log
    readonly 'onError': g_common.F.Log
    readonly 'onTestErrors': g_common.F.Signal
}) => g_this.F.TestTestSet

export type createFileValidator = ($d: {
    readonly 'diffData': g_diff.F.DiffData
    readonly 'readFile': g_this.F.ReadFile
    readonly 'unlink': g_fs.F.UnlinkFireAndForget
    readonly 'writeFile': g_fs.F.WriteFile
}) => g_this.F.ValidateFile

export type createSummarizer = ($d: {
    readonly 'increment': g_this.F.Increment
}) => g_this.F.Summarize

export type createSummarySerializer = ($d: {
    readonly 'add': g_arithmetic.F.Add
    readonly 'isZero': g_boolean.F.IsZero
    readonly 'log': g_common.F.Log
    readonly 'negate': g_arithmetic.F.Negate
}) => g_this.F.SerializeSummary

export type createTester = ($d: {
    readonly 'isZero': g_boolean.F.IsZero
    readonly 'onTestErrors': g_common.F.Signal
    readonly 'runTests': g_this.F.RunTests
    readonly 'serializeSummary': g_this.F.SerializeSummary
    readonly 'serializeTestResult': g_this.F.SerializeTestResult
    readonly 'summarize': g_this.F.Summarize
}) => g_this.F.TestTestSet

export type createTestParametersParser = ($d: {
    readonly 'onError': g_this.F.HandleArgumentError
}) => g_this.F.ParseTestParameters

export type createTestResultSerializer = ($d: {
    readonly 'isABeforeB': g_collation.F.IsABeforeB
    readonly 'log': g_common.F.Log
}) => g_this.F.SerializeTestResult

export type createTestRunner = ($d: {
    readonly 'diffData': g_diff.F.DiffData
    readonly 'stringsAreEqual': g_diff.F.StringsAreEqual
    readonly 'validateFile': g_this.F.ValidateFile
}) => g_this.F.RunTests

export type increment = g_this.F.Increment

export type API = {
    createBoundTester: createBoundTester
    createFileValidator: createFileValidator
    createSummarizer: createSummarizer
    createSummarySerializer: createSummarySerializer
    createTester: createTester
    createTestParametersParser: createTestParametersParser
    createTestResultSerializer: createTestResultSerializer
    createTestRunner: createTestRunner
    increment: increment
}